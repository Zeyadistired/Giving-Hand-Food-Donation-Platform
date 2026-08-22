"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Users,
  Building2,
  Package,
  TrendingUp,
  MapPin,
  Globe,
  Leaf,
  Award,
  BarChart3,
  ArrowRight,
  Calendar,
  DollarSign,
  PieChart,
  LineChart,
  Activity,
  Target,
  Zap,
  Star,
  Download,
  Filter,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react"

export default function UserDashboard() {
  const [userSession, setUserSession] = useState<any>(null)
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('30')

  // Load user session and analytics data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionData = localStorage.getItem('userSession')
      if (sessionData) {
        const session = JSON.parse(sessionData)
        setUserSession(session)
        fetchUserAnalytics(session.id)
      } else {
        // Redirect to login if no session
        window.location.href = '/login'
      }
    }
  }, [])

  const fetchUserAnalytics = async (userId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/user-analytics?userId=${userId}&timeframe=${timeframe}`)
      if (response.ok) {
        const data = await response.json()
        setAnalyticsData(data)
      }
    } catch (error) {
      console.error('Error fetching user analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
    if (userSession) {
      fetchUserAnalytics(userSession.id)
    }
  }

  if (!userSession) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#45A761] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <nav className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/logo.png" alt="GivingHand Logo" className="h-8 w-8 object-contain" />
                <span className="text-2xl font-bold text-gray-900">GivingHand</span>
              </Link>
              <Badge variant="outline" className="bg-[#45A761] text-white border-[#45A761]">
                <Star className="h-3 w-3 mr-1" />
                Analytics Pro
              </Badge>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/donate-food">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Donations
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {userSession.organization_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {userSession.organization_name || 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {userSession.organization_name || 'User'}!
              </h1>
              <p className="text-gray-600">
                Here's your impact analytics and donation insights
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={timeframe}
                onChange={(e) => handleTimeframeChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761]"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
              </select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-16 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Your Donations</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData?.userDonations || 0}
                      </p>
                      <p className="text-xs text-green-600">
                        +{analyticsData?.donationGrowth || 0}% this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">People Helped</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData?.peopleHelped || 0}
                      </p>
                      <p className="text-xs text-blue-600">
                        Through your donations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Leaf className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">CO₂ Reduced</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData?.co2Reduced || 0} kg
                      </p>
                      <p className="text-xs text-purple-600">
                        Environmental impact
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Impact Score</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData?.impactScore || 0}
                      </p>
                      <p className="text-xs text-orange-600">
                        Out of 100
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Donation Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Donation Timeline</CardTitle>
                  <CardDescription>Track your donation activity over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {analyticsData?.donationTimeline ? (
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-[#45A761] mx-auto mb-2" />
                        <p className="text-gray-600">Donation timeline visualization</p>
                        <p className="text-sm text-gray-500">
                          {Object.keys(analyticsData.donationTimeline).length} donation days tracked
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">No donation data yet</p>
                        <p className="text-sm text-gray-400">Start donating to see your timeline</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Impact Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Your contribution to sustainability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Waste Prevented</span>
                        <span className="text-sm text-gray-600">
                          {analyticsData?.wastePrevented || 0} kg
                        </span>
                      </div>
                      <Progress value={Math.min((analyticsData?.wastePrevented || 0) / 100 * 100, 100)} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Meals Provided</span>
                        <span className="text-sm text-gray-600">
                          {analyticsData?.mealsProvided || 0} meals
                        </span>
                      </div>
                      <Progress value={Math.min((analyticsData?.mealsProvided || 0) / 50 * 100, 100)} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Water Saved</span>
                        <span className="text-sm text-gray-600">
                          {analyticsData?.waterSaved || 0} L
                        </span>
                      </div>
                      <Progress value={Math.min((analyticsData?.waterSaved || 0) / 1000 * 100, 100)} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Donations */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                  <CardDescription>Your latest donation activities</CardDescription>
                </CardHeader>
                <CardContent>
                  {analyticsData?.recentActivity && analyticsData.recentActivity.length > 0 ? (
                    <div className="space-y-4">
                      {analyticsData.recentActivity.slice(0, 5).map((donation: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              donation.status === 'approved' ? 'bg-green-500' :
                              donation.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <div>
                              <p className="font-medium text-sm">{donation.food_category || 'Food Donation'}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(donation.created_at).toLocaleDateString('en-EG')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{donation.quantity} kg</p>
                            <Badge variant={
                              donation.status === 'approved' ? 'default' :
                              donation.status === 'pending' ? 'secondary' : 'destructive'
                            } className="text-xs">
                              {donation.status || 'pending'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No recent donations</p>
                      <p className="text-sm text-gray-400">Start donating to see your activity here</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Donation Status Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Donation Status</CardTitle>
                  <CardDescription>Status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData?.statusDistribution ? (
                      Object.entries(analyticsData.statusDistribution).map(([status, count]: [string, any]) => (
                        <div key={status} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {status === 'approved' && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {status === 'pending' && <Clock className="h-4 w-4 text-yellow-500" />}
                            {status === 'rejected' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                            <span className="text-sm capitalize">{status}</span>
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No status data available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Goals and Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Goals</CardTitle>
                  <CardDescription>Track your progress towards monthly targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Donations Goal (10)</span>
                        <span className="text-sm text-gray-600">
                          {Math.min(Math.round(((analyticsData?.userDonations || 0) / 10) * 100), 100)}%
                        </span>
                      </div>
                      <Progress value={Math.min(((analyticsData?.userDonations || 0) / 10) * 100, 100)} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {analyticsData?.userDonations || 0} of 10 donations completed
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Impact Goal (100 kg CO₂)</span>
                        <span className="text-sm text-gray-600">
                          {Math.min(Math.round(((analyticsData?.co2Reduced || 0) / 100) * 100), 100)}%
                        </span>
                      </div>
                      <Progress value={Math.min(((analyticsData?.co2Reduced || 0) / 100) * 100, 100)} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {analyticsData?.co2Reduced || 0} kg CO₂ reduced
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your impact milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                      (analyticsData?.userDonations || 0) >= 1 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                    }`}>
                      <Award className={`h-6 w-6 ${
                        (analyticsData?.userDonations || 0) >= 1 ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">First Donation</p>
                        <p className="text-xs text-gray-500">Make your first food donation</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                      (analyticsData?.userDonations || 0) >= 5 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                    }`}>
                      <Star className={`h-6 w-6 ${
                        (analyticsData?.userDonations || 0) >= 5 ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">Regular Donor</p>
                        <p className="text-xs text-gray-500">Complete 5 donations</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                      (analyticsData?.co2Reduced || 0) >= 50 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                    }`}>
                      <Leaf className={`h-6 w-6 ${
                        (analyticsData?.co2Reduced || 0) >= 50 ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">Eco Warrior</p>
                        <p className="text-xs text-gray-500">Reduce 50kg CO₂ emissions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
