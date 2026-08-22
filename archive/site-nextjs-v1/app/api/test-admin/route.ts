import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log('Testing admin login with:', { email, password })

    // Check if this is admin login
    const ADMIN_EMAIL = 'Eui@admin.com'
    const ADMIN_PASSWORD = 'Eui1234'

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: 'Admin login successful',
        isAdmin: true,
        redirectTo: '/admin'
      })
    }

    return NextResponse.json({
      success: false,
      message: 'Not admin credentials',
      isAdmin: false,
      provided: { email, password },
      expected: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error.message
    }, { status: 500 })
  }
}
