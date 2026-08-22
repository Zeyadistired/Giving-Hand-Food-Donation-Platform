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
  Clock,
  Star,
  ArrowRight,
  Smartphone,
  Bell,
  Truck,
  UserCheck,
  FileText,
  Zap
} from "lucide-react"

export default function HowItWorksPage() {
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
              <Link href="/how-it-works" className="text-[#45A761] font-medium">How It Works</Link>
              <Link href="/impact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Impact</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-8 px-4 py-2">How It Works</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Simple Steps to
            <span className="text-[#45A761] block">Make an Impact</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Our platform makes it easy for food providers and community organizations to connect,
            reducing waste while feeding those in need through our secure, automated system.
          </p>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Progress Indicator */}
            <div className="flex justify-center mb-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#45A761] rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div className="w-32 h-1 bg-[#45A761] mx-4"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#45A761] rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div className="w-32 h-1 bg-[#45A761] mx-4"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#45A761] rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div className="w-32 h-1 bg-[#45A761] mx-4"></div>
                </div>
                <div className="w-12 h-12 bg-[#45A761] rounded-full flex items-center justify-center text-white font-bold">4</div>
              </div>
            </div>

            {/* Step Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-8 border-2 hover:border-[#45A761] transition-all hover:shadow-xl h-full flex flex-col">
                <div className="flex-1">
                  <CardHeader>
                    <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center shadow-lg">
                      <UserCheck className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-4">Register & Verify</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      Organizations sign up and go through our secure verification process to ensure trust and safety.
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="mt-auto">
                  <Badge variant="success" className="mt-4">
                    <Shield className="h-3 w-3 mr-1" />
                    Secure Process
                  </Badge>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-2 hover:border-[#45A761] transition-all hover:shadow-xl h-full flex flex-col">
                <div className="flex-1">
                  <CardHeader>
                    <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center shadow-lg">
                      <Smartphone className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-4">List Available Food</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      Food providers easily list surplus food through our mobile app or web platform with photos and details.
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="mt-auto">
                  <Badge variant="success" className="mt-4">
                    <Zap className="h-3 w-3 mr-1" />
                    Real-time Updates
                  </Badge>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-2 hover:border-[#45A761] transition-all hover:shadow-xl h-full flex flex-col">
                <div className="flex-1">
                  <CardHeader>
                    <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center shadow-lg">
                      <Heart className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-4">Donation Routing</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      Food donations are routed intelligently to the right charity or shelter.
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="mt-auto">
                  <Badge variant="success" className="mt-4">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    AI Powered
                  </Badge>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-2 hover:border-[#45A761] transition-all hover:shadow-xl h-full flex flex-col">
                <div className="flex-1">
                  <CardHeader>
                    <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center shadow-lg">
                      <Truck className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-4">Pickup & Delivery</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      Organizations coordinate pickup or delivery, with real-time tracking and confirmation for all parties.
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="mt-auto">
                  <Badge variant="success" className="mt-4">
                    <MapPin className="h-3 w-3 mr-1" />
                    GPS Tracking
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* For Food Providers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">For Food Providers</h2>
              <p className="text-xl text-gray-600">Restaurants, Hotels, Supermarkets & More</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Turn Waste into Impact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Quick Listing</h4>
                      <p className="text-gray-600">List surplus food in under 2 minutes with our simple interface</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bell className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Instant Notifications</h4>
                      <p className="text-gray-600">Get notified immediately when organizations show interest</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Impact Reports</h4>
                      <p className="text-gray-600">Track your environmental and social impact with detailed analytics</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4">Success Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Average Listing Time</span>
                      <span className="text-[#45A761] font-semibold">1.5 min</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Match Success Rate</span>
                      <span className="text-[#45A761] font-semibold">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">User Satisfaction</span>
                      <span className="text-[#45A761] font-semibold">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* For Community Organizations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">For Community Organizations</h2>
              <p className="text-xl text-gray-600">Charities, Shelters, Community Centers & More</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Card className="p-8 shadow-lg order-2 md:order-1">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4">Impact Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Meals Received This Month</span>
                      <span className="text-[#45A761] font-semibold">
                        {statsLoading ? '...' : `${Math.round((websiteStats?.totalMeals || 0) / 12).toLocaleString()}`}
                      </span>
                    </div>
                    <Progress value={statsLoading ? 0 : Math.min(((websiteStats?.totalMeals || 0) / 12000) * 100, 100)} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">People Served</span>
                      <span className="text-[#45A761] font-semibold">
                        {statsLoading ? '...' : `${Math.round((websiteStats?.peopleServed || 0) / 12).toLocaleString()}`}
                      </span>
                    </div>
                    <Progress value={statsLoading ? 0 : Math.min(((websiteStats?.peopleServed || 0) / 1200) * 100, 100)} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Partner Connections</span>
                      <span className="text-[#45A761] font-semibold">
                        {statsLoading ? '...' : `${websiteStats?.totalOrganizations || 0}`}
                      </span>
                    </div>
                    <Progress value={statsLoading ? 0 : Math.min(((websiteStats?.totalOrganizations || 0) / 100) * 100, 100)} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Access Fresh Food Daily</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Location-Based Matching</h4>
                      <p className="text-gray-600">Find food donations near your organization automatically</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Real-Time Availability</h4>
                      <p className="text-gray-600">See available food donations updated in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Quality Assurance</h4>
                      <p className="text-gray-600">All food donations are verified for quality and safety</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of organizations already making a difference through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Building2 className="h-5 w-5 mr-2" />
                Register Organization
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-white">
                <Building2 className="h-5 w-5 mr-2" />
                View Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
