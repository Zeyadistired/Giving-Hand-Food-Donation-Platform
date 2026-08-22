"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Heart,
  CheckCircle,
  Mail,
  ArrowRight,
  ArrowLeft,
  Shield,
  Clock,
  Key
} from "lucide-react"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'code' | 'reset' | 'success'>('email')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    resetCode: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Validate email
      if (!formData.email) {
        setErrors({ email: 'Email is required' })
        return
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setErrors({ email: 'Please enter a valid email address' })
        return
      }

      // Check if email is admin email
      if (formData.email !== 'Eui@admin.com') {
        setErrors({ email: 'Email not found. Only admin account can reset password.' })
        return
      }

      // Simulate sending reset code
      await new Promise(resolve => setTimeout(resolve, 2000))

      alert('Reset code sent to your email!')
      setStep('code')

    } catch (error) {
      console.error('Password reset error:', error)
      alert('Failed to send reset code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Validate reset code
      if (!formData.resetCode) {
        setErrors({ resetCode: 'Reset code is required' })
        return
      }

      // Simulate code verification (demo code: 123456)
      if (formData.resetCode !== '123456') {
        setErrors({ resetCode: 'Invalid reset code. Use 123456 for demo.' })
        return
      }

      await new Promise(resolve => setTimeout(resolve, 1500))

      alert('Code verified! You can now reset your password.')
      setStep('reset')

    } catch (error) {
      console.error('Code verification error:', error)
      alert('Failed to verify code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Validate passwords
      if (!formData.newPassword) {
        setErrors({ newPassword: 'New password is required' })
        return
      }

      if (formData.newPassword.length < 8) {
        setErrors({ newPassword: 'Password must be at least 8 characters' })
        return
      }

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
        setErrors({ newPassword: 'Password must contain uppercase, lowercase, and number' })
        return
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'Passwords do not match' })
        return
      }

      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 2000))

      setStep('success')

    } catch (error) {
      console.error('Password reset error:', error)
      alert('Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="h-8 w-8 text-[#45A761]" />
                <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-green-600 bg-white rounded-full" />
              </div>
              <span className="text-2xl font-bold text-gray-900">GivingHand</span>
            </Link>
            
            <Link href="/login">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {step === 'email' && 'Reset Password'}
              {step === 'code' && 'Enter Reset Code'}
              {step === 'reset' && 'Create New Password'}
              {step === 'success' && 'Password Reset Complete'}
            </h1>
            <p className="text-gray-600">
              {step === 'email' && 'Enter your email to receive a reset code'}
              {step === 'code' && 'Check your email for the 6-digit code'}
              {step === 'reset' && 'Choose a strong new password'}
              {step === 'success' && 'Your password has been successfully reset'}
            </p>
          </div>

          <Card className="p-8 shadow-lg border-2">
            <CardContent>
              {/* Step 1: Email Input */}
              {step === 'email' && (
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email address"
                        className={`pl-10 h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761] ${
                          errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#45A761] hover:bg-[#3a8f52] text-white h-12 text-lg font-semibold disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Code...
                      </>
                    ) : (
                      <>
                        Send Reset Code
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}

              {/* Step 2: Reset Code Input */}
              {step === 'code' && (
                <form onSubmit={handleCodeSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reset Code</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="text"
                        value={formData.resetCode}
                        onChange={(e) => handleInputChange('resetCode', e.target.value)}
                        placeholder="Enter 6-digit code"
                        className={`pl-10 h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761] text-center text-lg tracking-widest ${
                          errors.resetCode ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                        maxLength={6}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.resetCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.resetCode}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Demo code: <strong>123456</strong>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep('email')}
                      className="flex-1"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-[#45A761] hover:bg-[#3a8f52] text-white"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        'Verify Code'
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 3: New Password */}
              {step === 'reset' && (
                <form onSubmit={handlePasswordReset} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <Input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      placeholder="Enter new password"
                      className={`h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761] ${
                        errors.newPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                      }`}
                      disabled={isLoading}
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm new password"
                      className={`h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761] ${
                        errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                      }`}
                      disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <div>• Must be at least 8 characters</div>
                    <div>• Must contain uppercase and lowercase letters</div>
                    <div>• Must contain at least one number</div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#45A761] hover:bg-[#3a8f52] text-white h-12 text-lg font-semibold disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <CheckCircle className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}

              {/* Step 4: Success */}
              {step === 'success' && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Password Reset Successful!</h3>
                    <p className="text-gray-600">
                      Your password has been successfully reset. You can now log in with your new password.
                    </p>
                  </div>

                  <Link href="/login">
                    <Button className="w-full bg-[#45A761] hover:bg-[#3a8f52] text-white h-12 text-lg font-semibold">
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Back to Login
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 flex items-center justify-center space-x-6 text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Secure Reset</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Code expires in 15 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
