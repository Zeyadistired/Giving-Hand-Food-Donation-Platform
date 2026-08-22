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
  FileText,
  Calendar,
  Mail
} from "lucide-react"

export default function PrivacyPage() {
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
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">Legal</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy
              <span className="text-[#45A761] block">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Last updated: December 15, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Version 2.1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Quick Summary */}
            <Card className="p-8 mb-12 bg-green-50 border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-[#45A761]" />
                  <CardTitle className="text-2xl text-green-800">Privacy at a Glance</CardTitle>
                </div>
                <div className="text-green-700 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>We only collect information necessary to provide our food donation platform services</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Your data is encrypted and stored securely with industry-standard protection</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>We never sell your personal information to third parties</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>You have full control over your data and can request deletion at any time</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                When you create an account with GivingHand, we collect information such as your name, email address, 
                phone number, and organization details. This information is necessary to verify your organization 
                and facilitate food donations through our platform.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">Usage Information</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We automatically collect information about how you use our platform, including pages visited, 
                features used, and interactions with other organizations. This helps us improve our services 
                and provide better matching algorithms.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">Location Information</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                To facilitate local food donations, we collect location information about your organization. 
                This is used solely for matching purposes and is not shared beyond what's necessary for coordination.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">2. How We Use Your Information</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Primary Uses</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Facilitate food donations between organizations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Verify organization legitimacy and maintain platform security</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Provide customer support and technical assistance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Send important platform updates and notifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Generate impact reports and analytics</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Information Sharing</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                We only share your information in the following limited circumstances:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">With Other Organizations</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                When you list or claim food donations, we share necessary contact and location information 
                with the other organization to facilitate the donation. This includes organization name, 
                contact person, phone number, and pickup/delivery location.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Providers</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We work with trusted third-party service providers for hosting, analytics, and customer support. 
                These providers are bound by strict confidentiality agreements and can only use your data 
                to provide services to us.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-8">Legal Requirements</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We may disclose information if required by law, court order, or to protect the rights, 
                property, or safety of GivingHand, our users, or the public.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Data Security</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Lock className="h-6 w-6 text-[#45A761]" />
                      <CardTitle className="text-lg">Encryption</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600">
                      All data is encrypted in transit and at rest using industry-standard AES-256 encryption.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="p-6">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-6 w-6 text-[#45A761]" />
                      <CardTitle className="text-lg">Access Controls</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600">
                      Strict access controls ensure only authorized personnel can access your information.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Your Rights</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                You have the following rights regarding your personal information:
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-[#45A761] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Access</h4>
                    <p className="text-gray-600">Request a copy of all personal information we have about you</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-[#45A761] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Correction</h4>
                    <p className="text-gray-600">Update or correct any inaccurate information</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#45A761] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Deletion</h4>
                    <p className="text-gray-600">Request deletion of your account and associated data</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Contact Us</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                If you have questions about this Privacy Policy or want to exercise your rights, 
                please contact our Privacy Team:
              </p>

              <Card className="p-6 bg-gray-50">
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#45A761]" />
                      <span className="text-gray-700">privacy@givinghand.com</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-[#45A761] mt-0.5" />
                      <div className="text-gray-700">
                        <div>GivingHand Privacy Team</div>
                        <div>123 Impact Street, Suite 456</div>
                        <div>San Francisco, CA 94105</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#45A761] to-[#3a8f52]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Questions About Privacy?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Our team is here to help you understand how we protect your information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 px-8 py-4">
                <Mail className="h-5 w-5 mr-2" />
                Contact Privacy Team
              </Button>
            </Link>
            <Link href="/help">
              <Button size="lg" className="bg-white text-[#45A761] hover:bg-gray-100 hover:text-[#3a8f52] px-8 py-4 font-semibold border-2 border-white shadow-lg">
                Visit Help Center
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
