"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Heart,
  CheckCircle,
  Mail,
  Lock,
  Building2,
  Phone,
  ArrowRight,
  Shield,
  Globe,
  Star,
  Upload,
  FileText,
  X,
  ShoppingCart,
  UtensilsCrossed,
  Bed,
  Eye,
  EyeOff,
  Clock
} from "lucide-react"

export default function SignupPage() {
  const [selectedOrgType, setSelectedOrgType] = useState<'supermarket' | 'restaurant' | 'hotel' | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    organizationName: '',
    phoneNumber: '',
    termsAccepted: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [websiteStats, setWebsiteStats] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Organization Type validation
    if (!selectedOrgType) {
      newErrors.orgType = "Please select your business type"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    // Organization Name validation
    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required"
    } else if (formData.organizationName.trim().length < 2) {
      newErrors.organizationName = "Organization name must be at least 2 characters"
    }

    // Phone Number validation (Egyptian format)
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^01[0125]\d{8}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid Egyptian mobile number (01XXXXXXXXX)"
    }

    // File upload validation
    if (!uploadedFile) {
      newErrors.file = "Trade license or certificate is required"
    } else if (uploadedFile.size > 10 * 1024 * 1024) {
      newErrors.file = "File size must be less than 10MB"
    }

    // Terms validation
    if (!formData.termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Call Supabase API to create user
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.organizationName, // Using organization name as display name
          organizationName: formData.organizationName,
          organizationType: selectedOrgType,
          phone: formData.phoneNumber
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Signup failed')
      }

      console.log('User created successfully:', result.user)

      // Show success modal
      setShowSuccessModal(true)

    } catch (error) {
      console.error('Signup error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm">
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
              <Link href="/login">
                <Button variant="outline" className="border-[#45A761] text-[#45A761] hover:bg-[#45A761] hover:text-white">
                  Sign In
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#45A761] to-[#3a8f52] items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-4xl font-bold mb-6">Start Making an Impact Today</h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              {statsLoading ? (
                'Join our growing network of organizations reducing food waste and strengthening communities.'
              ) : websiteStats?.totalOrganizations > 0 ? (
                `Join ${websiteStats.totalOrganizations} organizations already reducing food waste and strengthening communities through our platform.`
              ) : (
                'Be among the first organizations to reduce food waste and strengthen communities through our platform.'
              )}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">For All Food Businesses</h3>
                  <p className="text-green-100">Supermarkets, restaurants, and hotels reducing waste together</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Make a Real Impact</h3>
                  <p className="text-green-100">Transform surplus food into community support and reduce waste costs</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Verified & Secure</h3>
                  <p className="text-green-100">All organizations are verified for trust and safety</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-center mb-4">
                <h4 className="font-semibold text-lg">Join Our Growing Network</h4>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold">
                    {statsLoading ? '...' : (
                      websiteStats?.totalOrganizations > 0
                        ? `${websiteStats.totalOrganizations}`
                        : 'Growing'
                    )}
                  </div>
                  <div className="text-xs text-green-100">Organizations</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {statsLoading ? '...' : (
                      websiteStats?.totalMeals > 0
                        ? `${websiteStats.totalMeals}`
                        : 'Starting'
                    )}
                  </div>
                  <div className="text-xs text-green-100">Meals Served</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {statsLoading ? '...' : (
                      websiteStats?.totalFoodQuantity > 0
                        ? `${websiteStats.totalFoodQuantity} kg`
                        : 'Ready'
                    )}
                  </div>
                  <div className="text-xs text-green-100">Food Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 lg:w-3/5 flex items-center justify-center p-12">
          <div className="w-full max-w-lg">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Join GivingHand</h1>
              <p className="text-gray-600 text-lg">Create your account</p>
            </div>

            <Card className="p-10 shadow-lg border-2">
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Organization Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Organization Type *</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Supermarket */}
                      <button
                        type="button"
                        onClick={() => setSelectedOrgType('supermarket')}
                        className={`p-6 border-2 rounded-lg text-center transition-all duration-200 h-32 flex flex-col justify-center items-center ${
                          selectedOrgType === 'supermarket'
                            ? 'border-[#45A761] bg-[#45A761]/10 shadow-md transform scale-105'
                            : 'border-gray-300 hover:border-[#45A761] hover:bg-[#45A761]/5'
                        }`}
                      >
                        <ShoppingCart className={`h-8 w-8 mb-2 ${
                          selectedOrgType === 'supermarket' ? 'text-[#45A761]' : 'text-gray-400'
                        }`} />
                        <div className="text-sm font-semibold text-gray-900 mb-1">Supermarket</div>
                        <div className="text-xs text-gray-500 text-center leading-tight">Grocery Store<br />Market</div>
                        {selectedOrgType === 'supermarket' && (
                          <CheckCircle className="h-4 w-4 text-[#45A761] mt-2" />
                        )}
                      </button>

                      {/* Restaurant */}
                      <button
                        type="button"
                        onClick={() => setSelectedOrgType('restaurant')}
                        className={`p-6 border-2 rounded-lg text-center transition-all duration-200 h-32 flex flex-col justify-center items-center ${
                          selectedOrgType === 'restaurant'
                            ? 'border-[#45A761] bg-[#45A761]/10 shadow-md transform scale-105'
                            : 'border-gray-300 hover:border-[#45A761] hover:bg-[#45A761]/5'
                        }`}
                      >
                        <UtensilsCrossed className={`h-8 w-8 mb-2 ${
                          selectedOrgType === 'restaurant' ? 'text-[#45A761]' : 'text-gray-400'
                        }`} />
                        <div className="text-sm font-semibold text-gray-900 mb-1">Restaurant</div>
                        <div className="text-xs text-gray-500 text-center leading-tight">Cafe, Fast Food<br />Dining</div>
                        {selectedOrgType === 'restaurant' && (
                          <CheckCircle className="h-4 w-4 text-[#45A761] mt-2" />
                        )}
                      </button>

                      {/* Hotel */}
                      <button
                        type="button"
                        onClick={() => setSelectedOrgType('hotel')}
                        className={`p-6 border-2 rounded-lg text-center transition-all duration-200 h-32 flex flex-col justify-center items-center ${
                          selectedOrgType === 'hotel'
                            ? 'border-[#45A761] bg-[#45A761]/10 shadow-md transform scale-105'
                            : 'border-gray-300 hover:border-[#45A761] hover:bg-[#45A761]/5'
                        }`}
                      >
                        <Bed className={`h-8 w-8 mb-2 ${
                          selectedOrgType === 'hotel' ? 'text-[#45A761]' : 'text-gray-400'
                        }`} />
                        <div className="text-sm font-semibold text-gray-900 mb-1">Hotel</div>
                        <div className="text-xs text-gray-500 text-center leading-tight">Resort, Lodge<br />Inn</div>
                        {selectedOrgType === 'hotel' && (
                          <CheckCircle className="h-4 w-4 text-[#45A761] mt-2" />
                        )}
                      </button>
                    </div>
                    {errors.orgType && (
                      <p className="text-red-500 text-sm mt-2">{errors.orgType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@organization.com"
                        className={`pl-10 h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761] ${
                          errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange('organizationName', e.target.value)}
                        placeholder="Your organization name"
                        className={`pl-10 h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761] ${
                          errors.organizationName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.organizationName && (
                      <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Create a strong password"
                        className={`pl-10 pr-12 h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761] ${
                          errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      Must be 8+ characters with uppercase, lowercase, and number
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          // Format Egyptian phone number
                          const value = e.target.value.replace(/\D/g, '').slice(0, 11)
                          handleInputChange('phoneNumber', value)
                        }}
                        placeholder="01012345678"
                        className={`pl-10 h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761] ${
                          errors.phoneNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      Egyptian mobile number format: 01XXXXXXXXX
                    </div>
                  </div>

                  {/* Trade License / Certificate Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trade License / Certificate *
                    </label>
                    <div className="space-y-3">
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                          uploadedFile
                            ? 'border-[#45A761] bg-[#45A761]/5'
                            : 'border-gray-300 hover:border-[#45A761] hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="file"
                          id="license-upload"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setUploadedFile(file)
                            }
                          }}
                          className="hidden"
                        />

                        {uploadedFile ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-center gap-3">
                              <FileText className="h-8 w-8 text-[#45A761]" />
                              <div className="text-left">
                                <div className="text-sm font-medium text-gray-900">{uploadedFile.name}</div>
                                <div className="text-xs text-gray-500">
                                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setUploadedFile(null)}
                                className="p-1 hover:bg-red-100 rounded-full transition-colors"
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                            <div className="text-xs text-[#45A761] font-medium">✓ Document uploaded successfully</div>
                          </div>
                        ) : (
                          <label htmlFor="license-upload" className="cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              Upload Trade License or Certificate
                            </div>
                            <div className="text-xs text-gray-500 mb-3">
                              PDF, JPG, PNG, DOC files up to 10MB
                            </div>
                            <div className="inline-flex items-center px-4 py-2 border border-[#45A761] text-[#45A761] rounded-lg hover:bg-[#45A761] hover:text-white transition-colors">
                              <Upload className="h-4 w-4 mr-2" />
                              Choose File
                            </div>
                          </label>
                        )}
                      </div>

                      <div className="text-xs text-gray-500 space-y-1">
                        <div>• Required for verification and compliance</div>
                        <div>• Accepted formats: PDF, JPG, PNG, DOC, DOCX</div>
                        <div>• Maximum file size: 10MB</div>
                      </div>
                    </div>
                    {errors.file && (
                      <p className="text-red-500 text-sm mt-2">{errors.file}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.termsAccepted}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))
                          if (errors.terms) {
                            setErrors(prev => ({ ...prev, terms: '' }))
                          }
                        }}
                        className={`mt-1 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded ${
                          errors.terms ? 'border-red-500' : ''
                        }`}
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link href="/terms" className="text-[#45A761] hover:text-[#3a8f52] font-medium">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-[#45A761] hover:text-[#3a8f52] font-medium">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.terms && (
                      <p className="text-red-500 text-sm mt-2">{errors.terms}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#45A761] hover:bg-[#3a8f52] text-white h-12 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#45A761] hover:text-[#3a8f52] font-semibold">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="mt-8 flex justify-center items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Verified Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
            </div>

            {/* Next Steps */}
            <Card className="mt-8 p-6 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 mb-2">What happens next?</CardTitle>
                <div className="text-green-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Account verification (24-48 hours)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Platform onboarding & training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Start connecting with organizations</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Account Created Successfully!
              </h2>

              {/* Message */}
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Thank you for joining GivingHand! Your account has been created and is now pending approval.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-800">What happens next?</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    <strong>Now wait for your account approval via email or SMS.</strong>
                  </p>
                </div>

                <div className="text-left space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#45A761] rounded-full mr-3"></div>
                    <span>Our team will review your application within 24-48 hours</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#45A761] rounded-full mr-3"></div>
                    <span>You'll receive approval notification at <strong>{formData.email}</strong></span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#45A761] rounded-full mr-3"></div>
                    <span>SMS updates will be sent to <strong>{formData.phoneNumber}</strong></span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#45A761] rounded-full mr-3"></div>
                    <span>Once approved, you can access your Food Donation Ticket Form to start helping communities</span>
                  </div>
                </div>
              </div>

              {/* Organization Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Application Details</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Organization:</span>
                    <span className="font-medium">{formData.organizationName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium capitalize">{selectedOrgType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowSuccessModal(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/'}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    Home Page
                  </Button>
                </div>
              </div>

              {/* Additional Help */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Need help? Contact us at{' '}
                  <a href="mailto:support@givinghand.com" className="text-[#45A761] hover:underline">
                    support@givinghand.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
