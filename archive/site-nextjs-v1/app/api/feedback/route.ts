import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Create new feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, name, email, subject, message, priority = 'medium' } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      )
    }

    // Create feedback record
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .insert({
        user_id: userId || null,
        name,
        email,
        subject,
        message,
        priority,
        status: 'unresolved'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating feedback:', error)
      return NextResponse.json(
        { error: 'Failed to create feedback' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Feedback submitted successfully',
      feedback: data
    })

  } catch (error) {
    console.error('Feedback creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get all feedback (admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')

    let query = supabaseAdmin
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by status if specified
    if (status) {
      query = query.eq('status', status)
    }

    // Filter by priority if specified
    if (priority) {
      query = query.eq('priority', priority)
    }

    const { data: feedback, error } = await query

    if (error) {
      console.error('Error fetching feedback:', error)
      return NextResponse.json(
        { error: 'Failed to fetch feedback' },
        { status: 500 }
      )
    }

    return NextResponse.json({ feedback })

  } catch (error) {
    console.error('Feedback fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
