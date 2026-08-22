import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getWebsiteStats, getAllUsers } from '@/lib/database-adapter'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Supabase connection and database adapter...')

    const tests = {
      connection: 'TESTING',
      environment: 'TESTING',
      tables: {},
      adapter: {}
    }

    // Test 1: Environment variables
    tests.environment = {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...'
    }

    // Test 2: Basic connection
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('count')
        .limit(1)
      
      if (error) {
        tests.connection = 'ERROR'
        tests.connectionError = error.message
      } else {
        tests.connection = 'OK'
      }
    } catch (error) {
      tests.connection = 'ERROR'
      tests.connectionError = error.message
    }

    // Test 3: Individual tables
    const tablesToTest = ['users', 'donations', 'food_donations', 'donation_tickets']
    
    for (const table of tablesToTest) {
      try {
        const { data, error, count } = await supabaseAdmin
          .from(table)
          .select('*', { count: 'exact' })
          .limit(1)
        
        if (error) {
          tests.tables[table] = {
            status: 'ERROR',
            error: error.message,
            code: error.code
          }
        } else {
          tests.tables[table] = {
            status: 'OK',
            count: count || 0,
            hasData: (data?.length || 0) > 0,
            sampleRecord: data?.[0] || null
          }
        }
      } catch (error) {
        tests.tables[table] = {
          status: 'ERROR',
          error: error.message
        }
      }
    }

    // Test 4: Database adapter functions
    try {
      const users = await getAllUsers()
      tests.adapter.getAllUsers = {
        status: 'OK',
        count: users.length,
        sample: users[0] || null
      }
    } catch (error) {
      tests.adapter.getAllUsers = {
        status: 'ERROR',
        error: error.message
      }
    }

    try {
      const stats = await getWebsiteStats()
      tests.adapter.getWebsiteStats = {
        status: 'OK',
        stats
      }
    } catch (error) {
      tests.adapter.getWebsiteStats = {
        status: 'ERROR',
        error: error.message
      }
    }

    // Test 5: Check table schemas
    try {
      const { data: schemaInfo, error: schemaError } = await supabaseAdmin
        .rpc('get_table_info')
        .select()

      if (schemaError) {
        // Fallback: get column information
        const { data: columns, error: colError } = await supabaseAdmin
          .from('information_schema.columns')
          .select('table_name, column_name, data_type')
          .eq('table_schema', 'public')
          .in('table_name', tablesToTest)

        if (!colError) {
          tests.schema = {
            status: 'OK',
            method: 'information_schema',
            columns: columns
          }
        } else {
          tests.schema = {
            status: 'ERROR',
            error: colError.message
          }
        }
      } else {
        tests.schema = {
          status: 'OK',
          method: 'rpc',
          info: schemaInfo
        }
      }
    } catch (error) {
      tests.schema = {
        status: 'ERROR',
        error: error.message
      }
    }

    // Summary
    const summary = {
      overallStatus: tests.connection === 'OK' ? 'CONNECTED' : 'FAILED',
      tablesWorking: Object.values(tests.tables).filter(t => t.status === 'OK').length,
      tablesTotal: tablesToTest.length,
      adapterFunctionsWorking: Object.values(tests.adapter).filter(a => a.status === 'OK').length,
      adapterFunctionsTotal: Object.keys(tests.adapter).length
    }

    return NextResponse.json({
      message: 'Database connection test completed',
      timestamp: new Date().toISOString(),
      summary,
      details: tests
    })

  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { 
        error: 'Database test failed', 
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    )
  }
}
