import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createUser } from '@/lib/database-adapter'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email = 'test@example.com', password = 'testpass123' } = body

    console.log('Testing signup with:', { email })

    // Create Supabase admin client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase environment variables' },
        { status: 500 }
      )
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Test 1: Check existing users
    console.log('Step 1: Checking existing users...')
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (listError) {
      console.error('Error listing users:', listError)
      return NextResponse.json({
        error: 'Failed to list existing users',
        details: listError.message
      }, { status: 500 })
    }

    const existingUser = existingUsers.users.find(user => user.email === email)
    if (existingUser) {
      console.log('User already exists:', existingUser.id)
      return NextResponse.json({
        message: 'User already exists',
        userId: existingUser.id,
        email: existingUser.email
      })
    }

    // Test 2: Try to create auth user
    console.log('Step 2: Creating auth user...')
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      console.error('Auth creation error:', authError)
      return NextResponse.json({
        error: 'Failed to create auth user',
        details: authError.message,
        code: authError.code || 'unknown'
      }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({
        error: 'Auth user creation returned no user data'
      }, { status: 500 })
    }

    console.log('Auth user created successfully:', authData.user.id)

    // Test 3: Try to create profile
    console.log('Step 3: Creating user profile...')
    try {
      const userData = await createUser({
        id: authData.user.id,
        email,
        fullName: 'Test User',
        organizationName: 'Test Organization',
        organizationType: 'restaurant',
        phone: '+1-555-0123'
      })

      console.log('User profile created successfully:', userData.id)

      return NextResponse.json({
        message: 'Test signup completed successfully',
        authUser: {
          id: authData.user.id,
          email: authData.user.email
        },
        profileUser: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          approved: userData.approved
        }
      })

    } catch (profileError) {
      console.error('Profile creation error:', profileError)
      
      // Clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      
      return NextResponse.json({
        error: 'Failed to create user profile',
        details: profileError.message,
        authUserCleaned: true
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Test signup error:', error)
    return NextResponse.json({
      error: 'Test signup failed',
      details: error.message
    }, { status: 500 })
  }
}

// GET method to check current state
export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Get auth users
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers()
    
    // Get profile users
    const { data: profileUsers, error: profileError } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    return NextResponse.json({
      authUsers: authError ? { error: authError.message } : {
        count: authUsers?.users.length || 0,
        users: authUsers?.users.slice(0, 5).map(u => ({ id: u.id, email: u.email, created_at: u.created_at })) || []
      },
      profileUsers: profileError ? { error: profileError.message } : {
        count: profileUsers?.length || 0,
        users: profileUsers?.slice(0, 5) || []
      }
    })

  } catch (error) {
    return NextResponse.json({
      error: 'Failed to get user info',
      details: error.message
    }, { status: 500 })
  }
}
