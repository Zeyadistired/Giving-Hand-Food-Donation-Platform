import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getUserByAuthId, mapUserToLegacy } from '@/lib/database-adapter'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Create Supabase client with environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 401 }
      )
    }

    // Get user profile using database adapter
    try {
      const userProfile = await getUserByAuthId(data.user.id)

      if (!userProfile) {
        return NextResponse.json(
          { error: 'User profile not found' },
          { status: 404 }
        )
      }

      // Check if this is an admin user
      const isAdmin = userProfile.description?.startsWith('admin:') || userProfile.email === 'Eui@admin.com'

      if (isAdmin) {
        return NextResponse.json({
          message: 'Admin login successful',
          user: {
            id: userProfile.id,
            email: userProfile.email,
            fullName: userProfile.name,
            organizationName: 'GivingHand Administration',
            organizationType: 'admin',
            status: 'approved'
          },
          session: data.session,
          isAdmin: true
        })
      }

      // Check if user is approved (for non-admin users)
      if (!userProfile.approved) {
        return NextResponse.json(
          {
            error: 'Account pending approval',
            status: 'pending',
            message: 'Your account is pending admin approval. Please wait for approval before logging in.'
          },
          { status: 403 }
        )
      }

      // Map to legacy format for backward compatibility
      const legacyUser = mapUserToLegacy(userProfile)

      return NextResponse.json({
        message: 'Login successful',
        user: {
          id: legacyUser.id,
          email: legacyUser.email,
          fullName: legacyUser.full_name,
          organizationName: legacyUser.organization_name,
          organizationType: legacyUser.organization_type,
          status: legacyUser.status
        },
        session: data.session
      })
    } catch (profileError) {
      console.error('Profile error:', profileError)
      return NextResponse.json(
        { error: 'Failed to get user profile' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
