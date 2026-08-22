import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getWebsiteStats } from '@/lib/database-adapter'

export async function GET(request: NextRequest) {
  try {
    // Use database adapter to get stats
    const stats = await getWebsiteStats()

    // Calculate derived metrics
    const totalFoodQuantity = stats.totalFoodDonations * 10 // Estimate 10kg per food donation
    const totalMeals = Math.round(totalFoodQuantity * 2.5) // 2.5 meals per kg

    // Mock organization type distribution since we don't have this in the new schema
    const orgTypeDistribution = {
      'donor': Math.round(stats.totalOrganizations * 0.6),
      'charity': Math.round(stats.totalOrganizations * 0.25),
      'shelter': Math.round(stats.totalOrganizations * 0.1),
      'factory': Math.round(stats.totalOrganizations * 0.05)
    }

    // Calculate environmental impact
    const methaneReduced = Math.round(totalFoodQuantity * 2.5) // kg CO2 equivalent
    const waterSaved = Math.round(totalFoodQuantity * 1000) // liters
    const energySaved = Math.round(totalFoodQuantity * 3) // kWh

    // Calculate waste reduction percentage (mock calculation based on food saved)
    const wasteReductionPercentage = Math.min(Math.round((totalFoodQuantity / 1000) * 10), 95) // Cap at 95%

    // Calculate progress towards goals
    const mealsGoal = 1500000 // 1.5M meals goal
    const orgsGoal = 3000 // 3K organizations goal
    const wasteGoal = 1000000 // 1M lbs goal (convert kg to lbs: kg * 2.2)

    const mealsProgress = Math.min(Math.round((totalMeals / mealsGoal) * 100), 100)
    const orgsProgress = Math.min(Math.round((stats.totalOrganizations / orgsGoal) * 100), 100)
    const wasteProgress = Math.min(Math.round(((totalFoodQuantity * 2.2) / wasteGoal) * 100), 100)

    // Mock growth metrics since we don't have historical data
    const donationGrowth = 15 // Mock 15% growth
    const userGrowth = 12 // Mock 12% growth

    // Mock some additional stats for website display
    const peopleServed = Math.round(totalMeals / 3) // Assume 3 meals per person served
    const citiesActive = Math.min(Math.round(stats.totalOrganizations / 20), 150) // Estimate cities
    const apiRequests = Math.round(stats.totalDonations * 1500) // Mock API usage

    return NextResponse.json({
      // Main website stats
      totalOrganizations: stats.totalOrganizations,
      totalMeals,
      totalDonations: stats.totalDonations,
      totalFoodQuantity,
      wasteReductionPercentage,
      peopleServed,
      citiesActive,

      // Environmental impact
      environmentalImpact: {
        methaneReduced,
        waterSaved,
        energySaved,
        foodSavedLbs: Math.round(totalFoodQuantity * 2.2)
      },

      // Progress towards goals
      progress: {
        meals: {
          current: totalMeals,
          goal: mealsGoal,
          percentage: mealsProgress
        },
        organizations: {
          current: stats.totalOrganizations,
          goal: orgsGoal,
          percentage: orgsProgress
        },
        wasteReduction: {
          current: Math.round(totalFoodQuantity * 2.2),
          goal: wasteGoal,
          percentage: wasteProgress
        }
      },

      // Organization distribution
      organizationTypes: orgTypeDistribution,

      // Growth metrics
      growth: {
        donations: donationGrowth,
        users: userGrowth
      },

      // Additional stats
      stats: {
        apiRequests,
        communityImpact: {
          improvedRelationships: 95, // Mock percentage
          increasedMealAccess: 78,   // Mock percentage
          regularDonors: Math.round(stats.totalOrganizations * 0.7) // 70% are regular
        }
      },

      // Last updated
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Website stats fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
