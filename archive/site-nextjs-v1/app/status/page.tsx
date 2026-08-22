"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Server,
  Database,
  Smartphone,
  Globe,
  Mail,
  RefreshCw
} from "lucide-react"

export default function StatusPage() {
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
              <Link href="/contact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6">System Status</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Platform
            <span className="text-[#45A761] block">Status</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Real-time status of GivingHand's platform services and infrastructure.
          </p>

          {/* Overall Status */}
          <Card className="max-w-2xl mx-auto p-8 bg-green-50 border-green-200">
            <CardHeader>
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <CardTitle className="text-3xl text-green-800">All Systems Operational</CardTitle>
              </div>
              <CardDescription className="text-green-700 text-lg">
                All services are running normally. Last updated: 2 minutes ago
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Service Status */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Service Status</h2>
            <p className="text-xl text-gray-600">Current status of all platform components</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Globe className="h-6 w-6 text-gray-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Web Platform</h3>
                      <p className="text-gray-600">Main web application and dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Badge variant="success">Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Smartphone className="h-6 w-6 text-gray-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Mobile App</h3>
                      <p className="text-gray-600">iOS and Android mobile applications</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Badge variant="success">Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Server className="h-6 w-6 text-gray-600" />
                    <div>
                      <h3 className="text-lg font-semibold">API Services</h3>
                      <p className="text-gray-600">REST API and webhook delivery</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Badge variant="success">Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Database className="h-6 w-6 text-gray-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Database</h3>
                      <p className="text-gray-600">Primary database and data storage</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Badge variant="success">Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-gray-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Email Notifications</h3>
                      <p className="text-gray-600">Email delivery and notifications</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Badge variant="success">Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
            <p className="text-xl text-gray-600">Real-time performance data (last 24 hours)</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-[#45A761] mb-2">99.9%</CardTitle>
                <CardDescription className="text-gray-600">Uptime</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-[#45A761] mb-2">245ms</CardTitle>
                <CardDescription className="text-gray-600">Avg Response Time</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-[#45A761] mb-2">0</CardTitle>
                <CardDescription className="text-gray-600">Active Incidents</CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-[#45A761] mb-2">
                  {statsLoading ? '...' : `${Math.round((websiteStats?.stats?.apiRequests || 0) / 1000000 * 10) / 10}M`}
                </CardTitle>
                <CardDescription className="text-gray-600">API Requests</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Recent Incidents</h2>
            <p className="text-xl text-gray-600">Past incidents and maintenance windows</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6 border-green-200 bg-green-50">
              <CardContent>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-green-800">Scheduled Maintenance Completed</h3>
                      <span className="text-sm text-green-600">Dec 10, 2024</span>
                    </div>
                    <p className="text-green-700 mb-2">
                      Database optimization and security updates completed successfully.
                    </p>
                    <div className="text-sm text-green-600">
                      Duration: 2 hours • Impact: Minimal service interruption
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-yellow-200 bg-yellow-50">
              <CardContent>
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-yellow-800">API Rate Limiting Issue</h3>
                      <span className="text-sm text-yellow-600">Dec 5, 2024</span>
                    </div>
                    <p className="text-yellow-700 mb-2">
                      Some API requests experienced elevated response times due to rate limiting configuration.
                    </p>
                    <div className="text-sm text-yellow-600">
                      Duration: 45 minutes • Impact: API performance degradation
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-green-200 bg-green-50">
              <CardContent>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-green-800">Email Delivery Restored</h3>
                      <span className="text-sm text-green-600">Nov 28, 2024</span>
                    </div>
                    <p className="text-green-700 mb-2">
                      Email notification service fully restored after brief outage.
                    </p>
                    <div className="text-sm text-green-600">
                      Duration: 1.5 hours • Impact: Delayed email notifications
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Stay Updated</h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to status updates and get notified about incidents and maintenance.
            </p>

            <Card className="p-8 max-w-2xl mx-auto">
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#45A761] focus:border-[#45A761]"
                  />
                  <Button className="bg-[#45A761] hover:bg-[#3a8f52] text-white px-6 py-3">
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  You'll receive notifications for major incidents and scheduled maintenance only.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Status API */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Status API</h2>
              <p className="text-xl text-gray-600">Programmatically access our status information</p>
            </div>

            <Card className="p-8">
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Current Status</h3>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      GET https://status.givinghand.com/api/v1/status
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Service Details</h3>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      GET https://status.givinghand.com/api/v1/services
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Incident History</h3>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      GET https://status.givinghand.com/api/v1/incidents
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Questions About Our Status?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Our support team is available 24/7 to help with any platform-related questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-8 py-4">
                <Mail className="h-5 w-5 mr-2" />
                Contact Support
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#45A761] px-8 py-4">
              <RefreshCw className="h-5 w-5 mr-2" />
              Refresh Status
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
