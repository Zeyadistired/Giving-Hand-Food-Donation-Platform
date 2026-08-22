"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Headphones,
  FileText,
  Users,
  Building2,
  ArrowRight,
  Calendar
} from "lucide-react"

export default function ContactPage() {
  const [showComingSoonPopup, setShowComingSoonPopup] = useState(false)

  const handleLiveChatClick = () => {
    setShowComingSoonPopup(true)
  }

  const closePopup = () => {
    setShowComingSoonPopup(false)
  }

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
              <Link href="/contact" className="text-[#45A761] font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-8 px-4 py-2">Contact Us</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Get in Touch
            <span className="text-[#45A761] block">We're Here to Help</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Have questions about our platform? Need support with your account? Want to partner with us?
            Our team is ready to assist you in making a positive impact.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <Card className="text-center p-8 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Email Support</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Get detailed help via email. We typically respond within 2-4 hours during business hours.
                </CardDescription>
                <div className="space-y-2">
                  <p className="text-sm font-medium">General: support@givinghand.com</p>
                  <p className="text-sm font-medium">Partnerships: partners@givinghand.com</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Phone Support</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Speak directly with our support team for urgent matters and technical assistance.
                </CardDescription>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-[#45A761]">19006</p>
                  <p className="text-sm text-gray-500">Sun-Thu: 9AM-6PM EET</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Live Chat</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  Get instant help through our live chat feature available on our platform.
                </CardDescription>
                <Button
                  onClick={handleLiveChatClick}
                  className="bg-[#45A761] hover:bg-[#3a8f52] text-white"
                >
                  Start Chat
                </Button>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-3xl mb-4">Send us a Message</CardTitle>
                <CardDescription className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input placeholder="John" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input placeholder="Doe" className="w-full" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="john@example.com" className="w-full" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                    <Input placeholder="Your Organization Name" className="w-full" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A761]">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Partnership Opportunity</option>
                      <option>Account Issues</option>
                      <option>Feature Request</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={5} 
                      placeholder="Tell us how we can help you..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A761]"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-[#45A761] hover:bg-[#3a8f52] text-white py-3">
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-[#45A761]" />
                    <CardTitle className="text-xl">Our Office</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    15 Tahrir Square<br />
                    Downtown<br />
                    Cairo, Egypt 11511<br />
                    Arab Republic of Egypt
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-[#45A761]" />
                    <CardTitle className="text-xl">Business Hours</CardTitle>
                  </div>
                  <div className="text-gray-600 space-y-1">
                    <div>Sunday - Thursday: 9:00 AM - 6:00 PM EET</div>
                    <div>Friday: 1:00 PM - 5:00 PM EET</div>
                    <div>Saturday: Closed</div>
                    <div className="text-sm text-[#45A761] mt-2">Emergency support available 24/7</div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Headphones className="h-6 w-6 text-[#45A761]" />
                    <CardTitle className="text-xl">Support Channels</CardTitle>
                  </div>
                  <div className="text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <Link href="/help" className="hover:text-[#45A761] transition-colors">Help Center & FAQ</Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Community Forum</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <Link href="/api-docs" className="hover:text-[#45A761] transition-colors">API Documentation</Link>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg mb-2">How quickly can I get started on the platform?</CardTitle>
                <CardDescription className="text-gray-600">
                  Most organizations can complete registration and verification within 24-48 hours. Once approved, 
                  you can immediately start listing food donations or browsing available donations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg mb-2">Is there a cost to use GivingHand?</CardTitle>
                <CardDescription className="text-gray-600">
                  Our basic platform is free for all verified organizations. We offer premium features and 
                  enterprise solutions for larger organizations with advanced needs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg mb-2">How do you ensure food safety?</CardTitle>
                <CardDescription className="text-gray-600">
                  All organizations go through verification, and we provide guidelines for safe food handling. 
                  Food providers are responsible for ensuring donations meet safety standards before listing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg mb-2">Can I track the impact of my donations?</CardTitle>
                <CardDescription className="text-gray-600">
                  Yes! Our platform provides detailed analytics showing meals donated, people served, 
                  environmental impact, and community feedback for all your contributions.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Make a Difference?</h2>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Don't wait to start making an impact. Join our community of organizations working together
            to reduce waste and feed communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <Building2 className="h-5 w-5 mr-2" />
                Get Started Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-white">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coming Soon Popup */}
      {showComingSoonPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Live Chat
              </h2>

              {/* Message */}
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Our live chat feature is currently under development.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-semibold text-lg">
                    🚀 Coming Soon!
                  </p>
                  <p className="text-blue-700 text-sm mt-1">
                    We're working hard to bring you real-time support. In the meantime, please use our contact form or email us directly.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={closePopup}
                  className="flex-1 bg-[#45A761] hover:bg-[#3a8f52] text-white"
                >
                  Got It
                </Button>
                <Button
                  variant="outline"
                  onClick={closePopup}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
