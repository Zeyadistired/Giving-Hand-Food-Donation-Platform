import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const timeframe = searchParams.get('timeframe') || '30' // days

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(timeframe))

    // Get user's donations
    const { data: userDonations, error: donationsError } = await supabaseAdmin
      .from('food_donations')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())

    if (donationsError) {
      console.error('Error fetching user donations:', donationsError)
      return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 })
    }

    // Get all user's donations for total count
    const { data: allUserDonations, error: allDonationsError } = await supabaseAdmin
      .from('food_donations')
      .select('*')
      .eq('user_id', userId)

    if (allDonationsError) {
      console.error('Error fetching all user donations:', allDonationsError)
    }

    // Calculate user-specific metrics
    const totalDonations = allUserDonations?.length || 0
    const recentDonations = userDonations?.length || 0
    
    // Calculate total food quantity donated by user
    const totalFoodQuantity = allUserDonations?.reduce((sum, donation) => {
      return sum + (parseFloat(donation.quantity) || 0)
    }, 0) || 0

    // Calculate environmental impact for this user
    const methaneReduced = totalFoodQuantity * 0.5 // 0.5 kg CO2 per kg of food
    const waterSaved = totalFoodQuantity * 25 // 25 liters per kg of food
    const energySaved = totalFoodQuantity * 2.5 // 2.5 kWh per kg of food
    const mealsProvided = Math.floor(totalFoodQuantity / 0.5) // Assuming 0.5 kg per meal

    // Calculate people helped (assuming each meal helps one person)
    const peopleHelped = mealsProvided

    // Calculate donation growth
    const previousPeriodStart = new Date(startDate)
    previousPeriodStart.setDate(previousPeriodStart.getDate() - parseInt(timeframe))
    
    const { data: previousDonations, error: previousError } = await supabaseAdmin
      .from('food_donations')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .gte('created_at', previousPeriodStart.toISOString())
      .lt('created_at', startDate.toISOString())

    const previousCount = previousDonations?.length || 0
    const donationGrowth = previousCount > 0 
      ? Math.round(((recentDonations - previousCount) / previousCount) * 100)
      : recentDonations > 0 ? 100 : 0

    // Create donation timeline
    const donationTimeline = {}
    if (userDonations) {
      userDonations.forEach(donation => {
        const date = new Date(donation.created_at).toISOString().split('T')[0]
        donationTimeline[date] = (donationTimeline[date] || 0) + 1
      })
    }

    // Calculate impact score (0-100 based on various factors)
    const impactScore = Math.min(100, Math.round(
      (totalDonations * 10) + // 10 points per donation
      (methaneReduced * 0.1) + // 0.1 points per kg CO2 reduced
      (mealsProvided * 0.5) // 0.5 points per meal provided
    ))

    // Get user's donation status distribution
    const statusDistribution = {}
    if (allUserDonations) {
      allUserDonations.forEach(donation => {
        const status = donation.status || 'pending'
        statusDistribution[status] = (statusDistribution[status] || 0) + 1
      })
    }

    // Get user's food category distribution
    const categoryDistribution = {}
    if (allUserDonations) {
      allUserDonations.forEach(donation => {
        const category = donation.food_category || 'other'
        categoryDistribution[category] = (categoryDistribution[category] || 0) + 1
      })
    }

    // Calculate monthly impact trend
    const monthlyImpact = {}
    if (allUserDonations) {
      allUserDonations.forEach(donation => {
        const month = new Date(donation.created_at).toISOString().substring(0, 7) // YYYY-MM
        const quantity = parseFloat(donation.quantity) || 0
        if (!monthlyImpact[month]) {
          monthlyImpact[month] = {
            donations: 0,
            quantity: 0,
            co2Reduced: 0,
            mealsProvided: 0
          }
        }
        monthlyImpact[month].donations += 1
        monthlyImpact[month].quantity += quantity
        monthlyImpact[month].co2Reduced += quantity * 0.5
        monthlyImpact[month].mealsProvided += Math.floor(quantity / 0.5)
      })
    }

    // Get user's recent activity
    const { data: recentActivity, error: activityError } = await supabaseAdmin
      .from('food_donations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10)

    if (activityError) {
      console.error('Error fetching recent activity:', activityError)
    }

    return NextResponse.json({
      userDonations: totalDonations,
      recentDonations,
      donationGrowth,
      peopleHelped,
      co2Reduced: Math.round(methaneReduced),
      impactScore,
      wastePrevented: Math.round(totalFoodQuantity),
      mealsProvided,
      waterSaved: Math.round(waterSaved),
      energySaved: Math.round(energySaved),
      donationTimeline,
      statusDistribution,
      categoryDistribution,
      monthlyImpact,
      recentActivity: recentActivity || [],
      environmentalImpact: {
        methaneReduced: Math.round(methaneReduced),
        waterSaved: Math.round(waterSaved),
        energySaved: Math.round(energySaved),
        mealsServed: mealsProvided,
        totalFoodQuantity: Math.round(totalFoodQuantity)
      },
      timeframe: parseInt(timeframe)
    })

  } catch (error) {
    console.error('Error in user analytics API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
