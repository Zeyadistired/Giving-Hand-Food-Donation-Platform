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
  Shield,
  CheckCircle,
  TrendingUp,
  MapPin,
  Globe,
  Leaf,
  Award,
  BarChart3,
  ArrowRight,
  Recycle
} from "lucide-react"

export default function ImpactPage() {
  const [websiteStats, setWebsiteStats] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  // Load website statistics
  useEffect(() => {
    const loadWebsiteStats = async () => {
      try {
        setStatsLoading(true)
        const response = await fetch('/api/website-stats')
        if (response.ok) {
          const data = await response.json()
          setWebsiteStats(data)
        } else {
          console.error('Failed to load website stats')
        }
      } catch (error) {
        console.error('Error loading website stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    loadWebsiteStats()
  }, [])
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <img src="/logo.png" alt="GivingHand Logo" className="h-8 w-8 object-contain" />
              </div>
              <span className="text-2xl font-bold text-gray-900">GivingHand</span>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">About</Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">How It Works</Link>
              <Link href="/impact" className="text-[#45A761] font-medium">Impact</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-8 px-4 py-2">Our Impact</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Measuring Our
            <span className="text-[#45A761] block">Collective Impact</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Every meal donated, every pound of food saved, and every community served contributes to a more
            sustainable and equitable world. Here's how we're making a difference together.
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <Card className="text-center p-8 border-2 hover:border-[#45A761] transition-all hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-4xl font-bold text-[#45A761] mb-2">
                  {statsLoading ? '...' : `${Math.round((websiteStats?.totalMeals || 0) / 1000)}K+`}
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">Meals Donated</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-[#45A761] transition-all hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-4xl font-bold text-[#45A761] mb-2">
                  {statsLoading ? '...' : `${websiteStats?.totalOrganizations?.toLocaleString() || 0}+`}
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">Organizations Connected</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-[#45A761] transition-all hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center">
                  <Recycle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-4xl font-bold text-[#45A761] mb-2">
                  {statsLoading ? '...' : `${Math.round((websiteStats?.environmentalImpact?.foodSavedLbs || 0) / 1000)}K`}
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">Pounds Food Saved</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-[#45A761] transition-all hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-4xl font-bold text-[#45A761] mb-2">
                  {statsLoading ? '...' : `${Math.round((websiteStats?.peopleServed || 0) / 1000)}K+`}
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">People Served</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Progress Indicators */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">2025  Progress</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    Meals Donation Goal: {statsLoading ? '...' : `${(websiteStats?.progress?.meals?.goal || 1500000) / 1000000}M`}
                  </span>
                  <span className="text-[#45A761] font-semibold">
                    {statsLoading ? '...' : `${websiteStats?.progress?.meals?.percentage || 0}% Complete`}
                  </span>
                </div>
                <Progress value={statsLoading ? 0 : websiteStats?.progress?.meals?.percentage || 0} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    Organizations Goal: {statsLoading ? '...' : `${(websiteStats?.progress?.organizations?.goal || 3000).toLocaleString()}`}
                  </span>
                  <span className="text-[#45A761] font-semibold">
                    {statsLoading ? '...' : `${websiteStats?.progress?.organizations?.percentage || 0}% Complete`}
                  </span>
                </div>
                <Progress value={statsLoading ? 0 : websiteStats?.progress?.organizations?.percentage || 0} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    Waste Reduction Goal: {statsLoading ? '...' : `${Math.round((websiteStats?.progress?.wasteReduction?.goal || 1000000) / 1000000)}M lbs`}
                  </span>
                  <span className="text-[#45A761] font-semibold">
                    {statsLoading ? '...' : `${websiteStats?.progress?.wasteReduction?.percentage || 0}% Complete`}
                  </span>
                </div>
                <Progress value={statsLoading ? 0 : websiteStats?.progress?.wasteReduction?.percentage || 0} className="h-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-wide">🌱 Environmental Impact of Giving Hand</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Every meal donated through our platform contributes to significant environmental benefits and helps protect our planet
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <Card className="text-center p-10 hover:shadow-xl transition-all border-2 hover:border-green-500">
              <CardHeader>
                <div className="mx-auto mb-8 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <Recycle className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-600 mb-6 tracking-wide">Reduces Landfill Waste</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Less surplus food ends up in landfills, which helps reduce overall solid waste and saves landfill space.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-10 hover:shadow-xl transition-all border-2 hover:border-blue-500">
              <CardHeader>
                <div className="mx-auto mb-8 w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-600 mb-6 tracking-wide">Lowers Greenhouse Gas Emissions</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Decomposing food in landfills releases methane — a potent greenhouse gas. Your app helps cut these emissions by redirecting food for use.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-10 hover:shadow-xl transition-all border-2 hover:border-purple-500">
              <CardHeader>
                <div className="mx-auto mb-8 w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center shadow-lg">
                  <Globe className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-purple-600 mb-6 tracking-wide">Conserves Natural Resources</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Every meal saved means less water, energy, and fuel used in farming, production, and transportation — reducing the strain on Earth's resources.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Social Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond environmental benefits, we're strengthening communities and supporting those in need
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Community Strengthening</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Food Security</h4>
                    <p className="text-gray-600">Providing consistent access to nutritious meals for vulnerable populations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Local Partnerships</h4>
                    <p className="text-gray-600">Fostering connections between businesses and community organizations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Recognition Programs</h4>
                    <p className="text-gray-600">Celebrating organizations that make significant contributions to their communities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#45A761]">
                    {statsLoading ? '...' : `${websiteStats?.stats?.communityImpact?.improvedRelationships || 95}%`}
                  </CardTitle>
                  <CardDescription>Organizations report improved community relationships</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center p-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#45A761]">
                    {statsLoading ? '...' : `${websiteStats?.stats?.communityImpact?.increasedMealAccess || 78}%`}
                  </CardTitle>
                  <CardDescription>Increase in regular meal access for beneficiaries</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center p-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#45A761]">
                    {statsLoading ? '...' : `${websiteStats?.citiesActive || 150}+`}
                  </CardTitle>
                  <CardDescription>Cities with active GivingHand networks</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center p-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#45A761]">4.9/5</CardTitle>
                  <CardDescription>Average satisfaction rating from users</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600">Real impact from real organizations in our network</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <Badge variant="success" className="w-fit mb-4">Food Provider</Badge>
                <CardTitle className="text-xl mb-4">"Reduced waste by 85%"</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  "Since joining GivingHand, our restaurant chain has diverted over 50,000 pounds of food from landfills 
                  while helping feed 15,000+ people in our community."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mt-4">- Sarah M., Regional Manager, Fresh Bistro Chain</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-4">Community Organization</Badge>
                <CardTitle className="text-xl mb-4">"Tripled our meal capacity"</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  "GivingHand has been a game-changer for our shelter. We now serve 300 meals daily instead of 100, 
                  and the quality of food has improved dramatically."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mt-4">- Michael R., Director, Hope Community Shelter</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <Badge variant="success" className="w-fit mb-4">Supermarket</Badge>
                <CardTitle className="text-xl mb-4">"Meaningful partnerships"</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  "Beyond reducing waste, GivingHand helped us build lasting relationships with local charities. 
                  It's transformed how we think about corporate responsibility."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mt-4">- Lisa K., Sustainability Manager, Metro Markets</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Be Part of the Impact</h2>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our growing network of organizations making a real difference in their communities and the environment.
          </p>
          <div className="flex justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Building2 className="h-5 w-5 mr-2" />
                Join Our Network
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
