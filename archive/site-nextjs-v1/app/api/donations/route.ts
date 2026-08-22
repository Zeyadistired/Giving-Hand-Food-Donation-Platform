import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { createDonation, createFoodDonation, createDonationTicket, getUserById } from '@/lib/database-adapter'

// Create a new donation (works with actual database structure)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      organizationName,
      foodCategory,
      description,
      quantity,
      packagingType,
      condition,
      expiryDate,
      availabilityDate,
      deliveryMethod,
      storageRequirements,
      // New fields for actual database
      donationType = 'food',
      recipientName = 'General Food Bank',
      anonymous = false
    } = body

    // Log received data for debugging
    console.log('Received donation data:', body)

    // Validate required fields
    if (!userId || !organizationName || !foodCategory || !description || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, organizationName, foodCategory, description, quantity' },
        { status: 400 }
      )
    }

    // Get user information
    const user = await getUserById(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create main donation record
    const donation = await createDonation({
      donorId: userId,
      donorName: user.name,
      recipientName,
      type: donationType as 'money' | 'food',
      anonymous
    })

    // Create food donation details
    const foodDonation = await createFoodDonation({
      donationId: donation.id,
      name: `${foodCategory}: ${description}`,
      quantity: parseFloat(quantity),
      unit: packagingType || 'kg',
      expiryDate,
      foodType: foodCategory,
      notes: `Condition: ${condition}. Storage: ${storageRequirements || 'Standard'}. Available: ${availabilityDate}`
    })

    // Create donation ticket for logistics
    const donationTicket = await createDonationTicket({
      title: `Food Donation: ${foodCategory}`,
      description: `${description} - ${quantity} ${packagingType || 'units'}`,
      expiryDate,
      deliveryMethod: deliveryMethod as 'pickup' | 'delivery',
      organizationName,
      organizationId: userId,
      specialInstructions: storageRequirements
    })

    return NextResponse.json({
      message: 'Donation created successfully',
      donation: {
        id: donation.id,
        donationId: donation.id,
        foodDonationId: foodDonation.id,
        ticketId: donationTicket.id,
        status: 'pending',
        // Legacy format for backward compatibility
        user_id: userId,
        organization_name: organizationName,
        food_category: foodCategory,
        description,
        quantity: parseFloat(quantity),
        packaging_type: packagingType,
        condition,
        expiry_date: expiryDate,
        availability_date: availabilityDate,
        delivery_method: deliveryMethod,
        storage_requirements: storageRequirements,
        created_at: donation.created_at
      }
    })

  } catch (error) {
    console.error('Donation creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// Get donations (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')

    // Query the actual database structure
    let donationsQuery = supabaseAdmin
      .from('donations')
      .select(`
        *,
        food_donations (*)
      `)
      .order('created_at', { ascending: false })

    // Filter by user if specified
    if (userId) {
      donationsQuery = donationsQuery.eq('donor_id', userId)
    }

    // Filter by status if specified
    if (status) {
      donationsQuery = donationsQuery.eq('status', status)
    }

    const { data: donations, error } = await donationsQuery

    if (error) {
      console.error('Error fetching donations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch donations' },
        { status: 500 }
      )
    }

    // Also get donation tickets for additional context
    let ticketsQuery = supabaseAdmin
      .from('donation_tickets')
      .select('*')
      .order('created_at', { ascending: false })

    if (userId) {
      ticketsQuery = ticketsQuery.eq('organization_id', userId)
    }

    const { data: tickets, error: ticketsError } = await ticketsQuery

    if (ticketsError) {
      console.error('Error fetching donation tickets:', ticketsError)
    }

    // Transform data to legacy format for backward compatibility
    const legacyDonations = donations?.map(donation => {
      const foodDonation = donation.food_donations?.[0]

      // Map database statuses to admin-friendly statuses
      let adminStatus = donation.status || 'pending'
      if (donation.status === 'fulfilled') {
        adminStatus = 'approved'
      } else if (donation.status === 'cancelled') {
        adminStatus = 'rejected'
      }

      return {
        id: donation.id,
        user_id: donation.donor_id,
        organization_name: donation.donor_name,
        food_category: foodDonation?.food_type || 'General',
        description: foodDonation?.name || donation.type,
        quantity: foodDonation?.quantity || 0,
        packaging_type: foodDonation?.unit || 'kg',
        condition: 'Good', // Default since not in new schema
        expiry_date: foodDonation?.expiry_date,
        availability_date: donation.created_at,
        delivery_method: 'pickup', // Default
        storage_requirements: foodDonation?.notes || '',
        status: adminStatus,
        created_at: donation.created_at,
        updated_at: donation.updated_at
      }
    }) || []

    return NextResponse.json({
      donations: legacyDonations,
      tickets: tickets || [],
      totalCount: donations?.length || 0
    })

  } catch (error) {
    console.error('Donations fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
