import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createUser } from '@/lib/database-adapter'

// Helper function to extract organization name from description
function extractOrganizationName(description: string): string {
  const match = description.match(/^[^:]+:\s*(.+)$/)
  return match ? match[1] : description || 'Unknown Organization'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      fullName,
      organizationName,
      organizationType,
      phone
    } = body

    // Validate required fields
    if (!email || !password || !fullName || !organizationName || !organizationType || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create Supabase admin client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Check if user already exists first
    const { data: existingUsers, error: checkError } = await supabaseAdmin.auth.admin.listUsers()

    if (checkError) {
      console.error('Error checking existing users:', checkError)
    } else {
      const existingUser = existingUsers.users.find(user => user.email === email)
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        )
      }
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for demo
    })

    if (authError) {
      console.error('Auth error:', authError)
      let errorMessage = authError.message

      // Provide more specific error messages
      if (authError.message.includes('Database error creating new user')) {
        errorMessage = 'Unable to create user account. The email might already be in use.'
      } else if (authError.message.includes('User already registered')) {
        errorMessage = 'A user with this email already exists.'
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Create user profile using database adapter
    try {
      const userData = await createUser({
        id: authData.user.id,
        email,
        fullName,
        organizationName,
        organizationType,
        phone
      })

      console.log('User profile created successfully:', userData)

      return NextResponse.json({
        message: 'User created successfully',
        user: {
          id: userData.id,
          email: userData.email,
          fullName: userData.name,
          organizationName: extractOrganizationName(userData.description || ''),
          status: userData.approved ? 'approved' : 'pending'
        }
      })
    } catch (userError) {
      console.error('User profile error:', userError)
      // If profile creation fails, delete the auth user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: 'Database error creating user profile', details: userError.message },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
