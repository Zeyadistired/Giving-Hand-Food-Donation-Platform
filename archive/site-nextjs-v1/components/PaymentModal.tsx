"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  CheckCircle,
  Crown,
  ArrowRight,
  X,
  Lock
} from "lucide-react"

interface PaymentModalProps {
  children: React.ReactNode
}

export default function PaymentModal({ children }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState("")
  const [formData, setFormData] = useState({
    // Credit Card
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    
    // Mobile Wallet
    phoneNumber: "",
    
    // Bank Transfer
    accountNumber: "",
    bankName: "",
    
    // Personal Info
    fullName: "",
    email: "",
    nationalId: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Common validations
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.nationalId.trim()) {
      newErrors.nationalId = "National ID is required"
    } else if (!/^\d{14}$/.test(formData.nationalId)) {
      newErrors.nationalId = "National ID must be 14 digits"
    }

    // Payment method specific validations
    if (selectedMethod === "credit-card") {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required"
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Card number must be 16 digits"
      }
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required"
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Format: MM/YY"
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required"
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "CVV must be 3-4 digits"
      }
      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = "Cardholder name is required"
      }
    }

    if (selectedMethod === "mobile-wallet") {
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone number is required"
      } else if (!/^01[0125]\d{8}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Please enter a valid Egyptian mobile number"
      }
    }

    if (selectedMethod === "bank-transfer") {
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = "Account number is required"
      }
      if (!formData.bankName.trim()) {
        newErrors.bankName = "Bank name is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)

    // Here you would integrate with actual payment gateway
    // For now, simulate successful payment and redirect to dashboard
    alert("Payment processed successfully! Welcome to Analytics Pro!")

    // Redirect to user dashboard
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard'
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="h-6 w-6 text-[#45A761]" />
            Subscribe to Analytics Pro
          </DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to unlock premium analytics features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Subscription Summary */}
          <Card className="bg-gradient-to-br from-[#45A761] to-[#3a8f52] text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Analytics Pro</h3>
                  <p className="text-green-100">Monthly Subscription</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">500 EGP</div>
                  <div className="text-green-100">per month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Select Payment Method</Label>
            
            <div className="grid gap-3">
              <Card 
                className={`cursor-pointer transition-all ${selectedMethod === "credit-card" ? "ring-2 ring-[#45A761] bg-green-50" : "hover:shadow-md"}`}
                onClick={() => setSelectedMethod("credit-card")}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-[#45A761]" />
                  <div>
                    <h4 className="font-semibold">Credit/Debit Card</h4>
                    <p className="text-sm text-gray-600">Visa, Mastercard accepted</p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${selectedMethod === "mobile-wallet" ? "ring-2 ring-[#45A761] bg-green-50" : "hover:shadow-md"}`}
                onClick={() => setSelectedMethod("mobile-wallet")}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Smartphone className="h-6 w-6 text-[#45A761]" />
                  <div>
                    <h4 className="font-semibold">Mobile Wallet</h4>
                    <p className="text-sm text-gray-600">Vodafone Cash, Orange Money, Etisalat Cash</p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${selectedMethod === "bank-transfer" ? "ring-2 ring-[#45A761] bg-green-50" : "hover:shadow-md"}`}
                onClick={() => setSelectedMethod("bank-transfer")}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-[#45A761]" />
                  <div>
                    <h4 className="font-semibold">Bank Transfer</h4>
                    <p className="text-sm text-gray-600">Direct bank transfer (Egyptian banks)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment Form */}
          {selectedMethod && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="nationalId">National ID (14 digits) *</Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({...formData, nationalId: e.target.value.replace(/\D/g, "").slice(0, 14)})}
                    placeholder="12345678901234"
                    className={errors.nationalId ? "border-red-500" : ""}
                  />
                  {errors.nationalId && <p className="text-red-500 text-sm">{errors.nationalId}</p>}
                </div>
              </div>

              {/* Payment Method Specific Fields */}
              {selectedMethod === "credit-card" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Card Information</h3>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: formatCardNumber(e.target.value)})}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={errors.cardNumber ? "border-red-500" : ""}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({...formData, expiryDate: formatExpiryDate(e.target.value)})}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={errors.expiryDate ? "border-red-500" : ""}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, "").slice(0, 4)})}
                        placeholder="123"
                        maxLength={4}
                        className={errors.cvv ? "border-red-500" : ""}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name *</Label>
                    <Input
                      id="cardholderName"
                      value={formData.cardholderName}
                      onChange={(e) => setFormData({...formData, cardholderName: e.target.value})}
                      placeholder="Name as it appears on card"
                      className={errors.cardholderName ? "border-red-500" : ""}
                    />
                    {errors.cardholderName && <p className="text-red-500 text-sm">{errors.cardholderName}</p>}
                  </div>
                </div>
              )}

              {selectedMethod === "mobile-wallet" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Mobile Wallet Information</h3>
                  
                  <div>
                    <Label htmlFor="phoneNumber">Mobile Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value.replace(/\D/g, "").slice(0, 11)})}
                      placeholder="01012345678"
                      className={errors.phoneNumber ? "border-red-500" : ""}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                    <p className="text-sm text-gray-600 mt-1">Enter your Vodafone Cash, Orange Money, or Etisalat Cash number</p>
                  </div>
                </div>
              )}

              {selectedMethod === "bank-transfer" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Bank Information</h3>
                  
                  <div>
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Select onValueChange={(value) => setFormData({...formData, bankName: value})}>
                      <SelectTrigger className={errors.bankName ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nbe">National Bank of Egypt</SelectItem>
                        <SelectItem value="cib">Commercial International Bank</SelectItem>
                        <SelectItem value="qnb">QNB ALAHLI</SelectItem>
                        <SelectItem value="hsbc">HSBC Egypt</SelectItem>
                        <SelectItem value="arab-bank">Arab Bank</SelectItem>
                        <SelectItem value="banque-misr">Banque Misr</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                      placeholder="Enter your account number"
                      className={errors.accountNumber ? "border-red-500" : ""}
                    />
                    {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-800">Your payment information is encrypted and secure</p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-[#45A761] hover:bg-[#3a8f52] text-white py-3 text-lg font-semibold"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Complete Payment - 500 EGP/month
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
