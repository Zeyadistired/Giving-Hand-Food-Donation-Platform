import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '30' // days

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(timeframe))

    // Get total donations count
    const { data: totalDonations, error: donationsError } = await supabaseAdmin
      .from('food_donations')
      .select('id', { count: 'exact' })

    if (donationsError) {
      console.error('Error fetching total donations:', donationsError)
    }

    // Get donations in timeframe for growth calculation
    const { data: recentDonations, error: recentError } = await supabaseAdmin
      .from('food_donations')
      .select('id', { count: 'exact' })
      .gte('created_at', startDate.toISOString())

    if (recentError) {
      console.error('Error fetching recent donations:', recentError)
    }

    // Get total users count
    const { data: totalUsers, error: usersError } = await supabaseAdmin
      .from('users')
      .select('id', { count: 'exact' })

    if (usersError) {
      console.error('Error fetching total users:', usersError)
    }

    // Get active users (approved status)
    const { data: activeUsers, error: activeUsersError } = await supabaseAdmin
      .from('users')
      .select('id', { count: 'exact' })
      .eq('approved', true)

    if (activeUsersError) {
      console.error('Error fetching active users:', activeUsersError)
    }

    // Get organizations count by type
    const { data: organizations, error: orgsError } = await supabaseAdmin
      .from('users')
      .select('role', { count: 'exact' })
      .eq('approved', true)

    if (orgsError) {
      console.error('Error fetching organizations:', orgsError)
    }

    // Get pending approvals count
    const { data: pendingUsers, error: pendingError } = await supabaseAdmin
      .from('users')
      .select('id', { count: 'exact' })
      .eq('approved', false)

    if (pendingError) {
      console.error('Error fetching pending users:', pendingError)
    }

    // Get top donating organizations
    const { data: topDonors, error: topDonorsError } = await supabaseAdmin
      .from('food_donations')
      .select(`
        organization_name,
        quantity,
        users:user_id (
          organization_type
        )
      `)
      .eq('status', 'approved')

    if (topDonorsError) {
      console.error('Error fetching top donors:', topDonorsError)
    }

    // Process top donors data
    const donorStats = {}
    if (topDonors) {
      topDonors.forEach(donation => {
        const orgName = donation.organization_name
        if (!donorStats[orgName]) {
          donorStats[orgName] = {
            name: orgName,
            type: donation.users?.organization_type || 'Unknown',
            donations: 0,
            totalQuantity: 0
          }
        }
        donorStats[orgName].donations += 1
        donorStats[orgName].totalQuantity += donation.quantity || 0
      })
    }

    const topDonatingOrgs = Object.values(donorStats)
      .sort((a: any, b: any) => b.donations - a.donations)
      .slice(0, 5)

    // Get donations over time (daily for last 30 days)
    const { data: dailyDonations, error: dailyError } = await supabaseAdmin
      .from('food_donations')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })

    if (dailyError) {
      console.error('Error fetching daily donations:', dailyError)
    }

    // Process daily donations data
    const dailyStats = {}
    if (dailyDonations) {
      dailyDonations.forEach(donation => {
        const date = new Date(donation.created_at).toISOString().split('T')[0]
        dailyStats[date] = (dailyStats[date] || 0) + 1
      })
    }

    // Get user distribution by organization type
    const { data: usersByType, error: usersByTypeError } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('approved', true)

    if (usersByTypeError) {
      console.error('Error fetching users by type:', usersByTypeError)
    }

    const userTypeDistribution = {}
    if (usersByType) {
      usersByType.forEach(user => {
        const type = user.role
        userTypeDistribution[type] = (userTypeDistribution[type] || 0) + 1
      })
    }

    // Calculate growth percentage (mock calculation for now)
    const totalDonationsCount = totalDonations?.length || 0
    const recentDonationsCount = recentDonations?.length || 0
    const growthPercentage = totalDonationsCount > 0
      ? Math.round((recentDonationsCount / totalDonationsCount) * 100)
      : 0

    // Calculate environmental impact metrics
    // Get total quantity of food donated from all food donations
    const { data: allFoodDonations, error: foodDonationsError } = await supabaseAdmin
      .from('food_donations')
      .select('quantity')

    if (foodDonationsError) {
      console.error('Error fetching food donations:', foodDonationsError)
    }

    const totalFoodQuantity = allFoodDonations?.reduce((sum, donation) => sum + (donation.quantity || 0), 0) || 0

    // Environmental impact calculations based on food quantity
    // Average calculations per kg of food saved:
    // - 1 kg food = ~2.5 kg CO2 equivalent saved (methane reduction from landfills)
    // - 1 kg food = ~1000L water saved (agricultural water footprint)
    // - 1 kg food = ~3 kWh energy saved (production, transport, processing)
    // - 1 kg food = ~2.5 meals (average meal size ~400g)

    const methaneReduced = Math.round(totalFoodQuantity * 2.5) // kg CO2 equivalent
    const waterSaved = Math.round(totalFoodQuantity * 1000) // liters
    const energySaved = Math.round(totalFoodQuantity * 3) // kWh
    const mealsServed = Math.round(totalFoodQuantity * 2.5) // meals

    // Calculate monthly growth for impact metrics
    const { data: recentFoodDonations, error: recentFoodError } = await supabaseAdmin
      .from('food_donations')
      .select('quantity')
      .gte('created_at', startDate.toISOString())

    if (recentFoodError) {
      console.error('Error fetching recent food donations:', recentFoodError)
    }

    const recentFoodQuantity = recentFoodDonations?.reduce((sum, donation) => sum + (donation.quantity || 0), 0) || 0
    const impactGrowthPercentage = totalFoodQuantity > 0
      ? Math.round((recentFoodQuantity / totalFoodQuantity) * 100)
      : 0

    // Get impact by organization type - using the actual database structure
    const { data: donationsByType, error: donationsByTypeError } = await supabaseAdmin
      .from('donations')
      .select(`
        *,
        food_donations (quantity),
        users:donor_id (role)
      `)

    if (donationsByTypeError) {
      console.error('Error fetching donations by type:', donationsByTypeError)
    }

    const impactByOrgType = {}
    if (donationsByType) {
      donationsByType.forEach(donation => {
        const orgType = donation.users?.role || 'unknown'
        const quantity = donation.food_donations?.[0]?.quantity || 0

        if (!impactByOrgType[orgType]) {
          impactByOrgType[orgType] = {
            totalQuantity: 0,
            donations: 0,
            methaneReduced: 0,
            mealsServed: 0
          }
        }

        impactByOrgType[orgType].totalQuantity += quantity
        impactByOrgType[orgType].donations += 1
        impactByOrgType[orgType].methaneReduced += Math.round(quantity * 2.5)
        impactByOrgType[orgType].mealsServed += Math.round(quantity * 2.5)
      })
    }

    // Get cumulative impact timeline using actual database structure
    const { data: timelineData, error: timelineError } = await supabaseAdmin
      .from('food_donations')
      .select('quantity, created_at')
      .order('created_at', { ascending: true })

    if (timelineError) {
      console.error('Error fetching timeline data:', timelineError)
    }

    // Process timeline data into monthly cumulative totals
    const monthlyImpact = {}
    let cumulativeQuantity = 0
    let cumulativeMethane = 0
    let cumulativeMeals = 0

    if (timelineData) {
      timelineData.forEach(donation => {
        const date = new Date(donation.created_at)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

        const quantity = donation.quantity || 0
        cumulativeQuantity += quantity
        cumulativeMethane += Math.round(quantity * 2.5)
        cumulativeMeals += Math.round(quantity * 2.5)

        monthlyImpact[monthKey] = {
          month: monthKey,
          cumulativeQuantity,
          cumulativeMethane,
          cumulativeMeals,
          monthlyQuantity: (monthlyImpact[monthKey]?.monthlyQuantity || 0) + quantity
        }
      })
    }

    // Ensure the final cumulative totals match the main metrics
    const finalCumulativeQuantity = cumulativeQuantity
    const finalCumulativeMethane = cumulativeMethane
    const finalCumulativeMeals = cumulativeMeals

    // Verify consistency (the timeline totals should match the main metrics)
    console.log('Consistency check:')
    console.log('Main metrics - Food:', totalFoodQuantity, 'Methane:', methaneReduced, 'Meals:', mealsServed)
    console.log('Timeline totals - Food:', finalCumulativeQuantity, 'Methane:', finalCumulativeMethane, 'Meals:', finalCumulativeMeals)

    // Calculate environmental equivalents
    const carsOffRoad = Math.round(methaneReduced / 2500) // 1 car = ~2500 kg CO2/year
    const treesPlanted = Math.round(methaneReduced / 22) // 1 tree absorbs ~22 kg CO2/year
    const householdsPowered = Math.round(energySaved / 10800) // Average household uses ~10,800 kWh/year

    return NextResponse.json({
      totalDonations: totalDonationsCount,
      totalUsers: totalUsers?.length || 0,
      activeUsers: activeUsers?.length || 0,
      pendingUsers: pendingUsers?.length || 0,
      organizations: organizations?.length || 0,
      growthPercentage,
      topDonatingOrganizations: topDonatingOrgs,
      dailyDonations: dailyStats,
      userTypeDistribution,
      environmentalImpact: {
        methaneReduced,
        waterSaved,
        energySaved,
        mealsServed,
        totalFoodQuantity,
        impactGrowthPercentage,
        impactByOrgType,
        cumulativeTimeline: Object.values(monthlyImpact),
        environmentalEquivalents: {
          carsOffRoad,
          treesPlanted,
          householdsPowered
        }
      },
      timeframe: parseInt(timeframe)
    })

  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
