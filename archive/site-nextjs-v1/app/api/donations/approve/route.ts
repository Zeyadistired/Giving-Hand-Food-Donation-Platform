import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getUserById } from '@/lib/database-adapter'

// Update donation status (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { donationId, status, rejectionReason } = body

    // TODO: Add admin authentication check here

    if (!donationId || !status) {
      return NextResponse.json(
        { error: 'Donation ID and status are required' },
        { status: 400 }
      )
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // The donationId from the admin dashboard is actually a donation ID from our legacy format
    // We need to find the corresponding donation and update its status

    // First, try to find the donation in the donations table
    const { data: donation, error: donationError } = await supabaseAdmin
      .from('donations')
      .select('*')
      .eq('id', donationId)
      .single()

    if (donationError) {
      console.error('Error finding donation:', donationError)
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      )
    }

    // Update the donation status
    // Map admin statuses to database enum values
    let dbStatus = status
    if (status === 'approved') {
      dbStatus = 'fulfilled'
    } else if (status === 'rejected') {
      dbStatus = 'cancelled'
    }

    const updateData: any = {
      status: dbStatus,
      updated_at: new Date().toISOString()
    }

    const { data: updatedDonation, error: updateError } = await supabaseAdmin
      .from('donations')
      .update(updateData)
      .eq('id', donationId)
      .select('*')
      .single()

    if (updateError) {
      console.error('Error updating donation:', updateError)
      return NextResponse.json(
        { error: 'Failed to update donation' },
        { status: 500 }
      )
    }

    // Get user information for email notification
    let userInfo = null
    if (donation.donor_id) {
      try {
        userInfo = await getUserById(donation.donor_id)
      } catch (userError) {
        console.error('Error getting user info:', userError)
      }
    }

    // Send email notification (if email functionality is available)
    try {
      if (userInfo && userInfo.email) {
        const donationDetails = {
          foodCategory: donation.type || 'Food',
          description: donation.recipient_name || 'Food donation',
          quantity: donation.amount || 'N/A',
          expiryDate: 'N/A'
        }

        console.log(`Would send ${status} email to ${userInfo.email} for donation ${donationId}`)
        // Email functionality can be implemented here if needed
      }
    } catch (emailError) {
      console.error('Error with email notification:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      message: 'Donation updated successfully',
      donation: updatedDonation
    })

  } catch (error) {
    console.error('Admin donation update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
