import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  Shield,
  Lock,
  Eye,
  Server,
  UserCheck,
  AlertTriangle,
  FileText,
  Mail
} from "lucide-react"

export default function SecurityPage() {
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
          <Badge variant="outline" className="mb-6">Security</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Security is
            <span className="text-[#45A761] block">Our Priority</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Learn about the comprehensive security measures we've implemented to protect your data and ensure safe food donations.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Multi-Layer Security</h2>
            <p className="text-xl text-gray-600">Protecting your data with industry-leading security measures</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Data Encryption</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  All data is encrypted using AES-256 encryption both in transit and at rest. Your sensitive information is protected with military-grade security.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Organization Verification</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Every organization undergoes thorough verification including legal documentation, tax-exempt status, and background checks.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Server className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Secure Infrastructure</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Our platform runs on secure, monitored servers with 24/7 intrusion detection and automated security updates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Access Controls</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Strict role-based access controls ensure only authorized personnel can access sensitive data and system functions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Threat Monitoring</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Advanced threat detection systems monitor for suspicious activity and automatically respond to potential security incidents.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <CardHeader>
                <div className="mx-auto mb-6 w-16 h-16 bg-[#45A761] rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-4">Compliance</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  We maintain compliance with GDPR, SOC 2, and other industry standards through regular audits and assessments.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Security Certifications</h2>
            <p className="text-xl text-gray-600">Independently verified security standards</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <CardHeader>
                <Badge className="mx-auto mb-4 bg-[#45A761] text-white text-lg px-4 py-2">SOC 2 Type II</Badge>
                <CardTitle className="text-xl mb-2">Security Controls</CardTitle>
                <CardDescription className="text-gray-600">
                  Independently audited security, availability, and confidentiality controls
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 text-center">
              <CardHeader>
                <Badge className="mx-auto mb-4 bg-[#45A761] text-white text-lg px-4 py-2">GDPR</Badge>
                <CardTitle className="text-xl mb-2">Data Protection</CardTitle>
                <CardDescription className="text-gray-600">
                  Full compliance with European data protection regulations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-6 text-center">
              <CardHeader>
                <Badge className="mx-auto mb-4 bg-[#45A761] text-white text-lg px-4 py-2">ISO 27001</Badge>
                <CardTitle className="text-xl mb-2">Information Security</CardTitle>
                <CardDescription className="text-gray-600">
                  International standard for information security management
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Role in Security</h2>
              <p className="text-xl text-gray-600">Help us keep your account secure by following these best practices</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl mb-4 flex items-center gap-3">
                    <Shield className="h-6 w-6 text-[#45A761]" />
                    Strong Passwords
                  </CardTitle>
                  <CardDescription className="text-gray-600 space-y-2">
                    <div>• Use at least 12 characters</div>
                    <div>• Include uppercase, lowercase, numbers, and symbols</div>
                    <div>• Don't reuse passwords from other accounts</div>
                    <div>• Consider using a password manager</div>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl mb-4 flex items-center gap-3">
                    <UserCheck className="h-6 w-6 text-[#45A761]" />
                    Account Security
                  </CardTitle>
                  <CardDescription className="text-gray-600 space-y-2">
                    <div>• Keep your contact information updated</div>
                    <div>• Log out from shared devices</div>
                    <div>• Report suspicious activity immediately</div>
                    <div>• Review account activity regularly</div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Report Security Issues */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Report Security Issues</h2>
            <p className="text-xl text-gray-600 mb-8">
              If you discover a security vulnerability, please report it to our security team immediately.
            </p>

            <Card className="p-8 max-w-2xl mx-auto">
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 justify-center">
                    <Mail className="h-5 w-5 text-[#45A761]" />
                    <span className="text-lg font-semibold">security@givinghand.com</span>
                  </div>
                  <p className="text-gray-600">
                    We take all security reports seriously and will respond within 24 hours. 
                    Please include as much detail as possible about the potential vulnerability.
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
          <h2 className="text-4xl font-bold text-white mb-6">Secure by Design</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join thousands of organizations who trust GivingHand with their food donation coordination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-8 py-4">
                <Shield className="h-5 w-5 mr-2" />
                Join Securely
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#45A761] px-8 py-4">
                Contact Security Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
