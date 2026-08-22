import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  Shield,
  FileText,
  Globe,
  Award,
  Building2,
  Users,
  Mail
} from "lucide-react"

export default function CompliancePage() {
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
          <Badge variant="outline" className="mb-6">Compliance</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Regulatory
            <span className="text-[#45A761] block">Compliance</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            GivingHand maintains the highest standards of regulatory compliance to ensure trust, safety, and legal adherence across all jurisdictions.
          </p>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Compliance Standards</h2>
            <p className="text-xl text-gray-600">We adhere to international and local regulatory requirements</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">GDPR Compliance</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Full compliance with European General Data Protection Regulation, ensuring proper data handling and user rights protection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">SOC 2 Type II</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Independently audited security, availability, processing integrity, confidentiality, and privacy controls.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Food Safety Standards</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Adherence to FDA, USDA, and local health department guidelines for food handling and distribution.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Non-Profit Regulations</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Compliance with IRS regulations for non-profit organizations and charitable donation requirements.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Accessibility Standards</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  WCAG 2.1 AA compliance ensuring our platform is accessible to users with disabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Industry Certifications</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  ISO 27001 information security management and other relevant industry certifications.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance Framework */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Compliance Framework</h2>
              <p className="text-xl text-gray-600">Systematic approach to maintaining regulatory compliance</p>
            </div>

            <div className="space-y-8">
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-[#45A761]" />
                    Regular Audits
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg leading-relaxed">
                    We conduct quarterly internal audits and annual third-party audits to ensure ongoing compliance 
                    with all applicable regulations. Our audit reports are available to enterprise customers upon request.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                    <Shield className="h-6 w-6 text-[#45A761]" />
                    Continuous Monitoring
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg leading-relaxed">
                    Our compliance team continuously monitors regulatory changes and updates our policies and 
                    procedures accordingly. We maintain real-time compliance dashboards for key metrics.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                    <Users className="h-6 w-6 text-[#45A761]" />
                    Staff Training
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg leading-relaxed">
                    All team members receive regular compliance training and certification. We maintain detailed 
                    training records and ensure all staff understand their compliance responsibilities.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Documentation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Compliance Documentation</h2>
            <p className="text-xl text-gray-600">Access our compliance certificates and reports</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl mb-4">Available Documents</CardTitle>
                <CardDescription className="text-gray-600 space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>SOC 2 Type II Report</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>GDPR Compliance Certificate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>ISO 27001 Certificate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Penetration Test Reports</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761]" />
                    <span>Data Processing Agreements</span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl mb-4">Request Access</CardTitle>
                <CardDescription className="text-gray-600 mb-6">
                  Enterprise customers and potential partners can request access to our compliance documentation. 
                  Please contact our compliance team with your specific requirements.
                </CardDescription>
                <Button className="bg-[#45A761] hover:bg-[#3a8f52] text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Request Documents
                </Button>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Compliance Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Compliance Questions?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our compliance team is available to answer questions about our regulatory adherence and certifications.
            </p>

            <Card className="p-8 max-w-2xl mx-auto">
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 justify-center">
                    <Mail className="h-5 w-5 text-[#45A761]" />
                    <span className="text-lg font-semibold">compliance@givinghand.com</span>
                  </div>
                  <p className="text-gray-600">
                    We respond to compliance inquiries within 24 hours during business days. 
                    For urgent compliance matters, please mark your email as "URGENT".
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Compliant by Design</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join a platform built with compliance and security as foundational principles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-8 py-4">
                <Building2 className="h-5 w-5 mr-2" />
                Join GivingHand
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#45A761] px-8 py-4">
                Contact Compliance Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
