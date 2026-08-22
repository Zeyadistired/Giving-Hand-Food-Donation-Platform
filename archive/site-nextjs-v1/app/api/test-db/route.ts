import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getWebsiteStats, getAllUsers } from '@/lib/database-adapter'

export async function GET(request: NextRequest) {
  try {
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

    // Test 1: Check if we can connect to Supabase
    console.log('Testing Supabase connection...')

    // Test 2: Check if we can connect by testing users table (we know this exists)
    const { data: users, error: usersError } = await supabaseAdmin
      .from('users')
      .select('id')
      .limit(1)

    if (usersError) {
      console.error('Error testing connection with users table:', usersError)
      return NextResponse.json({
        error: 'Failed to connect to database',
        details: usersError
      }, { status: 500 })
    }

    console.log('Connection test successful, users table accessible')

    // Test 3: Try to query food_donations table
    const { data: donations, error: donationsError } = await supabaseAdmin
      .from('food_donations')
      .select('*')
      .limit(1)

    if (donationsError) {
      console.error('Error querying food_donations:', donationsError)
      
      // If table doesn't exist, let's create it
      if (donationsError.code === '42P01') { // Table doesn't exist
        return NextResponse.json({
          error: 'food_donations table does not exist',
          suggestion: 'Need to create the table in Supabase',
          errorCode: donationsError.code
        }, { status: 404 })
      }

      return NextResponse.json({
        error: 'Failed to query food_donations table',
        details: donationsError
      }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Database connection successful',
      donationsCount: donations?.length || 0,
      sampleDonation: donations?.[0] || null
    })

  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { error: 'Database test failed', details: error.message },
      { status: 500 }
    )
  }
}
