import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  X,
  Building2,
  Users,
  ArrowRight,
  Star,
  Shield,
  Zap,
  BarChart3,
  Headphones,
  Globe
} from "lucide-react"

export default function PricingPage() {
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
              <Link href="/contact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">Pricing Plans</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="text-[#45A761] block">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Choose the plan that fits your organization's needs. Start free and upgrade as you grow your impact.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Free Plan */}
            <Card className="p-8 border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Community</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">Free</div>
                  <p className="text-gray-600">Perfect for small organizations getting started</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Up to 50 donations per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Basic matching algorithm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Mobile app access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Basic impact reporting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Community support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">Priority support</span>
                  </div>
                </div>
                <Button className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="p-8 border-2 border-[#45A761] hover:shadow-xl transition-all relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#45A761] text-white">
                Most Popular
              </Badge>
              <CardHeader>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                  <div className="text-4xl font-bold text-[#45A761] mb-2">$49<span className="text-lg text-gray-600">/month</span></div>
                  <p className="text-gray-600">For growing organizations with regular donations</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Unlimited donations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Advanced AI matching</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Mobile app + web dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Advanced impact analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Priority email support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Custom branding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>API access</span>
                  </div>
                </div>
                <Button className="w-full bg-[#45A761] hover:bg-[#3a8f52] text-white">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="p-8 border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">Custom</div>
                  <p className="text-gray-600">For large organizations with complex needs</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Everything in Professional</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Multi-location management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Advanced integrations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>24/7 phone support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Custom training & onboarding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>SLA guarantees</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-[#45A761] text-[#45A761] hover:bg-[#45A761] hover:text-white">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Compare Features</h2>
            <p className="text-xl text-gray-600">See what's included in each plan</p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-6 font-semibold">Features</th>
                  <th className="text-center p-6 font-semibold">Community</th>
                  <th className="text-center p-6 font-semibold text-[#45A761]">Professional</th>
                  <th className="text-center p-6 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-6">Monthly donations</td>
                  <td className="text-center p-6">50</td>
                  <td className="text-center p-6 text-[#45A761]">Unlimited</td>
                  <td className="text-center p-6">Unlimited</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-6">AI matching</td>
                  <td className="text-center p-6">Basic</td>
                  <td className="text-center p-6 text-[#45A761]">Advanced</td>
                  <td className="text-center p-6">Advanced</td>
                </tr>
                <tr className="border-b">
                  <td className="p-6">Impact analytics</td>
                  <td className="text-center p-6">Basic</td>
                  <td className="text-center p-6 text-[#45A761]">Advanced</td>
                  <td className="text-center p-6">Advanced</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-6">Support</td>
                  <td className="text-center p-6">Community</td>
                  <td className="text-center p-6 text-[#45A761]">Priority Email</td>
                  <td className="text-center p-6">24/7 Phone</td>
                </tr>
                <tr className="border-b">
                  <td className="p-6">API access</td>
                  <td className="text-center p-6"><X className="h-5 w-5 text-gray-400 mx-auto" /></td>
                  <td className="text-center p-6"><CheckCircle className="h-5 w-5 text-[#45A761] mx-auto" /></td>
                  <td className="text-center p-6"><CheckCircle className="h-5 w-5 text-[#45A761] mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg mb-2">Can I change plans anytime?</CardTitle>
                <CardDescription>
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate any billing adjustments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg mb-2">Is there a free trial for paid plans?</CardTitle>
                <CardDescription>
                  Yes, we offer a 14-day free trial for our Professional plan. No credit card required to start.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg mb-2">What payment methods do you accept?</CardTitle>
                <CardDescription>
                  We accept all major credit cards, PayPal, and can arrange invoicing for Enterprise customers.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join thousands of organizations making a difference. Start free and upgrade as you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-8 py-4">
                <Building2 className="h-5 w-5 mr-2" />
                Start Free Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#45A761] px-8 py-4">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
