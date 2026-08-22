import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Building2,
  Shield,
  CheckCircle,
  TrendingUp,
  MapPin,
  Globe,
  Award,
  Target,
  Lightbulb,
  ArrowRight
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="h-8 w-8 text-[#45A761]" />
                <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-green-600 bg-white rounded-full" />
              </div>
              <span className="text-2xl font-bold text-gray-900">GivingHand</span>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Home</Link>
              <Link href="/about" className="text-[#45A761] font-medium">About</Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">How It Works</Link>
              <Link href="/impact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Impact</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-36 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-8 text-center">
          <Badge variant="outline" className="mb-10 px-6 py-3 border text-sm">About GivingHand</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-10 tracking-wide leading-tight">
            Bridging the Gap Between
            <span className="text-[#45A761] block mt-2">Waste and Need</span>
          </h1>
          <p className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
            Founded with a mission to eliminate food waste while feeding communities, GivingHand connects food providers
            with organizations that serve those in need through our secure, verified platform.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20 max-w-7xl mx-auto">
            <Card className="p-10 border-2 hover:border-[#45A761] transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-20 h-20 bg-[#45A761] rounded-full flex items-center justify-center mb-6">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl mb-6 tracking-wide">Our Mission</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  To create a world where no food goes to waste while people go hungry. We connect surplus food
                  from restaurants, hotels, and supermarkets with charities, shelters, and community organizations
                  that feed those in need.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-10 border-2 hover:border-[#45A761] transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-20 h-20 bg-[#45A761] rounded-full flex items-center justify-center mb-6">
                  <Lightbulb className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl mb-6 tracking-wide">Our Vision</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  A sustainable future where technology enables seamless food redistribution, creating stronger
                  communities while protecting our environment. We envision a global network of organizations
                  working together to end food waste and hunger.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-wide">Our Story</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              GivingHand was born from a simple observation: while millions of people struggle with food insecurity,
              tons of perfectly good food are wasted daily by restaurants, hotels, and supermarkets. We saw an
              opportunity to use technology to bridge this gap and create positive impact for both businesses and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-[#45A761] rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl font-bold text-white">2025</span>
              </div>
              <h3 className="text-xl font-semibold mb-6 tracking-wide">Founded</h3>
              <p className="text-gray-600 leading-relaxed">Started with a vision to connect food providers with communities in need</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-[#45A761] rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl font-bold text-white">...</span>
              </div>
              <h3 className="text-xl font-semibold mb-6 tracking-wide">Growth</h3>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-[#45A761] rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl font-bold text-white">...</span>
              </div>
              <h3 className="text-xl font-semibold mb-6 tracking-wide">Impact</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-wide">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These core values guide everything we do and shape how we build relationships with our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <Card className="text-center p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <Shield className="h-12 w-12 text-[#45A761] mx-auto mb-4" />
                <CardTitle className="text-xl mb-2">Trust</CardTitle>
                <CardDescription>
                  Building secure, verified connections between all parties in our network
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <Heart className="h-12 w-12 text-[#45A761] mx-auto mb-4" />
                <CardTitle className="text-xl mb-2">Compassion</CardTitle>
                <CardDescription>
                  Driven by empathy and the desire to help communities in need
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-[#45A761] mx-auto mb-4" />
                <CardTitle className="text-xl mb-2">Innovation</CardTitle>
                <CardDescription>
                  Using cutting-edge technology to solve complex social problems
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <Globe className="h-12 w-12 text-[#45A761] mx-auto mb-4" />
                <CardTitle className="text-xl mb-2">Sustainability</CardTitle>
                <CardDescription>
                  Creating lasting positive impact for our planet and communities
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Join Our Mission</h2>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Be part of the solution. Whether you're a food provider or community organization,
            together we can make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Building2 className="h-5 w-5 mr-2" />
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-white">
                <Building2 className="h-5 w-5 mr-2" />
                Contact Us
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
