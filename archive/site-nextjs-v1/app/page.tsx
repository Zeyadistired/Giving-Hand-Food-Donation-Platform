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
  Menu,
  X,
  ArrowRight,
  BarChart3,
  Globe,
  Lock
} from "lucide-react"

export default function HomePage() {
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
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <img src="/logo.png" alt="GivingHand Logo" className="h-8 w-8 object-contain" />
              </div>
              <span className="text-2xl font-bold text-gray-900">GivingHand</span>
              <Badge variant="outline" className="ml-2 text-xs">Verified Platform</Badge>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">
                About
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">
                How It Works
              </Link>
              <Link href="/impact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">
                Impact
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">
                Contact
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-[#45A761] text-[#45A761] hover:bg-[#45A761] hover:text-white transition-all">
                  Sign In
                </Button>
              </Link>
            </nav>

            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <section className="py-32 bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative">
          <div className="flex justify-center items-center gap-6 mb-12">
            <Badge variant="success" className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-4 w-4" />
              SSL Secured
            </Badge>
            <Badge variant="success" className="flex items-center gap-2 px-4 py-2">
              <CheckCircle className="h-4 w-4" />
              Verified Platform
            </Badge>
            <Badge variant="success" className="flex items-center gap-2 px-4 py-2">
              <Globe className="h-4 w-4" />
              Global Network
            </Badge>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Connecting Food Providers
            <span className="text-[#45A761] block">with Communities</span>
          </h1>

          <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            GivingHand bridges the gap between restaurants, hotels, supermarkets and charities, shelters, factories to
            <strong className="text-[#45A761]"> reduce food waste and feed communities</strong> through our secure, verified platform.
          </p>

          <div className="flex justify-center mb-16">
            <Button asChild size="lg" className="bg-[#45A761] hover:bg-[#3a8f52] text-white px-16 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-xl font-bold">
              <Link href="/signup">
                <Building2 className="h-6 w-6 mr-3" />
                Register Organization
                <ArrowRight className="h-6 w-6 ml-3" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#45A761] mb-2">
                {statsLoading ? '...' : `${websiteStats?.totalOrganizations?.toLocaleString() || 0}+`}
              </div>
              <div className="text-gray-600">Organizations Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#45A761] mb-2">
                {statsLoading ? '...' : `${Math.round((websiteStats?.totalMeals || 0) / 1000)}K+`}
              </div>
              <div className="text-gray-600">Meals Donated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#45A761] mb-2">
                {statsLoading ? '...' : `${websiteStats?.wasteReductionPercentage || 0}%`}
              </div>
              <div className="text-gray-600">Waste Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with Data Visualization */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 px-4 py-2">How It Works</Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Simple. Secure. Impactful.</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our platform makes it easy for organizations to connect and reduce food waste while helping communities through our verified, secure network.
            </p>
          </div>

          {/* Process Steps with Progress Indicator */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div className="w-24 h-1 bg-[#45A761] mx-2"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div className="w-24 h-1 bg-[#45A761] mx-2"></div>
                </div>
                <div className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <Card className="text-center p-10 border-2 hover:border-[#45A761] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 bg-white h-full flex flex-col">
              <div className="flex-1">
                <CardHeader>
                  <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center shadow-lg">
                    <Building2 className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-4 text-gray-900">Food Providers Register</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    Restaurants, hotels, and supermarkets sign up to donate excess food instead of wasting it.
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="mt-auto">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Registration Progress</span>
                    <span className="text-[#45A761] font-semibold">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <Badge variant="success" className="mt-4">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Process
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center p-10 border-2 hover:border-[#45A761] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 bg-white h-full flex flex-col">
              <div className="flex-1">
                <CardHeader>
                  <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-4 text-gray-900">Donation Routing</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    Food donations are routed intelligently to the right charity or shelter.
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="mt-auto">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Match Success Rate</span>
                    <span className="text-[#45A761] font-semibold">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <Badge variant="success" className="mt-4">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
              </CardContent>
            </Card>

            <Card className="text-center p-10 border-2 hover:border-[#45A761] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 bg-white h-full flex flex-col">
              <div className="flex-1">
                <CardHeader>
                  <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center shadow-lg">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-4 text-gray-900">Communities Benefit</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    Charities, shelters, and community centers receive fresh food to help feed those in need.
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="mt-auto">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Community Impact</span>
                    <span className="text-[#45A761] font-semibold">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <Badge variant="success" className="mt-4">
                  <Star className="h-3 w-3 mr-1" />
                  High Impact
                </Badge>
              </CardContent>
            </Card>
          </div>


        </div>
      </section>

      {/* Enhanced CTA Section with Security Indicators */}
      <section className="py-24 bg-gradient-to-r from-[#45A761] to-[#3a8f52] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 bg-white/20 text-white border-white/30">
              <Lock className="h-3 w-3 mr-1" />
              Secure Platform
            </Badge>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Make a
              <span className="block text-green-100">Difference?</span>
            </h2>

            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join <strong className="text-white">2,500+ organizations</strong> already using GivingHand to reduce waste and feed communities through our secure, verified platform.
            </p>

            {/* Enhanced CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-lg font-semibold">
                <Link href="/signup">
                  <Building2 className="h-5 w-5 mr-2" />
                  Get Started Today
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-lg font-semibold border-2 border-white">
                <Link href="/demo">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  View Demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Security Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-green-100">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span className="text-sm">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <img src="/logo.png" alt="GivingHand Logo" className="h-8 w-8 object-contain mr-2" />
                <span className="text-2xl font-bold">GivingHand</span>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Connecting food providers with communities to reduce waste and feed those in need through our secure platform.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-[#45A761]" />
                <span className="text-sm text-gray-400">SSL Secured Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#45A761]" />
                <span className="text-sm text-gray-400">Verified & Trusted</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-[#45A761] transition-colors">About Us</Link></li>
                <li><Link href="/how-it-works" className="text-gray-400 hover:text-[#45A761] transition-colors">How It Works</Link></li>
                <li><Link href="/impact" className="text-gray-400 hover:text-[#45A761] transition-colors">Our Impact</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-[#45A761] transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-[#45A761] transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-[#45A761] transition-colors">Contact Us</Link></li>
                <li><Link href="/api-docs" className="text-gray-400 hover:text-[#45A761] transition-colors">API Documentation</Link></li>
                <li><Link href="/status" className="text-gray-400 hover:text-[#45A761] transition-colors">System Status</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-[#45A761] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-[#45A761] transition-colors">Terms of Service</Link></li>
                <li><Link href="/compliance" className="text-gray-400 hover:text-[#45A761] transition-colors">Compliance</Link></li>
                <li><Link href="/security" className="text-gray-400 hover:text-[#45A761] transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 GivingHand. All rights reserved. Made with ❤️ for communities in need.
              </div>
              <div className="flex gap-4">
                <Badge variant="outline" className="border-gray-700 text-gray-400">
                  <Lock className="h-3 w-3 mr-1" />
                  HTTPS
                </Badge>
                <Badge variant="outline" className="border-gray-700 text-gray-400">
                  <Shield className="h-3 w-3 mr-1" />
                  SOC 2
                </Badge>
                <Badge variant="outline" className="border-gray-700 text-gray-400">
                  <Globe className="h-3 w-3 mr-1" />
                  GDPR
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
