"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  Play,
  Calendar,
  Clock,
  Users,
  Building2,
  ArrowRight,
  Monitor,
  Smartphone,
  BarChart3,
  MessageSquare,
  Shield,
  Star
} from "lucide-react"

export default function DemoPage() {
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
              <Link href="/impact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Impact</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">Platform Demo</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            See GivingHand
            <span className="text-[#45A761] block">in Action</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Experience our platform firsthand with an interactive demo or schedule a personalized walkthrough 
            with our team to see how GivingHand can transform your organization's impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-[#45A761] hover:bg-[#3a8f52] text-white px-8 py-4 text-lg">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo Video
            </Button>
            <Button
              size="lg"
              className="bg-[#45A761] hover:bg-[#3a8f52] text-white px-8 py-4 text-lg font-bold shadow-xl border-2 border-[#45A761] transform hover:scale-105 transition-all duration-200"
              onClick={() => alert('Demo scheduling feature coming soon! Please contact us directly for now.')}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-[#45A761] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#3a8f52] transition-colors cursor-pointer">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Platform Overview</h3>
                  <p className="text-gray-300">5 minutes • See how organizations connect and make impact</p>
                </div>
                <Badge className="absolute top-4 right-4 bg-red-600 text-white">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  LIVE
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What You'll See in the Demo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get a comprehensive overview of all the features that make GivingHand the leading platform for food donation coordination.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Organization Dashboard</CardTitle>
                <CardDescription className="text-gray-600">
                  See how food providers and community organizations manage their profiles, donations, and partnerships through our intuitive dashboard.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Mobile Experience</CardTitle>
                <CardDescription className="text-gray-600">
                  Experience our mobile-first design that makes listing and claiming food donations quick and easy on any device.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Impact Analytics</CardTitle>
                <CardDescription className="text-gray-600">
                  Discover how organizations track their environmental and social impact with detailed reports and visualizations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Communication Tools</CardTitle>
                <CardDescription className="text-gray-600">
                  See how organizations coordinate pickups and deliveries with built-in messaging and notification systems.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Security Features</CardTitle>
                <CardDescription className="text-gray-600">
                  Learn about our verification process, security measures, and compliance features that keep all users safe.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Network Matching</CardTitle>
                <CardDescription className="text-gray-600">
                  Watch our AI-powered matching system connect food donations with nearby organizations in real-time.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Demo Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Schedule a Personalized Demo</h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Get a customized walkthrough tailored to your organization's specific needs and use cases. 
                  Our team will show you exactly how GivingHand can help you achieve your goals.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>30-minute personalized session</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Q&A with our product experts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Custom setup recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Implementation timeline discussion</span>
                  </div>
                </div>

                <Button size="lg" className="bg-[#45A761] hover:bg-[#3a8f52] text-white px-8 py-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Your Demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>

              <Card className="p-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl mb-6">Available Demo Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:border-[#45A761] cursor-pointer transition-colors">
                      <div>
                        <div className="font-semibold">Today, 2:00 PM EST</div>
                        <div className="text-sm text-gray-500">Available with Sarah M.</div>
                      </div>
                      <Badge variant="success">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:border-[#45A761] cursor-pointer transition-colors">
                      <div>
                        <div className="font-semibold">Tomorrow, 10:00 AM EST</div>
                        <div className="text-sm text-gray-500">Available with Michael R.</div>
                      </div>
                      <Badge variant="success">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:border-[#45A761] cursor-pointer transition-colors">
                      <div>
                        <div className="font-semibold">Tomorrow, 3:30 PM EST</div>
                        <div className="text-sm text-gray-500">Available with Lisa K.</div>
                      </div>
                      <Badge variant="success">Available</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="w-full">
                      <Clock className="h-4 w-4 mr-2" />
                      View More Times
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Organizations Say</h2>
            <p className="text-xl text-gray-600">Hear from organizations who've experienced our demo and platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-gray-600 mb-4">
                  "The GivingHand platform demonstration was exceptional. The real-time analytics and environmental impact tracking
                  features perfectly align with our sustainability goals. This solution will revolutionize how we manage food waste."
                </CardDescription>
                <div className="text-sm text-gray-500">
                  - Dr. AlShaimaa, Environmental Health Director<br />
                  Cairo Medical Center
                </div>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-gray-600 mb-4">
                  "As a healthcare professional, I'm impressed by the platform's comprehensive approach to food security and waste reduction.
                  The demo clearly showed how this technology can address both nutritional needs and environmental concerns effectively."
                </CardDescription>
                <div className="text-sm text-gray-500">
                  - Dr. Anas, Public Health Specialist<br />
                  Alexandria Health Authority
                </div>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-gray-600 mb-4">
                  "The demonstration highlighted the platform's potential for community health improvement. The integration of food donation
                  with health outcomes tracking is innovative and essential for our community wellness programs."
                </CardDescription>
                <div className="text-sm text-gray-500">
                  - Dr. Marwa, Community Health Coordinator<br />
                  Giza Community Health Center
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to See the Impact?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Experience firsthand how GivingHand can transform your organization's approach to food donation and community impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-8 py-4">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo Now
            </Button>
            <Button
              size="lg"
              className="bg-white text-[#45A761] hover:bg-gray-100 hover:text-[#3a8f52] px-8 py-4 font-bold shadow-xl border-2 border-white transform hover:scale-105 transition-all duration-200"
              onClick={() => alert('Demo scheduling feature coming soon! Please contact us directly for now.')}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Live Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
