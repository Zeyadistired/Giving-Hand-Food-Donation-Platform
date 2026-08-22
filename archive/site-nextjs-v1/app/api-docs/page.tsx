import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  Code,
  Book,
  Zap,
  Shield,
  Building2,
  Users,
  Mail,
  ExternalLink,
  Copy
} from "lucide-react"

export default function ApiDocsPage() {
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
              <Link href="/contact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Contact</Link>
              <Link href="/login">
                <Button className="bg-[#45A761] hover:bg-[#3a8f52] text-white">Login</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">Developer Resources</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            API
            <span className="text-[#45A761] block">Documentation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Integrate GivingHand's food donation platform into your applications with our comprehensive REST API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#45A761] hover:bg-[#3a8f52] text-white px-8 py-4">
              <Code className="h-5 w-5 mr-2" />
              Get API Key
            </Button>
            <Button size="lg" variant="outline" className="border-[#45A761] text-[#45A761] hover:bg-[#45A761] hover:text-white px-8 py-4">
              <ExternalLink className="h-5 w-5 mr-2" />
              Interactive Docs
            </Button>
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">API Overview</h2>
            <p className="text-xl text-gray-600">RESTful API with comprehensive endpoints for food donation management</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg mb-2">Organizations</CardTitle>
                <CardDescription className="text-gray-600">
                  Manage organization profiles, verification status, and settings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg mb-2">Donations</CardTitle>
                <CardDescription className="text-gray-600">
                  Create, update, and manage food donation listings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg mb-2">Matching</CardTitle>
                <CardDescription className="text-gray-600">
                  Access our AI-powered matching algorithms and results
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg mb-2">Analytics</CardTitle>
                <CardDescription className="text-gray-600">
                  Retrieve impact metrics and detailed reporting data
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Quick Start</h2>
              <p className="text-xl text-gray-600">Get up and running with the GivingHand API in minutes</p>
            </div>

            <div className="space-y-8">
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center text-white font-bold text-sm">1</span>
                    Get Your API Key
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg mb-4">
                    Sign up for a GivingHand account and generate your API key from the developer dashboard.
                  </CardDescription>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <span>API_KEY=gv_live_1234567890abcdef...</span>
                      <Button size="sm" variant="ghost">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center text-white font-bold text-sm">2</span>
                    Make Your First Request
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg mb-4">
                    Test your connection by fetching your organization details.
                  </CardDescription>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div>curl -H "Authorization: Bearer YOUR_API_KEY" \</div>
                    <div className="ml-4">https://api.givinghand.com/v1/organizations/me</div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#45A761] rounded-full flex items-center justify-center text-white font-bold text-sm">3</span>
                    Create a Donation
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg mb-4">
                    List your first food donation using the API.
                  </CardDescription>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div>curl -X POST \</div>
                    <div className="ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                    <div className="ml-4">-H "Content-Type: application/json" \</div>
                    <div className="ml-4">-d '{"{"}"title": "Fresh Sandwiches", "quantity": 50{"}"}' \</div>
                    <div className="ml-4">https://api.givinghand.com/v1/donations</div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">API Features</h2>
            <p className="text-xl text-gray-600">Built for developers, designed for scale</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardHeader>
                <Shield className="h-8 w-8 text-[#45A761] mb-4" />
                <CardTitle className="text-xl mb-2">Secure Authentication</CardTitle>
                <CardDescription className="text-gray-600">
                  OAuth 2.0 and API key authentication with rate limiting and security monitoring
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <Zap className="h-8 w-8 text-[#45A761] mb-4" />
                <CardTitle className="text-xl mb-2">Real-time Webhooks</CardTitle>
                <CardDescription className="text-gray-600">
                  Get instant notifications for donation matches, status updates, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <Code className="h-8 w-8 text-[#45A761] mb-4" />
                <CardTitle className="text-xl mb-2">RESTful Design</CardTitle>
                <CardDescription className="text-gray-600">
                  Clean, predictable URLs with standard HTTP methods and status codes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <Book className="h-8 w-8 text-[#45A761] mb-4" />
                <CardTitle className="text-xl mb-2">Comprehensive Docs</CardTitle>
                <CardDescription className="text-gray-600">
                  Interactive documentation with code examples in multiple languages
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <Users className="h-8 w-8 text-[#45A761] mb-4" />
                <CardTitle className="text-xl mb-2">SDKs Available</CardTitle>
                <CardDescription className="text-gray-600">
                  Official SDKs for JavaScript, Python, PHP, and more coming soon
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <Heart className="h-8 w-8 text-[#45A761] mb-4" />
                <CardTitle className="text-xl mb-2">Developer Support</CardTitle>
                <CardDescription className="text-gray-600">
                  Dedicated developer support team and active community forum
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Rate Limits & Pricing</h2>
              <p className="text-xl text-gray-600">Fair usage policies and transparent pricing</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <CardHeader>
                  <Badge className="mx-auto mb-4 bg-gray-100 text-gray-800">Free Tier</Badge>
                  <CardTitle className="text-2xl mb-2">1,000 requests/month</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    Perfect for testing and small integrations
                  </CardDescription>
                  <div className="text-3xl font-bold text-gray-900 mb-2">$0</div>
                </CardHeader>
              </Card>

              <Card className="p-6 text-center border-2 border-[#45A761]">
                <CardHeader>
                  <Badge className="mx-auto mb-4 bg-[#45A761] text-white">Professional</Badge>
                  <CardTitle className="text-2xl mb-2">50,000 requests/month</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    For production applications and integrations
                  </CardDescription>
                  <div className="text-3xl font-bold text-[#45A761] mb-2">$49<span className="text-lg text-gray-600">/month</span></div>
                </CardHeader>
              </Card>

              <Card className="p-6 text-center">
                <CardHeader>
                  <Badge className="mx-auto mb-4 bg-gray-800 text-white">Enterprise</Badge>
                  <CardTitle className="text-2xl mb-2">Unlimited requests</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    Custom limits and dedicated support
                  </CardDescription>
                  <div className="text-3xl font-bold text-gray-900 mb-2">Custom</div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Start Building Today</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join developers who are building innovative solutions on top of the GivingHand platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-8 py-4">
              <Code className="h-5 w-5 mr-2" />
              Get API Key
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#45A761] px-8 py-4">
              <Mail className="h-5 w-5 mr-2" />
              Contact Developer Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
