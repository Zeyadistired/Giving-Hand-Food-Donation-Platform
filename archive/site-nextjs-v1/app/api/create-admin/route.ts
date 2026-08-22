import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createUser } from '@/lib/database-adapter'

export async function POST(request: NextRequest) {
  try {
    const ADMIN_EMAIL = 'Eui@admin.com'
    const ADMIN_PASSWORD = 'Eui1234'

    console.log('Creating admin user in Supabase Auth...')

    // Check if admin user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (listError) {
      console.error('Error listing users:', listError)
      return NextResponse.json({
        error: 'Failed to check existing users',
        details: listError.message
      }, { status: 500 })
    }

    const existingAdmin = existingUsers.users.find(user => user.email === ADMIN_EMAIL)
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.id)
      
      // Check if profile exists
      const { data: profileUser, error: profileError } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('auth_id', existingAdmin.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error checking admin profile:', profileError)
      }

      return NextResponse.json({
        message: 'Admin user already exists',
        authUser: {
          id: existingAdmin.id,
          email: existingAdmin.email,
          created_at: existingAdmin.created_at
        },
        profileUser: profileUser || null,
        profileExists: !!profileUser
      })
    }

    // Create admin user in Supabase Auth
    console.log('Creating new admin auth user...')
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin User',
        role: 'admin'
      }
    })

    if (authError) {
      console.error('Auth creation error:', authError)
      return NextResponse.json({
        error: 'Failed to create admin auth user',
        details: authError.message
      }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({
        error: 'Auth user creation returned no user data'
      }, { status: 500 })
    }

    console.log('Admin auth user created successfully:', authData.user.id)

    // Create admin profile in users table
    console.log('Creating admin profile...')
    try {
      const adminProfile = await createUser({
        id: authData.user.id,
        email: ADMIN_EMAIL,
        fullName: 'Admin User',
        organizationName: 'GivingHand Administration',
        organizationType: 'admin',
        phone: '+1-555-ADMIN'
      })

      console.log('Admin profile created successfully:', adminProfile.id)

      // Update the user to be approved and set as admin role
      const { data: updatedProfile, error: updateError } = await supabaseAdmin
        .from('users')
        .update({
          approved: true,
          role: 'admin',
          description: 'admin: GivingHand Administration - System Administrator'
        })
        .eq('id', authData.user.id)
        .select()
        .single()

      if (updateError) {
        console.error('Error updating admin profile:', updateError)
      }

      return NextResponse.json({
        message: 'Admin user created successfully',
        authUser: {
          id: authData.user.id,
          email: authData.user.email,
          created_at: authData.user.created_at
        },
        profileUser: updatedProfile || adminProfile,
        credentials: {
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD
        }
      })

    } catch (profileError) {
      console.error('Profile creation error:', profileError)
      
      // Clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      
      return NextResponse.json({
        error: 'Failed to create admin profile',
        details: profileError.message,
        authUserCleaned: true
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Admin creation error:', error)
    return NextResponse.json({
      error: 'Failed to create admin user',
      details: error.message
    }, { status: 500 })
  }
}

// GET method to check admin status
export async function GET(request: NextRequest) {
  try {
    const ADMIN_EMAIL = 'Eui@admin.com'

    // Check auth users
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers()
    const adminAuthUser = authUsers?.users.find(user => user.email === ADMIN_EMAIL)

    // Check profile users
    const { data: profileUsers, error: profileError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', ADMIN_EMAIL)

    return NextResponse.json({
      adminExists: {
        auth: !!adminAuthUser,
        profile: (profileUsers?.length || 0) > 0
      },
      adminAuthUser: adminAuthUser ? {
        id: adminAuthUser.id,
        email: adminAuthUser.email,
        created_at: adminAuthUser.created_at
      } : null,
      adminProfileUsers: profileUsers || [],
      credentials: {
        email: ADMIN_EMAIL,
        password: 'Eui1234'
      }
    })

  } catch (error) {
    return NextResponse.json({
      error: 'Failed to check admin status',
      details: error.message
    }, { status: 500 })
  }
}
