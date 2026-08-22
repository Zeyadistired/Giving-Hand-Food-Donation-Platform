import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  Shield,
  FileText,
  Calendar,
  Mail,
  AlertTriangle,
  Users,
  Building2
} from "lucide-react"

export default function TermsPage() {
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
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">Legal</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms of
              <span className="text-[#45A761] block">Service</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              These terms govern your use of the GivingHand platform and services.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Last updated: January 15, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Version 2.1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Important Notice */}
            <Card className="p-8 mb-12 bg-yellow-50 border-yellow-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  <CardTitle className="text-2xl text-yellow-800">Important Notice</CardTitle>
                </div>
                <CardDescription className="text-yellow-700 space-y-3">
                  <p>
                    By using GivingHand, you agree to these terms. Please read them carefully. 
                    If you don't agree with these terms, please don't use our platform.
                  </p>
                  <p>
                    These terms may change from time to time. We'll notify you of significant changes 
                    via email or through our platform.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                By accessing or using GivingHand's platform, mobile application, or services, you agree to be bound 
                by these Terms of Service and all applicable laws and regulations. If you do not agree with any 
                of these terms, you are prohibited from using or accessing this platform.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Platform Description</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                GivingHand is a platform that connects food providers (restaurants, hotels, supermarkets) with 
                community organizations (charities, shelters, community centers) to facilitate food donations 
                and reduce food waste.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Services Include:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Matching food donations with organizations in need</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Coordination tools for pickup and delivery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Impact tracking and reporting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#45A761] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Organization verification and safety measures</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">3. User Responsibilities</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Registration</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                You must provide accurate, current, and complete information during registration. You are responsible 
                for maintaining the confidentiality of your account credentials and for all activities that occur 
                under your account.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">Food Safety</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Food providers are solely responsible for ensuring that all donated food meets applicable safety 
                standards and regulations. Community organizations are responsible for proper handling and 
                distribution of received donations.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-8">Prohibited Activities</h3>
              <div className="bg-red-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold text-red-800 mb-3">You may not:</h4>
                <ul className="space-y-2 text-red-700">
                  <li>• Use the platform for any illegal or unauthorized purpose</li>
                  <li>• Provide false or misleading information about your organization</li>
                  <li>• Donate or distribute unsafe or contaminated food</li>
                  <li>• Interfere with or disrupt the platform's operation</li>
                  <li>• Attempt to gain unauthorized access to other accounts</li>
                  <li>• Use the platform for commercial purposes beyond food donation</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Liability and Disclaimers</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                GivingHand acts as a facilitator between organizations and does not take possession of donated food. 
                We are not responsible for the quality, safety, or condition of donated food items.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 border-2 border-gray-200">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Building2 className="h-6 w-6 text-[#45A761]" />
                      <CardTitle className="text-lg">Food Providers</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600">
                      Responsible for food safety, quality, and compliance with local health regulations 
                      before donation.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="p-6 border-2 border-gray-200">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="h-6 w-6 text-[#45A761]" />
                      <CardTitle className="text-lg">Community Organizations</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600">
                      Responsible for proper handling, storage, and distribution of received food donations.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Privacy and Data</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                use, and protect your information. By using our platform, you consent to the collection and 
                use of information as described in our Privacy Policy.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Termination</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                We reserve the right to terminate or suspend your account at any time for violations of these terms 
                or for any other reason we deem necessary. You may also terminate your account at any time by 
                contacting our support team.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Changes to Terms</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                We may update these terms from time to time. We will notify users of significant changes via email 
                or through our platform. Continued use of the platform after changes constitutes acceptance of 
                the new terms.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Contact Information</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                If you have questions about these Terms of Service, please contact our legal team:
              </p>

              <Card className="p-6 bg-gray-50">
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#45A761]" />
                      <span className="text-gray-700">legal@givinghand.com</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-[#45A761] mt-0.5" />
                      <div className="text-gray-700">
                        <div>GivingHand Legal Department</div>
                        <div>15 Tahrir Square, Downtown</div>
                        <div>Cairo, Egypt 11511</div>
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
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            By joining GivingHand, you agree to these terms and become part of our mission to reduce food waste.
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
                <Mail className="h-5 w-5 mr-2" />
                Contact Legal Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
