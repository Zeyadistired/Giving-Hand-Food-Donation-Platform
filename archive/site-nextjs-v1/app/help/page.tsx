import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  Book,
  MessageSquare,
  Phone,
  Mail,
  Users,
  Building2,
  Settings,
  Shield,
  CreditCard,
  HelpCircle,
  FileText,
  Video,
  ArrowRight
} from "lucide-react"

export default function HelpPage() {
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
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">Help Center</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How Can We
            <span className="text-[#45A761] block">Help You?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Find answers to common questions, browse our guides, or get in touch with our support team.
          </p>

          {/* Join as Organization Button */}
          <div className="mb-12">
            <Link href="/signup">
              <Button size="lg" className="bg-[#45A761] hover:bg-[#3a8f52] text-white px-8 py-4">
                <Building2 className="h-5 w-5 mr-2" />
                Join as Organization
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Popular Help Topics</h2>
            <p className="text-xl text-gray-600">Quick access to the most common questions and guides</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Getting Started</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Learn how to set up your organization account and start using the platform
                </CardDescription>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Account setup guide</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Verification process</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>First donation walkthrough</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Managing Donations</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Everything you need to know about listing, claiming, and coordinating donations
                </CardDescription>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>How to list food donations</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Claiming available donations</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Pickup coordination</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Account Settings</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Manage your profile, notifications, and organization preferences
                </CardDescription>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Profile management</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Notification preferences</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Privacy settings</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Safety & Security</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Learn about our safety protocols and security measures
                </CardDescription>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Food safety guidelines</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Account security</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Reporting issues</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Billing & Plans</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Information about pricing, billing, and subscription management
                </CardDescription>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Plan comparison</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Billing information</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Upgrade/downgrade</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-[#45A761] rounded-lg flex items-center justify-center mb-4">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">Troubleshooting</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Solutions to common technical issues and problems
                </CardDescription>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Login problems</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>App not working</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#45A761]">
                    <ArrowRight className="h-4 w-4" />
                    <span>Notification issues</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
            <p className="text-xl text-gray-600">Our support team is here to assist you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-8 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Live Chat</CardTitle>
                <CardDescription className="text-gray-600 mb-6">
                  Get instant help through our live chat feature. Available 24/7 for urgent issues.
                </CardDescription>
                <Button className="bg-[#45A761] hover:bg-[#3a8f52] text-white">
                  Start Chat
                </Button>
              </CardHeader>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Email Support</CardTitle>
                <CardDescription className="text-gray-600 mb-6">
                  Send us a detailed message and we'll respond within 2-4 hours during business hours.
                </CardDescription>
                <Button variant="outline" className="border-[#45A761] text-[#45A761] hover:bg-[#45A761] hover:text-white">
                  Send Email
                </Button>
              </CardHeader>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Phone Support</CardTitle>
                <CardDescription className="text-gray-600 mb-6">
                  Speak directly with our support team for complex issues or urgent matters.
                </CardDescription>
                <div className="text-lg font-bold text-[#45A761] mb-4">+1 (555) 123-4567</div>
                <div className="text-sm text-gray-500">Mon-Fri: 8AM-8PM EST</div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Additional Resources</h2>
            <p className="text-xl text-gray-600">Explore more ways to get help and learn about our platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <Video className="h-12 w-12 text-[#45A761] mx-auto mb-4" />
                <CardTitle className="text-lg mb-2">Video Tutorials</CardTitle>
                <CardDescription className="text-gray-600">
                  Step-by-step video guides for all platform features
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <FileText className="h-12 w-12 text-[#45A761] mx-auto mb-4" />
                <CardTitle className="text-lg mb-2">User Guides</CardTitle>
                <CardDescription className="text-gray-600">
                  Comprehensive written documentation and guides
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <Users className="h-12 w-12 text-[#45A761] mx-auto mb-4" />
                <CardTitle className="text-lg mb-2">Community Forum</CardTitle>
                <CardDescription className="text-gray-600">
                  Connect with other users and share experiences
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all">
              <CardHeader>
                <Book className="h-12 w-12 text-[#45A761] mx-auto mb-4" />
                <CardTitle className="text-lg mb-2">Best Practices</CardTitle>
                <CardDescription className="text-gray-600">
                  Learn from successful organizations on our platform
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
            Join thousands of organizations already making a difference through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-8 py-4">
                <Building2 className="h-5 w-5 mr-2" />
                Get Started
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#45A761] px-8 py-4">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
