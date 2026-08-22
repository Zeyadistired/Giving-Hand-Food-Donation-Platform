"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import PaymentModal from "@/components/PaymentModal"
import {
  Building2,
  MapPin,
  Phone,
  User,
  Package,
  Calendar,
  Clock,
  Truck,
  Thermometer,
  Camera,
  CheckCircle,
  AlertTriangle,
  Send,
  ArrowLeft,
  BarChart3
} from "lucide-react"

export default function DonateFoodPage() {
  const [formData, setFormData] = useState({
    // Organization info (will be auto-filled from user profile)
    organizationName: "",
    organizationType: "",
    location: "",
    contactPerson: "",
    contactPhone: "",

    // Food details
    foodCategory: "",
    foodDescription: "",
    quantity: "",
    quantityUnit: "kg",
    packagingType: "",
    foodCondition: "",
    foodImages: [],

    // Availability & Expiry
    expiryDate: "",
    pickupFrom: "",
    pickupUntil: "",

    // Delivery method
    deliveryMethod: "pickup", // Default delivery method

    // Storage requirements
    storageRequirements: []
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [userSession, setUserSession] = useState<any>(null)

  // Load user session on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionData = localStorage.getItem('userSession')
      if (sessionData) {
        const session = JSON.parse(sessionData)
        setUserSession(session)
        // Auto-fill organization data from user session
        setFormData(prev => ({
          ...prev,
          organizationName: session.organizationName || '',
          organizationType: session.organizationType || '',
          contactPerson: session.fullName || '',
        }))
      } else {
        // No user session found - redirect to login
        console.log('No user session found, redirecting to login')
        alert('Please log in to access the donation form.')
        window.location.href = '/login'
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log('Form data before validation:', formData)
      console.log('User session:', userSession)

      // Check if user is logged in
      if (!userSession || !userSession.id) {
        alert('❌ Please log in to submit a donation ticket.')
        window.location.href = '/login'
        return
      }

      // Validate required fields
      const requiredFields = [
        { field: 'foodCategory', name: 'Food Category' },
        { field: 'foodDescription', name: 'Food Description' },
        { field: 'quantity', name: 'Quantity' },
        { field: 'packagingType', name: 'Packaging Type' },
        { field: 'foodCondition', name: 'Food Condition' },
        { field: 'expiryDate', name: 'Expiry Date' },
        { field: 'pickupFrom', name: 'Pickup From Date' }
      ]

      const missingFields = requiredFields.filter(({ field }) => !formData[field])
      if (missingFields.length > 0) {
        console.log('Missing fields:', missingFields)
        console.log('Current form data:', formData)
        alert(`❌ Please fill in the following required fields:\n${missingFields.map(f => f.name).join('\n')}`)
        return
      }

      // Use actual form data and user session
      const donationData = {
        userId: userSession.id,
        organizationName: formData.organizationName || userSession.organizationName,
        foodCategory: formData.foodCategory,
        description: formData.foodDescription, // Map foodDescription to description
        quantity: formData.quantity,
        packagingType: formData.packagingType,
        condition: formData.foodCondition, // Map foodCondition to condition
        expiryDate: formData.expiryDate,
        availabilityDate: formData.pickupFrom, // Use pickupFrom as availabilityDate
        deliveryMethod: formData.deliveryMethod,
        storageRequirements: Array.isArray(formData.storageRequirements)
          ? formData.storageRequirements.join(', ')
          : formData.storageRequirements
      }

      console.log('Sending donation data:', donationData)

      // Call API
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      })

      const result = await response.json()
      console.log('API Response:', result)
      console.log('Response Status:', response.status)

      if (!response.ok) {
        console.error('API Error:', result)
        alert(`❌ API Error: ${result.error || 'Unknown error'}`)
        return
      }

      // Success!
      alert('✅ Donation ticket submitted successfully!\n\nYou will get notified when your ticket gets approved by our admin team.')
      setSubmitSuccess(true)

    } catch (error) {
      console.error('Submission error:', error)
      alert(`❌ Network Error: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStorageChange = (requirement: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        storageRequirements: [...prev.storageRequirements, requirement]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        storageRequirements: prev.storageRequirements.filter(req => req !== requirement)
      }))
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Donation Submitted!</CardTitle>
            <CardDescription className="text-gray-600">
              Your food donation ticket has been submitted for admin review. You'll receive a notification once it's approved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Badge variant="outline" className="text-sm">
                Ticket ID: #FD{Math.floor(Math.random() * 10000)}
              </Badge>
              <div className="flex gap-3">
                <Button asChild className="flex-1 bg-[#45A761] hover:bg-[#3a8f52]">
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#45A761] text-[#45A761] hover:bg-[#45A761] hover:text-white"
                  onClick={() => window.location.reload()}
                >
                  Create New Ticket
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

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
            <div className="flex items-center space-x-3">
              <PaymentModal>
                <Button
                  variant="outline"
                  className="border-[#45A761] text-[#45A761] hover:bg-[#45A761] hover:text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </PaymentModal>
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📝 Food Donation Ticket</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out this form to donate surplus food to communities in need. All donations are reviewed by our admin team before being published.
            </p>
          </div>

          {/* Debug Section - Remove this after fixing */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">🐛 Debug Info (Remove after fixing)</h3>
            <button
              type="button"
              onClick={() => {
                console.log('=== DEBUG INFO ===')
                console.log('User Session:', userSession)
                console.log('Form Data:', formData)
                console.log('Required Fields Check:', {
                  'Food Category': formData.foodCategory,
                  'Food Description': formData.foodDescription,
                  'Quantity': formData.quantity,
                  'Packaging Type': formData.packagingType,
                  'Food Condition': formData.foodCondition,
                  'Expiry Date': formData.expiryDate,
                  'Pickup Date': formData.pickupFrom,
                  'Delivery Method': formData.deliveryMethod
                })
                alert('Check browser console for debug info!')
              }}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Show Debug Info
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Organization Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#45A761]" />
                  🏢 Organization Information
                </CardTitle>
                <CardDescription>
                  This information is auto-filled from your verified profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input 
                      id="orgName" 
                      value={formData.organizationName} 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="orgType">Organization Type</Label>
                    <Input 
                      id="orgType" 
                      value={formData.organizationType} 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4" />
                    <Label htmlFor="location">Location</Label>
                  </div>
                  <Input 
                    id="location" 
                    value={formData.location} 
                    disabled 
                    className="bg-gray-50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4" />
                      <Label htmlFor="contactPerson">Contact Person</Label>
                    </div>
                    <Input 
                      id="contactPerson" 
                      value={formData.contactPerson} 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="h-4 w-4" />
                      <Label htmlFor="contactPhone">Phone Number</Label>
                    </div>
                    <Input 
                      id="contactPhone" 
                      value={formData.contactPhone} 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Food Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#45A761]" />
                  🍱 Food Details
                </CardTitle>
                <CardDescription>
                  Provide detailed information about the food you're donating
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="foodCategory">Food Category *</Label>
                    <Select value={formData.foodCategory} onValueChange={(value) => setFormData(prev => ({...prev, foodCategory: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select food category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bakery">🥖 Bakery</SelectItem>
                        <SelectItem value="dairy">🥛 Dairy</SelectItem>
                        <SelectItem value="meat">🥩 Meat</SelectItem>
                        <SelectItem value="fruits">🍎 Fruits</SelectItem>
                        <SelectItem value="vegetables">🥕 Vegetables</SelectItem>
                        <SelectItem value="cooked-meals">🍽️ Cooked Meals</SelectItem>
                        <SelectItem value="packaged">📦 Packaged</SelectItem>
                        <SelectItem value="other">🍴 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="packagingType">Packaging Type *</Label>
                    <Select value={formData.packagingType} onValueChange={(value) => setFormData(prev => ({...prev, packagingType: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select packaging" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sealed">📦 Sealed</SelectItem>
                        <SelectItem value="loose">🛍️ Loose</SelectItem>
                        <SelectItem value="boxed">📦 Boxed</SelectItem>
                        <SelectItem value="vacuum-packed">🔒 Vacuum-packed</SelectItem>
                        <SelectItem value="other">📋 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="foodDescription">Food Description *</Label>
                  <Textarea 
                    id="foodDescription"
                    placeholder="e.g., Leftover grilled chicken portions from lunch buffet, still hot and safe."
                    value={formData.foodDescription}
                    onChange={(e) => setFormData(prev => ({...prev, foodDescription: e.target.value}))}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input 
                      id="quantity"
                      type="number"
                      placeholder="e.g., 20"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({...prev, quantity: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantityUnit">Unit *</Label>
                    <Select value={formData.quantityUnit} onValueChange={(value) => setFormData(prev => ({...prev, quantityUnit: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="packs">📦 Packs</SelectItem>
                        <SelectItem value="kg">⚖️ Kilograms</SelectItem>
                        <SelectItem value="items">🔢 Items</SelectItem>
                        <SelectItem value="portions">🍽️ Portions</SelectItem>
                        <SelectItem value="liters">🥤 Liters</SelectItem>
                        <SelectItem value="boxes">📦 Boxes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Food Condition *</Label>
                  <RadioGroup 
                    value={formData.foodCondition} 
                    onValueChange={(value) => setFormData(prev => ({...prev, foodCondition: value}))}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-green-50">
                      <RadioGroupItem value="safe-fresh" id="safe-fresh" />
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <Label htmlFor="safe-fresh" className="cursor-pointer">
                          ✅ Safe & Fresh
                        </Label>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-yellow-50">
                      <RadioGroupItem value="near-expiry" id="near-expiry" />
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <Label htmlFor="near-expiry" className="cursor-pointer">
                          🕒 Near Expiry
                        </Label>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-red-50">
                      <RadioGroupItem value="expired" id="expired" />
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <Label htmlFor="expired" className="cursor-pointer">
                          ❌ Expired (goes only to factories)
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Camera className="h-4 w-4" />
                    <Label htmlFor="foodImages">
                      Food Images (Optional)
                    </Label>
                  </div>
                  <Input 
                    id="foodImages"
                    type="file"
                    accept="image/*"
                    multiple
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">Upload 1-3 images (.jpg/.png)</p>
                </div>
              </CardContent>
            </Card>

            {/* 3. Availability & Expiry */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#45A761]" />
                  📅 Availability & Expiry
                </CardTitle>
                <CardDescription>
                  When is this food available for pickup and when does it expire?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date / Best Before Date *</Label>
                  <Input
                    id="expiryDate"
                    type="datetime-local"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData(prev => ({...prev, expiryDate: e.target.value}))}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickupFrom">Pickup Available From *</Label>
                    <Input
                      id="pickupFrom"
                      type="datetime-local"
                      value={formData.pickupFrom}
                      onChange={(e) => setFormData(prev => ({...prev, pickupFrom: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pickupUntil">Pickup Available Until *</Label>
                    <Input
                      id="pickupUntil"
                      type="datetime-local"
                      value={formData.pickupUntil}
                      onChange={(e) => setFormData(prev => ({...prev, pickupUntil: e.target.value}))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Delivery Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#45A761]" />
                  🚚 Delivery Method
                </CardTitle>
                <CardDescription>
                  Will you deliver the food or does it need to be picked up?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.deliveryMethod}
                  onValueChange={(value) => setFormData(prev => ({...prev, deliveryMethod: value}))}
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-green-50">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-green-600" />
                      <Label htmlFor="delivery" className="cursor-pointer">
                        ✅ We Deliver - We will deliver the food to the recipient
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-blue-50">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <Label htmlFor="pickup" className="cursor-pointer">
                        📍 Pickup Required - Recipient must collect from our location
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* 5. Storage Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-[#45A761]" />
                  🧊 Storage Requirements
                </CardTitle>
                <CardDescription>
                  What storage conditions does this food require? (Optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id="refrigerated"
                      checked={formData.storageRequirements.includes('refrigerated')}
                      onCheckedChange={(checked) => handleStorageChange('refrigerated', checked as boolean)}
                    />
                    <Label htmlFor="refrigerated" className="cursor-pointer">❄️ Refrigerated</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id="frozen"
                      checked={formData.storageRequirements.includes('frozen')}
                      onCheckedChange={(checked) => handleStorageChange('frozen', checked as boolean)}
                    />
                    <Label htmlFor="frozen" className="cursor-pointer">🧊 Frozen</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id="room-temp"
                      checked={formData.storageRequirements.includes('room-temp')}
                      onCheckedChange={(checked) => handleStorageChange('room-temp', checked as boolean)}
                    />
                    <Label htmlFor="room-temp" className="cursor-pointer">🌡️ Room Temperature</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id="no-special"
                      checked={formData.storageRequirements.includes('no-special')}
                      onCheckedChange={(checked) => handleStorageChange('no-special', checked as boolean)}
                    />
                    <Label htmlFor="no-special" className="cursor-pointer">✅ No Special Requirement</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-[#45A761] hover:bg-[#3a8f52] px-8"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Donation Ticket
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>


    </div>
  )
}
