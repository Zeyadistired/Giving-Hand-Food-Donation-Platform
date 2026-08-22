import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Update donation ticket status (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticketId, status, rejectionReason } = body

    // TODO: Add admin authentication check here

    if (!ticketId || !status) {
      return NextResponse.json(
        { error: 'Ticket ID and status are required' },
        { status: 400 }
      )
    }

    if (!['pending', 'approved', 'rejected', 'completed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Prepare update data
    const updateData: any = { 
      status,
      updated_at: new Date().toISOString()
    }

    // Add rejection reason if provided
    if (status === 'rejected' && rejectionReason) {
      updateData.special_instructions = rejectionReason
    }

    // Update the donation ticket
    const { data, error } = await supabaseAdmin
      .from('donation_tickets')
      .update(updateData)
      .eq('id', ticketId)
      .select()
      .single()

    if (error) {
      console.error('Error updating donation ticket:', error)
      return NextResponse.json(
        { error: 'Failed to update donation ticket' },
        { status: 500 }
      )
    }

    // Also update the related donation status if needed
    if (data.organization_id) {
      try {
        await supabaseAdmin
          .from('donations')
          .update({ 
            status: status === 'approved' ? 'pending' : status,
            updated_at: new Date().toISOString()
          })
          .eq('donor_id', data.organization_id)
      } catch (donationError) {
        console.error('Error updating related donation:', donationError)
        // Don't fail the request if donation update fails
      }
    }

    return NextResponse.json({
      message: 'Donation ticket updated successfully',
      ticket: data
    })

  } catch (error) {
    console.error('Donation ticket update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get donation tickets (admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const organizationId = searchParams.get('organizationId')

    let query = supabaseAdmin
      .from('donation_tickets')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by status if specified
    if (status) {
      query = query.eq('status', status)
    }

    // Filter by organization if specified
    if (organizationId) {
      query = query.eq('organization_id', organizationId)
    }

    const { data: tickets, error } = await query

    if (error) {
      console.error('Error fetching donation tickets:', error)
      return NextResponse.json(
        { error: 'Failed to fetch donation tickets' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      tickets: tickets || [],
      totalCount: tickets?.length || 0
    })

  } catch (error) {
    console.error('Donation tickets fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
