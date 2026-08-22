import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import PaymentModal from "@/components/PaymentModal"
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
  Lock,
  Crown,
  Calendar,
  DollarSign,
  PieChart,
  LineChart,
  Activity,
  Target,
  Zap,
  Star
} from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <nav className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-[#45A761]" />
                <span className="text-2xl font-bold text-gray-900">GivingHand</span>
              </Link>
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
      <section className="py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-8 px-4 py-2">Premium Analytics</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Detailed Impact
            <span className="text-[#45A761] block">Analytics & Reports</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Get comprehensive insights into your organization's impact, environmental benefits, and community reach 
            with our premium analytics dashboard.
          </p>
        </div>
      </section>

      {/* Subscription Required Notice */}
      <section className="py-20 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-12 shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-full flex items-center justify-center mx-auto mb-8">
                <Lock className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Premium Analytics Access Required</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Unlock detailed analytics, custom reports, and advanced insights with our monthly subscription plan.
              </p>
              
              {/* Subscription Plan */}
              <div className="bg-gradient-to-br from-[#45A761] to-[#3a8f52] rounded-xl p-8 text-white mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Crown className="h-8 w-8 mr-3" />
                  <h3 className="text-2xl font-bold">Analytics Pro</h3>
                </div>
                <div className="text-4xl font-bold mb-2">500 EGP<span className="text-xl font-normal">/month</span></div>
                <p className="text-green-100 mb-6">Everything you need for comprehensive impact tracking</p>
                
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-200" />
                    <span>Real-time impact dashboard</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-200" />
                    <span>Custom report generation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-200" />
                    <span>Environmental impact tracking</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-200" />
                    <span>Community reach analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-200" />
                    <span>Monthly detailed reports</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-200" />
                    <span>Priority customer support</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PaymentModal>
                  <Button size="lg" className="bg-[#45A761] hover:bg-[#3a8f52] text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                    <Crown className="h-5 w-5 mr-2" />
                    Subscribe Now
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </PaymentModal>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-[#45A761] text-[#45A761] hover:bg-[#45A761] hover:text-white px-10 py-4 text-lg font-semibold">
                    <Building2 className="h-5 w-5 mr-2" />
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview of Analytics Features */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">What You'll Get Access To</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive analytics and reporting tools to track your organization's impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <Card className="text-center p-10 hover:shadow-xl transition-all border-2 relative">
              <div className="absolute top-4 right-4">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <CardHeader>
                <div className="mx-auto mb-8 w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
                  <BarChart3 className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-600 mb-6">Real-Time Dashboard</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Monitor your impact metrics in real-time with interactive charts and live data updates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-10 hover:shadow-xl transition-all border-2 relative">
              <div className="absolute top-4 right-4">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <CardHeader>
                <div className="mx-auto mb-8 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                  <PieChart className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-600 mb-6">Custom Reports</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Generate detailed reports tailored to your organization's needs and stakeholder requirements.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-10 hover:shadow-xl transition-all border-2 relative">
              <div className="absolute top-4 right-4">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <CardHeader>
                <div className="mx-auto mb-8 w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-12 w-12 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-purple-600 mb-6">Impact Tracking</CardTitle>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Track environmental and social impact metrics with detailed breakdowns and trend analysis.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo.png" alt="GivingHand Logo" className="h-8 w-8 object-contain mr-2" />
                <span className="text-2xl font-bold">GivingHand</span>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Connecting food providers with communities to reduce waste and feed those in need through our secure platform.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/impact" className="text-gray-400 hover:text-white transition-colors">Impact</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 GivingHand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
