"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  Users,
  Building2,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Search,
  Eye,
  X,
  Clock,
  Package,
  Truck,
  AlertTriangle,
  TrendingUp,
  Leaf,
  Globe,
  MessageSquare,
  LogOut,
  Download,
  Zap
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('tickets')

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [foodDonations, setFoodDonations] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false)
  const [bulkUpdateMessage, setBulkUpdateMessage] = useState('')
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(true)

  const [bulkUpdateType, setBulkUpdateType] = useState<'all' | 'unresolved' | 'resolved'>('unresolved')
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv')
  const [exportDateRange, setExportDateRange] = useState<'all' | '7days' | '30days' | '90days'>('all')
  const [exportStatus, setExportStatus] = useState<'all' | 'resolved' | 'unresolved'>('all')
  const [exportType, setExportType] = useState<'all' | 'bug' | 'feature' | 'general'>('all')
  const [feedbackTypeFilter, setFeedbackTypeFilter] = useState<'all' | 'bug' | 'feature' | 'general'>('all')
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState<'all' | 'unresolved' | 'resolved'>('all')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Urgent Food Donation',
      message: 'Nile Restaurant has food expiring today',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'approval',
      title: 'New Organization Signup',
      message: 'Cairo Bakery wants to join the platform',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Donation Completed',
      message: 'Metro Supermarket donation was successfully collected',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Weekly Report Ready',
      message: 'Your weekly impact report is available',
      time: '1 day ago',
      read: true
    }
  ])

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, you'd check for valid session/token
      // For demo, we'll check if user came from login
      const hasValidSession = sessionStorage.getItem('adminLoggedIn') === 'true'

      if (!hasValidSession) {
        alert('Access denied. Please log in with admin credentials.')
        window.location.href = '/login'
        return
      }

      setIsAuthenticated(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Real donation tickets state
  const [donationTickets, setDonationTickets] = useState([])
  const [ticketsLoading, setTicketsLoading] = useState(true)

  // Users state - will be populated from localStorage and signup
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: "Ahmed Hassan",
      email: "ahmed@cairocharity.org",
      role: "Charity",
      organizationName: "Cairo Charity Foundation",
      status: "pending",
      registeredAt: "2025-01-14 10:30",
      phone: "+20 10 1234 5678"
    },
    {
      id: 2,
      fullName: "Fatima Ali",
      email: "fatima@alexandriashelter.org",
      role: "Shelter",
      organizationName: "Alexandria Homeless Shelter",
      status: "approved",
      registeredAt: "2025-01-13 15:45",
      phone: "+20 11 2345 6789"
    },
    {
      id: 3,
      fullName: "Mohamed Saeed",
      email: "mohamed@gizafactory.com",
      role: "Factory",
      organizationName: "Giza Food Processing",
      status: "approved",
      registeredAt: "2025-01-12 09:20",
      phone: "+20 12 3456 7890"
    },
    {
      id: 4,
      fullName: "Nour Ibrahim",
      email: "nour@helpinghand.org",
      role: "Charity",
      organizationName: "Helping Hand NGO",
      status: "pending",
      registeredAt: "2025-01-14 16:10",
      phone: "+20 10 4567 8901"
    }
  ])

  // Load users from Supabase on component mount
  useEffect(() => {
    const loadUsersFromDatabase = async () => {
      try {
        const response = await fetch('/api/admin/users')
        if (response.ok) {
          const result = await response.json()
          // Transform Supabase data to match existing format
          const transformedUsers = result.users.map((user: any) => ({
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
            organizationName: user.organization_name,
            status: user.status,
            registeredAt: new Date(user.created_at).toLocaleString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Africa/Cairo'
            }).replace(',', ''),
            phone: user.phone
          }))
          setUsers(transformedUsers)
        }
      } catch (error) {
        console.error('Error loading users from database:', error)
      }
    }

    loadUsersFromDatabase()

    // Set up interval to check for new users every 10 seconds
    const interval = setInterval(loadUsersFromDatabase, 10000)

    return () => clearInterval(interval)
  }, [])

  // Load food donations from Supabase
  useEffect(() => {
    const loadFoodDonations = async () => {
      try {
        const response = await fetch('/api/donations')
        if (response.ok) {
          const result = await response.json()
          // Transform Supabase data to match admin format
          const transformedDonations = result.donations.map((donation: any) => ({
            id: donation.id,
            organizationName: donation.organization_name,
            foodCategory: donation.food_category,
            description: donation.description,
            quantity: donation.quantity,
            packagingType: donation.packaging_type,
            condition: donation.condition,
            expiryDate: donation.expiry_date,
            availabilityDate: donation.availability_date,
            deliveryMethod: donation.delivery_method,
            storageRequirements: donation.storage_requirements,
            status: donation.status,
            submittedAt: new Date(donation.created_at).toLocaleString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Africa/Cairo'
            }).replace(',', ''),
            userInfo: donation.users ? {
              fullName: donation.users.full_name,
              email: donation.users.email,
              phone: donation.users.phone,
              organizationType: donation.users.organization_type
            } : null
          }))
          setFoodDonations(transformedDonations)
        }
      } catch (error) {
        console.error('Error loading food donations:', error)
      }
    }

    loadFoodDonations()

    // Set up interval to check for new donations every 10 seconds
    const interval = setInterval(loadFoodDonations, 10000)

    return () => clearInterval(interval)
  }, [])

  // Load analytics data from Supabase
  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setAnalyticsLoading(true)
        const response = await fetch('/api/analytics?timeframe=30')
        if (response.ok) {
          const data = await response.json()
          setAnalyticsData(data)
        } else {
          console.error('Failed to load analytics data')
        }
      } catch (error) {
        console.error('Error loading analytics data:', error)
      } finally {
        setAnalyticsLoading(false)
      }
    }

    if (isAuthenticated) {
      loadAnalyticsData()
    }
  }, [isAuthenticated])

  // Load donation tickets from Supabase
  useEffect(() => {
    const loadDonationTickets = async () => {
      try {
        setTicketsLoading(true)
        const response = await fetch('/api/donations')
        if (response.ok) {
          const result = await response.json()
          // Transform tickets to match admin format
          const transformedTickets = result.tickets.map((ticket: any) => ({
            id: ticket.id,
            organization: ticket.organization_name,
            type: 'Organization', // Default since we don't have org type in tickets
            foodType: ticket.title.replace('Food Donation: ', ''),
            quantity: `${ticket.weight || ticket.item_count || 'N/A'} ${ticket.weight ? 'kg' : 'items'}`,
            expiry: ticket.expiry_date,
            location: ticket.pickup_address || 'Not specified',
            status: ticket.status,
            submittedAt: new Date(ticket.created_at).toLocaleString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Africa/Cairo'
            }).replace(',', ''),
            pickupMethod: ticket.delivery_method === 'pickup' ? 'Pickup Required' : 'Delivery Available',
            description: ticket.description || 'No description provided',
            contactPerson: ticket.contact_person,
            contactPhone: ticket.contact_phone,
            specialInstructions: ticket.special_instructions
          }))

          setDonationTickets(transformedTickets)
          console.log('Donation tickets loaded successfully:', transformedTickets)
        } else {
          console.error('Failed to load donation tickets')
        }
      } catch (error) {
        console.error('Error loading donation tickets:', error)
      } finally {
        setTicketsLoading(false)
      }
    }

    if (isAuthenticated) {
      loadDonationTickets()
    }
  }, [isAuthenticated])

  // Mock data for feedback
  const feedbackItems = [
    {
      id: 1,
      userEmail: "user@charity.org",
      type: "bug",
      subject: "App crashes when uploading photos",
      message: "The app crashes every time I try to upload photos of food donations. This happens on Android version.",
      submittedOn: "2025-01-14 11:30",
      status: "unresolved",
      priority: "high"
    },
    {
      id: 2,
      userEmail: "admin@shelter.org",
      type: "feature",
      subject: "Need bulk approval feature",
      message: "It would be great to have a feature to approve multiple donations at once instead of one by one.",
      submittedOn: "2025-01-13 14:20",
      status: "resolved",
      priority: "medium"
    },
    {
      id: 3,
      userEmail: "contact@restaurant.com",
      type: "bug",
      subject: "Location not updating correctly",
      message: "When I update my restaurant location, it doesn't save properly and reverts to the old address.",
      submittedOn: "2025-01-12 16:45",
      status: "unresolved",
      priority: "medium"
    }
  ]

  const handleApproveTicket = async (ticketId: string) => {
    const ticket = donationTickets.find((t: any) => t.id === ticketId)
    if (!ticket) return

    try {
      const response = await fetch('/api/donation-tickets/approve', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId: ticketId,
          status: 'approved'
        }),
      })

      if (response.ok) {
        // Update local state
        setDonationTickets((prevTickets: any) =>
          prevTickets.map((t: any) =>
            t.id === ticketId ? { ...t, status: 'approved' } : t
          )
        )
        alert(`Ticket from ${ticket.organization} has been approved! It will now be visible to charities and shelters.`)
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error approving ticket:', error)
      alert('An error occurred while approving the ticket.')
    }
  }

  const handleRejectTicket = async (ticketId: string) => {
    const ticket = donationTickets.find((t: any) => t.id === ticketId)
    if (!ticket) return

    const reason = prompt("Please provide a reason for rejection:")
    if (!reason) return

    try {
      const response = await fetch('/api/donation-tickets/approve', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId: ticketId,
          status: 'rejected',
          rejectionReason: reason
        }),
      })

      if (response.ok) {
        // Update local state
        setDonationTickets((prevTickets: any) =>
          prevTickets.map((t: any) =>
            t.id === ticketId ? { ...t, status: 'rejected', rejectionReason: reason } : t
          )
        )
        alert(`Ticket from ${ticket.organization} has been rejected. Reason sent to organization.`)
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error rejecting ticket:', error)
      alert('An error occurred while rejecting the ticket.')
    }
  }

  const handleLogout = () => {
    // Clear admin session
    sessionStorage.removeItem('adminLoggedIn')
    alert('Logged out successfully!')
    window.location.href = '/login'
  }

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif
      )
    )
  }

  const markAllNotificationsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length
  }

  const handleSettingsSave = () => {
    alert('Settings saved successfully!')
    setShowSettings(false)
  }

  const handleUserApproval = async (userId: string | number, action: 'approve' | 'reject') => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    try {
      let rejectionReason = null
      if (action === 'reject') {
        rejectionReason = prompt("Please provide a reason for rejection:")
        if (!rejectionReason) return // User cancelled
      }

      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          status: action === 'approve' ? 'approved' : 'rejected',
          rejectionReason
        }),
      })

      if (response.ok) {
        // Update local state
        setUsers(prevUsers =>
          prevUsers.map(u =>
            u.id === userId
              ? { ...u, status: action === 'approve' ? 'approved' : 'rejected' }
              : u
          )
        )

        if (action === 'approve') {
          alert(`User ${user.fullName} has been approved and can now access the platform.`)
        } else {
          alert(`User ${user.fullName} has been rejected.`)
        }
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating user:', error)
      alert('An error occurred while updating the user.')
    }
  }

  const handleDonationApproval = async (donationId: string, action: 'approve' | 'reject') => {
    const donation = foodDonations.find((d: any) => d.id === donationId)
    if (!donation) return

    try {
      let rejectionReason = null
      if (action === 'reject') {
        rejectionReason = prompt("Please provide a reason for rejection:")
        if (!rejectionReason) return // User cancelled
      }

      const response = await fetch('/api/donations/approve', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donationId: donationId,
          status: action === 'approve' ? 'approved' : 'rejected',
          rejectionReason
        }),
      })

      if (response.ok) {
        // Update local state
        setFoodDonations((prevDonations: any) =>
          prevDonations.map((d: any) =>
            d.id === donationId
              ? { ...d, status: action === 'approve' ? 'approved' : 'rejected' }
              : d
          )
        )

        if (action === 'approve') {
          alert(`Food donation from ${(donation as any).organizationName} has been approved and is now published.`)
        } else {
          alert(`Food donation from ${(donation as any).organizationName} has been rejected.`)
        }
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating donation:', error)
      alert('An error occurred while updating the donation.')
    }
  }

  const handleUserAction = (userId: number, action: 'deactivate' | 'reset_password') => {
    const user = users.find(u => u.id === userId)
    if (action === 'deactivate') {
      const confirm = window.confirm(`Are you sure you want to deactivate ${user?.fullName}?`)
      if (confirm) {
        alert(`User ${user?.fullName} has been deactivated.`)
      }
    } else if (action === 'reset_password') {
      alert(`Password reset email sent to ${user?.email}`)
    }
  }

  const handleFeedbackAction = (feedbackId: number, action: 'reply' | 'resolve' | 'assign') => {
    const feedback = feedbackItems.find(f => f.id === feedbackId)
    if (action === 'reply') {
      setSelectedFeedback(feedback)
      setShowReplyModal(true)
    } else if (action === 'resolve') {
      alert(`Issue marked as resolved.`)
    } else if (action === 'assign') {
      const assignee = prompt("Assign to (enter support member name):")
      if (assignee) {
        alert(`Issue assigned to ${assignee}`)
      }
    }
  }

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      alert('Please enter a reply message')
      return
    }

    alert(`Reply sent to ${selectedFeedback?.userEmail}:\n\n"${replyMessage}"`)
    setShowReplyModal(false)
    setSelectedFeedback(null)
    setReplyMessage('')
  }

  const handleCloseReplyModal = () => {
    setShowReplyModal(false)
    setSelectedFeedback(null)
    setReplyMessage('')
  }

  const handleBulkUpdate = () => {
    setShowBulkUpdateModal(true)
  }

  const handleSendBulkUpdate = () => {
    if (!bulkUpdateMessage.trim()) {
      alert('Please enter a bulk update message')
      return
    }

    const targetFeedback = feedbackItems.filter(item => {
      if (bulkUpdateType === 'all') return true
      if (bulkUpdateType === 'unresolved') return item.status === 'unresolved'
      if (bulkUpdateType === 'resolved') return item.status === 'resolved'
      return false
    })

    const emailList = targetFeedback.map(item => item.userEmail).join(', ')

    alert(`Bulk update sent to ${targetFeedback.length} users:\n\nRecipients: ${emailList}\n\nMessage: "${bulkUpdateMessage}"`)

    setShowBulkUpdateModal(false)
    setBulkUpdateMessage('')
    setBulkUpdateType('unresolved')
  }

  const handleCloseBulkUpdateModal = () => {
    setShowBulkUpdateModal(false)
    setBulkUpdateMessage('')
    setBulkUpdateType('unresolved')
  }

  const handleExportReport = () => {
    setShowExportModal(true)
  }

  const getFilteredFeedbackItems = () => {
    return feedbackItems.filter(item => {
      // Filter by status
      if (exportStatus !== 'all' && item.status !== exportStatus) return false

      // Filter by type
      if (exportType !== 'all' && item.type !== exportType) return false

      // Filter by date range
      if (exportDateRange !== 'all') {
        const itemDate = new Date(item.submittedOn)
        const now = new Date()
        const daysAgo = exportDateRange === '7days' ? 7 : exportDateRange === '30days' ? 30 : 90
        const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000))
        if (itemDate < cutoffDate) return false
      }

      return true
    })
  }

  const getDisplayedFeedbackItems = () => {
    return feedbackItems.filter(item => {
      // Filter by status for main display
      if (feedbackStatusFilter !== 'all' && item.status !== feedbackStatusFilter) return false

      // Filter by type for main display
      if (feedbackTypeFilter !== 'all' && item.type !== feedbackTypeFilter) return false

      return true
    })
  }

  const handleConfirmExport = () => {
    const filteredItems = getFilteredFeedbackItems()

    if (filteredItems.length === 0) {
      alert('No feedback items match the selected filters.')
      return
    }

    if (exportFormat === 'csv') {
      exportAsCSV(filteredItems)
    } else {
      exportAsPDF(filteredItems)
    }

    setShowExportModal(false)
  }

  const exportAsCSV = (items: any[]) => {
    const csvHeaders = ['ID', 'User Email', 'Type', 'Subject', 'Message', 'Priority', 'Status', 'Submitted On']
    const csvRows = items.map(item => [
      item.id,
      item.userEmail,
      item.type,
      item.subject,
      `"${item.message.replace(/"/g, '""')}"`, // Escape quotes in message
      item.priority,
      item.status,
      item.submittedOn
    ])

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n')

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `feedback-report-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    showExportSummary(items, 'CSV')
  }

  const exportAsPDF = (items: any[]) => {
    // Create PDF content as HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Feedback Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .summary { background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
            .feedback-item { border: 1px solid #ddd; margin-bottom: 15px; padding: 15px; border-radius: 5px; }
            .feedback-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .badge { padding: 3px 8px; border-radius: 3px; font-size: 12px; font-weight: bold; }
            .badge-bug { background: #fee; color: #c53030; }
            .badge-feature { background: #eff6ff; color: #2563eb; }
            .badge-general { background: #f7fafc; color: #4a5568; }
            .badge-high { background: #fee; color: #c53030; }
            .badge-medium { background: #fef5e7; color: #d69e2e; }
            .badge-low { background: #f0fff4; color: #38a169; }
            .badge-resolved { background: #f0fff4; color: #38a169; }
            .badge-unresolved { background: #fee; color: #c53030; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🍱 GivingHand - Feedback Report</h1>
            <p>Generated on ${new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>

          <div class="summary">
            <h3>📊 Report Summary</h3>
            <p><strong>Total Items:</strong> ${items.length}</p>
            <p><strong>Unresolved:</strong> ${items.filter(item => item.status === 'unresolved').length}</p>
            <p><strong>Resolved:</strong> ${items.filter(item => item.status === 'resolved').length}</p>
            <p><strong>Bug Reports:</strong> ${items.filter(item => item.type === 'bug').length}</p>
            <p><strong>Feature Requests:</strong> ${items.filter(item => item.type === 'feature').length}</p>
          </div>

          ${items.map(item => `
            <div class="feedback-item">
              <div class="feedback-header">
                <div>
                  <strong>${item.userEmail}</strong>
                  <span class="badge badge-${item.type}">${item.type.toUpperCase()}</span>
                  <span class="badge badge-${item.priority}">${item.priority.toUpperCase()}</span>
                  <span class="badge badge-${item.status}">${item.status.toUpperCase()}</span>
                </div>
                <div>${item.submittedOn}</div>
              </div>
              <h4>${item.subject}</h4>
              <p>${item.message}</p>
            </div>
          `).join('')}
        </body>
      </html>
    `

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `feedback-report-${new Date().toISOString().split('T')[0]}.html`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Note: For true PDF generation, you'd need a library like jsPDF or html2pdf
    showExportSummary(items, 'PDF (HTML)')
  }

  const showExportSummary = (items: any[], format: string) => {
    const totalItems = items.length
    const unresolvedItems = items.filter(item => item.status === 'unresolved').length
    const resolvedItems = items.filter(item => item.status === 'resolved').length
    const bugReports = items.filter(item => item.type === 'bug').length
    const featureRequests = items.filter(item => item.type === 'feature').length

    alert(`📊 Feedback Report Exported Successfully!\n\n` +
          `📁 Format: ${format}\n` +
          `📁 File: feedback-report-${new Date().toISOString().split('T')[0]}\n\n` +
          `📈 Summary:\n` +
          `• Total Items: ${totalItems}\n` +
          `• Unresolved: ${unresolvedItems}\n` +
          `• Resolved: ${resolvedItems}\n` +
          `• Bug Reports: ${bugReports}\n` +
          `• Feature Requests: ${featureRequests}\n\n` +
          `The report has been downloaded to your computer.`)
  }

  const handleCloseExportModal = () => {
    setShowExportModal(false)
    setExportFormat('csv')
    setExportDateRange('all')
    setExportStatus('all')
    setExportType('all')
  }

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#45A761] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4 min-w-0">
              <div className="flex items-center space-x-2 lg:space-x-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <img src="/logo.png" alt="GivingHand Logo" className="h-6 lg:h-8 w-6 lg:w-8 object-contain" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg lg:text-2xl font-bold text-gray-900 truncate">GivingHand Admin</h1>
                  <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">Backend Control Panel</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {getUnreadCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getUnreadCount()}
                    </span>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllNotificationsRead}
                          className="text-sm text-[#45A761]"
                        >
                          Mark all read
                        </Button>
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'urgent' ? 'bg-red-500' :
                              notification.type === 'approval' ? 'bg-yellow-500' :
                              notification.type === 'success' ? 'bg-green-500' :
                              'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className={`text-sm font-medium ${
                                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setShowNotifications(false)}
                      >
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-5 w-5" />
              </Button>

              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-80px)] flex-shrink-0">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`w-full flex items-center space-x-3 px-3 py-2 h-10 rounded-lg text-left transition-colors ${
                activeTab === 'tickets' ? 'bg-[#45A761] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Donation Tickets</span>
              <Badge variant="destructive" className="ml-auto flex-shrink-0">3</Badge>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center space-x-3 px-3 py-2 h-10 rounded-lg text-left transition-colors ${
                activeTab === 'users' ? 'bg-[#45A761] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">User Management</span>
            </button>

            <button
              onClick={() => setActiveTab('donations')}
              className={`w-full flex items-center space-x-3 px-3 py-2 h-10 rounded-lg text-left transition-colors ${
                activeTab === 'donations' ? 'bg-[#45A761] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Package className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Food Donations</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-3 py-2 h-10 rounded-lg text-left transition-colors ${
                activeTab === 'analytics' ? 'bg-[#45A761] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('impact')}
              className={`w-full flex items-center space-x-3 px-3 py-2 h-10 rounded-lg text-left transition-colors ${
                activeTab === 'impact' ? 'bg-[#45A761] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Leaf className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Environmental Impact</span>
            </button>

            <button
              onClick={() => setActiveTab('feedback')}
              className={`w-full flex items-center space-x-3 px-3 py-2 h-10 rounded-lg text-left transition-colors ${
                activeTab === 'feedback' ? 'bg-[#45A761] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Feedback & Issues</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto min-w-0">
          {activeTab === 'tickets' && (
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Food Donation Tickets</h2>
                  <p className="text-gray-600">Review and approve pending food donations</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761] focus:border-transparent"
                    />
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761]">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761]">
                    <option value="">All Types</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="hotel">Hotel</option>
                    <option value="supermarket">Supermarket</option>
                  </select>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {ticketsLoading ? '...' : donationTickets.filter((t: any) => t.status === 'pending').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Approved</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {ticketsLoading ? '...' : donationTickets.filter((t: any) => t.status === 'approved').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <X className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Rejected</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {ticketsLoading ? '...' : donationTickets.filter((t: any) => t.status === 'rejected').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Urgent</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {ticketsLoading ? '...' : donationTickets.filter((t: any) => {
                            if (t.status !== 'pending') return false;
                            const expiryDate = new Date(t.expiry);
                            const now = new Date();
                            const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
                            return hoursUntilExpiry <= 24 && hoursUntilExpiry > 0; // Urgent if expiring within 24 hours
                          }).length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tickets Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Type</th>
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Quantity</th>
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Expiry</th>
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Submitted</th>
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {ticketsLoading ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                              Loading donation tickets...
                            </td>
                          </tr>
                        ) : donationTickets.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                              No donation tickets found
                            </td>
                          </tr>
                        ) : (
                          donationTickets.map((ticket: any) => (
                          <tr key={ticket.id} className="hover:bg-gray-50">
                            <td className="px-3 lg:px-6 py-4">
                              <div className="flex items-center">
                                <Building2 className="h-4 w-4 lg:h-5 lg:w-5 text-[#45A761] mr-2 lg:mr-3 flex-shrink-0" />
                                <div className="min-w-0">
                                  <div className="text-sm font-medium text-gray-900 truncate">{ticket.organization}</div>
                                  <div className="text-xs lg:text-sm text-gray-500 truncate">{ticket.type}</div>
                                  <div className="text-xs text-gray-500 truncate xl:hidden">Submitted: {ticket.submittedAt}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 lg:px-6 py-4">
                              <div className="text-sm text-gray-900 truncate">{ticket.foodType}</div>
                              <div className="text-xs text-gray-500 truncate sm:hidden">Qty: {ticket.quantity}</div>
                              <div className="text-xs text-gray-500 truncate md:hidden">Exp: {ticket.expiry}</div>
                              <div className="text-xs lg:text-sm text-gray-500 truncate">{ticket.location}</div>
                            </td>
                            <td className="px-3 lg:px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">
                              {ticket.quantity}
                            </td>
                            <td className="px-3 lg:px-6 py-4 text-sm text-gray-900 hidden md:table-cell">
                              {ticket.expiry}
                            </td>
                            <td className="px-3 lg:px-6 py-4 text-sm text-gray-500 hidden xl:table-cell">
                              {ticket.submittedAt}
                            </td>
                            <td className="px-3 lg:px-6 py-4">
                              {(() => {
                                const isUrgent = ticket.status === 'pending' && (() => {
                                  const expiryDate = new Date(ticket.expiry);
                                  const now = new Date();
                                  const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
                                  return hoursUntilExpiry <= 24 && hoursUntilExpiry > 0;
                                })();
                                const displayStatus = isUrgent ? 'urgent' : ticket.status;

                                return (
                                  <Badge
                                    variant={
                                      ticket.status === 'approved' ? 'default' :
                                      ticket.status === 'rejected' ? 'destructive' :
                                      isUrgent ? 'destructive' :
                                      'secondary'
                                    }
                                    className={
                                      ticket.status === 'approved' ? 'bg-green-100 text-green-800' :
                                      isUrgent ? 'bg-red-100 text-red-800' :
                                      ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-gray-100 text-gray-800'
                                    }
                                  >
                                    {isUrgent && <AlertTriangle className="h-3 w-3 mr-1" />}
                                    {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
                                  </Badge>
                                );
                              })()}
                            </td>
                            <td className="px-3 lg:px-6 py-4 text-sm font-medium">
                              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                {ticket.status === 'pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      className="bg-[#45A761] hover:bg-[#3a8f52] text-white text-xs lg:text-sm"
                                      onClick={() => handleApproveTicket(ticket.id)}
                                    >
                                      <CheckCircle className="h-3 w-3 md:mr-1" />
                                      <span className="hidden md:inline">Approve</span>
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-red-300 text-red-600 hover:bg-red-50 text-xs lg:text-sm"
                                      onClick={() => handleRejectTicket(ticket.id)}
                                    >
                                      <X className="h-3 w-3 md:mr-1" />
                                      <span className="hidden md:inline">Reject</span>
                                    </Button>
                                  </>
                                )}
                                <Button size="sm" variant="ghost" className="text-xs lg:text-sm">
                                  <Eye className="h-3 w-3 md:mr-1" />
                                  <span className="hidden md:inline">View</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">User Management</h2>
                  <p className="text-gray-600">Manage user registrations and approvals</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761] focus:border-transparent"
                    />
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761]">
                    <option value="">All Roles</option>
                    <option value="supermarket">Supermarket</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="hotel">Hotel</option>
                    <option value="charity">Charity</option>
                    <option value="shelter">Shelter</option>
                    <option value="factory">Factory</option>
                    <option value="donor">Donor</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761]">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {analyticsLoading ? '...' : analyticsData?.totalUsers || users.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {analyticsLoading ? '...' : analyticsData?.pendingUsers || users.filter(u => u.status === 'pending').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Approved</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {analyticsLoading ? '...' : analyticsData?.activeUsers || users.filter(u => u.status === 'approved').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Heart className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Active Today</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {analyticsLoading ? '...' : analyticsData?.activeUsers || users.filter(u => u.status === 'approved').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Users Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-[#45A761] rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                  {user.fullName.charAt(0)}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline" className="capitalize">
                                {user.role}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.organizationName}</div>
                              <div className="text-sm text-gray-500">{user.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.registeredAt}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={user.status === 'approved' ? 'default' : 'secondary'}
                                className={
                                  user.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }
                              >
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                {user.status === 'pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      className="bg-[#45A761] hover:bg-[#3a8f52] text-white"
                                      onClick={() => handleUserApproval(user.id, 'approve')}
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-red-300 text-red-600 hover:bg-red-50"
                                      onClick={() => handleUserApproval(user.id, 'reject')}
                                    >
                                      <X className="h-3 w-3 mr-1" />
                                      Reject
                                    </Button>
                                  </>
                                )}
                                {user.status === 'approved' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                                    onClick={() => handleUserAction(user.id, 'deactivate')}
                                  >
                                    🔒 Deactivate
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleUserAction(user.id, 'reset_password')}
                                >
                                  🔄 Reset Password
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'donations' && (
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Food Donations Management</h2>
                  <p className="text-gray-600">Review and approve pending food donation submissions</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761]">
                    <option value="all">All Donations</option>
                    <option value="pending">Pending Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <Button variant="outline" className="text-sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>

              {/* Food Donations Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Food Donation Submissions ({foodDonations.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 text-xs lg:text-sm">Organization</th>
                          <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 text-xs lg:text-sm">Food Details</th>
                          <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 text-xs lg:text-sm hidden sm:table-cell">Quantity</th>
                          <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 text-xs lg:text-sm hidden md:table-cell">Expiry Date</th>
                          <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 text-xs lg:text-sm">Status</th>
                          <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 text-xs lg:text-sm hidden lg:table-cell">Submitted</th>
                          <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 text-xs lg:text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {foodDonations.map((donation: any) => (
                          <tr key={donation.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-2 lg:px-4">
                              <div>
                                <div className="font-medium text-gray-900 text-sm truncate">{donation.organizationName}</div>
                                {donation.userInfo && (
                                  <div className="text-xs lg:text-sm text-gray-500 truncate">{donation.userInfo.email}</div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-2 lg:px-4">
                              <div>
                                <div className="font-medium text-gray-900 text-sm truncate">{donation.foodCategory}</div>
                                <div className="text-xs lg:text-sm text-gray-500 truncate">{donation.description}</div>
                                <div className="text-xs text-gray-400 mt-1 sm:hidden">
                                  {donation.quantity}
                                </div>
                                <div className="text-xs text-gray-400 mt-1 md:hidden">
                                  Exp: {donation.expiryDate}
                                </div>
                                <div className="text-xs text-gray-400 mt-1 truncate">
                                  {donation.packagingType} • {donation.condition}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2 lg:px-4 hidden sm:table-cell">
                              <span className="font-medium text-sm">{donation.quantity}</span>
                            </td>
                            <td className="py-4 px-2 lg:px-4 hidden md:table-cell">
                              <span className="text-sm">{donation.expiryDate}</span>
                            </td>
                            <td className="py-4 px-2 lg:px-4">
                              <div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  donation.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                </span>
                                <div className="text-xs text-gray-500 mt-1 lg:hidden">{donation.submittedAt}</div>
                              </div>
                            </td>
                            <td className="py-4 px-2 lg:px-4 hidden lg:table-cell">
                              <span className="text-sm text-gray-500">{donation.submittedAt}</span>
                            </td>
                            <td className="py-4 px-2 lg:px-4">
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-2">
                                {donation.status === 'pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      className="bg-[#45A761] hover:bg-[#3a8f52] text-white text-xs"
                                      onClick={() => handleDonationApproval(donation.id, 'approve')}
                                    >
                                      <CheckCircle className="h-3 w-3 md:mr-1" />
                                      <span className="hidden md:inline">Approve</span>
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-red-300 text-red-600 hover:bg-red-50 text-xs"
                                      onClick={() => handleDonationApproval(donation.id, 'reject')}
                                    >
                                      <X className="h-3 w-3 md:mr-1" />
                                      <span className="hidden md:inline">Reject</span>
                                    </Button>
                                  </>
                                )}
                                {donation.status === 'approved' && (
                                  <span className="text-green-600 text-xs lg:text-sm font-medium">✓ Published</span>
                                )}
                                {donation.status === 'rejected' && (
                                  <span className="text-red-600 text-xs lg:text-sm font-medium">✗ Rejected</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                        {foodDonations.length === 0 && (
                          <tr>
                            <td colSpan={7} className="py-8 px-4 text-center text-gray-500">
                              No food donations submitted yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
                  <p className="text-gray-600">View donation trends and platform statistics</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761]">
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 3 months</option>
                    <option value="365">Last year</option>
                  </select>
                  <Button variant="outline" className="text-sm">
                    📊 Export Data
                  </Button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Package className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Donations</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {analyticsLoading ? '...' : analyticsData?.totalDonations || 0}
                        </p>
                        <p className="text-xs text-green-600">
                          +{analyticsLoading ? '...' : analyticsData?.growthPercentage || 0}% from last month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {analyticsLoading ? '...' : analyticsData?.activeUsers || 0}
                        </p>
                        <p className="text-xs text-blue-600">
                          {analyticsLoading ? '...' : analyticsData?.totalUsers || 0} total registered
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Organizations</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {analyticsLoading ? '...' : analyticsData?.organizations || 0}
                        </p>
                        <p className="text-xs text-purple-600">
                          {analyticsLoading ? '...' : analyticsData?.pendingUsers || 0} pending approval
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                        <p className="text-2xl font-bold text-gray-900">
                          +{analyticsLoading ? '...' : analyticsData?.growthPercentage || 0}%
                        </p>
                        <p className="text-xs text-orange-600">
                          {analyticsLoading ? 'Loading...' : (analyticsData?.growthPercentage || 0) > 10 ? 'Above target' : 'Below target'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Donations Distribution</CardTitle>
                    <CardDescription>Weekly donation breakdown in the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analyticsLoading ? (
                      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Loading donations data...</p>
                        </div>
                      </div>
                    ) : analyticsData?.dailyDonations && Object.keys(analyticsData.dailyDonations).length > 0 ? (
                      <div className="h-64 p-4">
                        <div className="h-full flex items-center justify-center">
                          {(() => {
                            // Group donations by week
                            const weeklyData: { [key: string]: number } = {}
                            const totalDonations = Object.values(analyticsData.dailyDonations).reduce((sum: number, count: any) => sum + count, 0)

                            Object.entries(analyticsData.dailyDonations).forEach(([date, count]: [string, any]) => {
                              const dateObj = new Date(date)
                              const weekStart = new Date(dateObj)
                              weekStart.setDate(dateObj.getDate() - dateObj.getDay()) // Start of week (Sunday)
                              const weekKey = weekStart.toISOString().split('T')[0]

                              weeklyData[weekKey] = (weeklyData[weekKey] || 0) + count
                            })

                            const weeks = Object.entries(weeklyData)
                              .sort(([a], [b]) => a.localeCompare(b))
                              .slice(-4) // Last 4 weeks
                              .map(([weekStart, count]: [string, any], index) => {
                                const percentage = totalDonations > 0 ? (count / totalDonations) * 100 : 0
                                const weekName = `Week ${index + 1}`
                                return { weekName, count, percentage, weekStart }
                              })

                            const colors = ['#45A761', '#3a8f52', '#2d7a42', '#206532']
                            let currentAngle = 0

                            return (
                              <div className="flex items-center space-x-8">
                                {/* Pie Chart */}
                                <div className="relative">
                                  <svg width="200" height="200" className="transform -rotate-90">
                                    <circle
                                      cx="100"
                                      cy="100"
                                      r="80"
                                      fill="none"
                                      stroke="#f3f4f6"
                                      strokeWidth="20"
                                    />
                                    {weeks.map((week, index) => {
                                      const angle = (week.percentage / 100) * 360
                                      const startAngle = currentAngle
                                      currentAngle += angle

                                      const startAngleRad = (startAngle * Math.PI) / 180
                                      const endAngleRad = (currentAngle * Math.PI) / 180

                                      const largeArcFlag = angle > 180 ? 1 : 0

                                      const x1 = 100 + 80 * Math.cos(startAngleRad)
                                      const y1 = 100 + 80 * Math.sin(startAngleRad)
                                      const x2 = 100 + 80 * Math.cos(endAngleRad)
                                      const y2 = 100 + 80 * Math.sin(endAngleRad)

                                      const pathData = [
                                        `M 100 100`,
                                        `L ${x1} ${y1}`,
                                        `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                        'Z'
                                      ].join(' ')

                                      return (
                                        <path
                                          key={index}
                                          d={pathData}
                                          fill={colors[index]}
                                          className="hover:opacity-80 transition-opacity cursor-pointer"
                                        >
                                          <title>{`${week.weekName}: ${week.count} donations (${week.percentage.toFixed(1)}%)`}</title>
                                        </path>
                                      )
                                    })}
                                  </svg>

                                  {/* Center Text */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                      <div className="text-2xl font-bold text-gray-900">{totalDonations}</div>
                                      <div className="text-xs text-gray-500">Total</div>
                                    </div>
                                  </div>
                                </div>

                                {/* Legend */}
                                <div className="space-y-3">
                                  {weeks.map((week, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                      <div
                                        className="w-4 h-4 rounded"
                                        style={{ backgroundColor: colors[index] }}
                                      ></div>
                                      <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900">{week.weekName}</div>
                                        <div className="text-xs text-gray-500">
                                          {week.count} donations ({week.percentage.toFixed(1)}%)
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          })()}
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">No donation data available</p>
                          <p className="text-sm text-gray-400">Start accepting donations to see distribution</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Donating Organizations</CardTitle>
                    <CardDescription>Organizations with most donations this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsLoading ? (
                        <div className="text-center py-4">
                          <p className="text-gray-500">Loading...</p>
                        </div>
                      ) : analyticsData?.topDonatingOrganizations?.length > 0 ? (
                        analyticsData.topDonatingOrganizations.slice(0, 3).map((org: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 ${
                                index === 0 ? 'bg-[#45A761]' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{org.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{org.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold">{org.donations} donations</p>
                              <p className="text-xs text-gray-500">{org.totalQuantity} kg</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-500">No donation data available</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Active Recipients</CardTitle>
                    <CardDescription>Shelters and charities receiving most donations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Cairo Charity Foundation</span>
                        <span className="text-sm font-semibold">34 received</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Alexandria Homeless Shelter</span>
                        <span className="text-sm font-semibold">28 received</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Giza Food Processing</span>
                        <span className="text-sm font-semibold">22 received</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Activity by Role</CardTitle>
                    <CardDescription>Distribution of active users by organization type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analyticsLoading ? (
                      <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Globe className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Loading user distribution...</p>
                        </div>
                      </div>
                    ) : analyticsData?.userTypeDistribution ? (
                      <div className="space-y-3">
                        {Object.entries(analyticsData.userTypeDistribution).map(([type, count]: [string, any]) => {
                          const total = Object.values(analyticsData.userTypeDistribution).reduce((sum: number, val: any) => sum + val, 0)
                          const percentage = total > 0 ? Math.round((count / total) * 100) : 0
                          return (
                            <div key={type} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#45A761] rounded-full mr-3"></div>
                                <span className="text-sm capitalize">{type}s</span>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-semibold">{count} users</span>
                                <span className="text-xs text-gray-500 ml-2">({percentage}%)</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Globe className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No user data available</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Environmental Impact</h2>
                  <p className="text-gray-600">Track sustainability metrics and environmental benefits</p>
                </div>

                <div className="flex items-center space-x-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761]">
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 3 months</option>
                    <option value="365">Last year</option>
                    <option value="all">All time</option>
                  </select>
                  <Button variant="outline">
                    📄 Generate Report
                  </Button>
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* 1. Greenhouse Gas Reduction */}
                <Card className="border-2 border-green-100 hover:border-green-200 transition-colors">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="mx-auto mb-6 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <Globe className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Lowers Greenhouse Gas Emissions</h3>
                      <div className="mb-4">
                        <p className="text-3xl font-bold text-green-600">
                          {analyticsLoading ? '...' : `${analyticsData?.environmentalImpact?.methaneReduced?.toLocaleString() || 0} kg`}
                        </p>
                        <p className="text-sm text-gray-600">Methane Reduced</p>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Decomposing food in landfills releases methane — a potent greenhouse gas.
                        Your app helps cut these emissions by redirecting food to those in need.
                      </p>
                      <p className="text-xs text-green-600 mt-3">
                        +{analyticsLoading ? '...' : analyticsData?.environmentalImpact?.impactGrowthPercentage || 0}% this month
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Resource Conservation */}
                <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="mx-auto mb-6 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                        <Leaf className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Conserves Natural Resources</h3>
                      <div className="mb-4 space-y-2">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {analyticsLoading ? '...' : `${analyticsData?.environmentalImpact?.waterSaved?.toLocaleString() || 0} L`}
                          </p>
                          <p className="text-xs text-gray-600">Water Saved</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {analyticsLoading ? '...' : `${analyticsData?.environmentalImpact?.energySaved?.toLocaleString() || 0} kWh`}
                          </p>
                          <p className="text-xs text-gray-600">Energy Saved</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Every meal saved reduces the use of water, energy, and fuel in farming and transport —
                        preserving Earth's vital resources.
                      </p>
                      <p className="text-xs text-blue-600 mt-3">
                        +{analyticsLoading ? '...' : analyticsData?.environmentalImpact?.impactGrowthPercentage || 0}% this month
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 3. Fighting Hunger */}
                <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="mx-auto mb-6 w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                        <Heart className="h-10 w-10 text-orange-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Feeds People, Fights Hunger</h3>
                      <div className="mb-4">
                        <p className="text-3xl font-bold text-orange-600">
                          {analyticsLoading ? '...' : `${analyticsData?.environmentalImpact?.mealsServed?.toLocaleString() || 0}`}
                        </p>
                        <p className="text-sm text-gray-600">Meals Served</p>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Your efforts directly provide meals to families, turning surplus into sustenance instead of waste.
                      </p>
                      <p className="text-xs text-orange-600 mt-3">
                        +{analyticsLoading ? '...' : analyticsData?.environmentalImpact?.impactGrowthPercentage || 0}% this month
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Visual Comparisons */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Equivalents</CardTitle>
                    <CardDescription>Real-world impact comparisons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-lg mr-4">
                            <Truck className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">CO₂ Emissions Prevented</p>
                            <p className="text-xs text-gray-600">Equivalent to removing cars from road</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            {analyticsLoading ? '...' : `${analyticsData?.environmentalImpact?.environmentalEquivalents?.carsOffRoad || 0} cars`}
                          </p>
                          <p className="text-xs text-gray-500">for 1 year</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg mr-4">
                            <Users className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">People Fed</p>
                            <p className="text-xs text-gray-600">Meals provided to families</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">
                            {analyticsLoading ? '...' : `${analyticsData?.environmentalImpact?.mealsServed?.toLocaleString() || 0}`}
                          </p>
                          <p className="text-xs text-gray-500">meals served</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-cyan-100 rounded-lg mr-4">
                            <Leaf className="h-6 w-6 text-cyan-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Trees Planted Equivalent</p>
                            <p className="text-xs text-gray-600">CO₂ absorption capacity</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-cyan-600">
                            {analyticsLoading ? '...' : `${analyticsData?.environmentalImpact?.environmentalEquivalents?.treesPlanted || 0} trees`}
                          </p>
                          <p className="text-xs text-gray-500">annual impact</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-purple-100 rounded-lg mr-4">
                            <Zap className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Households Powered</p>
                            <p className="text-xs text-gray-600">Energy conservation equivalent</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-600">
                            {analyticsLoading ? '...' : `${analyticsData?.environmentalImpact?.environmentalEquivalents?.householdsPowered || 0} homes`}
                          </p>
                          <p className="text-xs text-gray-500">for 1 year</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cumulative Impact Timeline</CardTitle>
                    <CardDescription>Environmental benefits over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analyticsLoading ? (
                      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Loading timeline data...</p>
                        </div>
                      </div>
                    ) : analyticsData?.environmentalImpact?.cumulativeTimeline?.length > 0 ? (
                      <div className="space-y-4">
                        <div className="h-48 bg-gray-50 rounded-lg p-4">
                          <div className="text-center mb-4">
                            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Cumulative Impact Growth</p>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-lg font-bold text-green-600">
                                {analyticsData.environmentalImpact.cumulativeTimeline[analyticsData.environmentalImpact.cumulativeTimeline.length - 1]?.cumulativeMethane?.toLocaleString() || 0} kg
                              </p>
                              <p className="text-xs text-gray-500">Total CO₂ Reduced</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-blue-600">
                                {analyticsData.environmentalImpact.cumulativeTimeline[analyticsData.environmentalImpact.cumulativeTimeline.length - 1]?.cumulativeMeals?.toLocaleString() || 0}
                              </p>
                              <p className="text-xs text-gray-500">Total Meals</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-purple-600">
                                {analyticsData.environmentalImpact.cumulativeTimeline[analyticsData.environmentalImpact.cumulativeTimeline.length - 1]?.cumulativeQuantity?.toLocaleString() || 0} kg
                              </p>
                              <p className="text-xs text-gray-500">Total Food Saved</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Recent Monthly Progress:</p>
                          {analyticsData.environmentalImpact.cumulativeTimeline.slice(-3).map((month: any) => (
                            <div key={month.month} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm text-gray-600">{month.month}</span>
                              <span className="text-sm font-semibold text-green-600">+{month.monthlyQuantity} kg food</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">No timeline data available</p>
                          <p className="text-sm text-gray-400">Start approving donations to see progress</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Impact Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Impact by Organization Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analyticsLoading ? (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Loading organization data...</p>
                      </div>
                    ) : analyticsData?.environmentalImpact?.impactByOrgType ? (
                      <div className="space-y-4">
                        {Object.entries(analyticsData.environmentalImpact.impactByOrgType).map(([orgType, data]: [string, any], index) => {
                          const totalQuantity = Object.values(analyticsData.environmentalImpact.impactByOrgType).reduce((sum: number, org: any) => sum + org.totalQuantity, 0)
                          const percentage = totalQuantity > 0 ? Math.round((data.totalQuantity / totalQuantity) * 100) : 0
                          const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500']

                          return (
                            <div key={orgType} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className={`w-4 h-4 ${colors[index % colors.length]} rounded mr-3`}></div>
                                  <span className="text-sm capitalize">{orgType}s</span>
                                </div>
                                <span className="text-sm font-semibold">{percentage}%</span>
                              </div>
                              <div className="ml-7 text-xs text-gray-500">
                                <div className="flex justify-between">
                                  <span>{data.donations} donations</span>
                                  <span>{data.totalQuantity} kg food</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{data.mealsServed} meals served</span>
                                  <span>{data.methaneReduced} kg CO₂ reduced</span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">No organization data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analyticsLoading ? (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Loading monthly trends...</p>
                      </div>
                    ) : analyticsData?.environmentalImpact?.cumulativeTimeline?.length > 0 ? (
                      <div className="space-y-3">
                        {analyticsData.environmentalImpact.cumulativeTimeline.slice(-6).reverse().map((month: any, index: number) => {
                          const monthName = new Date(month.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                          const previousMonth = analyticsData.environmentalImpact.cumulativeTimeline[analyticsData.environmentalImpact.cumulativeTimeline.length - index - 2]
                          const growth = previousMonth && previousMonth.cumulativeQuantity > 0
                            ? Math.round(((month.cumulativeQuantity - previousMonth.cumulativeQuantity) / previousMonth.cumulativeQuantity) * 100)
                            : 0

                          return (
                            <div key={month.month} className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">{monthName}</span>
                                <span className={`text-sm font-semibold ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {growth >= 0 ? '+' : ''}{growth}%
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {month.monthlyQuantity} kg food donated this month
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">No monthly data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Goals Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Annual CO₂ Goal (10,000 kg)</span>
                          <span className="text-sm">
                            {analyticsLoading ? '...' : `${Math.min(Math.round(((analyticsData?.environmentalImpact?.methaneReduced || 0) / 10000) * 100), 100)}%`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: analyticsLoading ? '0%' : `${Math.min(Math.round(((analyticsData?.environmentalImpact?.methaneReduced || 0) / 10000) * 100), 100)}%`
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {analyticsLoading ? 'Loading...' : `${analyticsData?.environmentalImpact?.methaneReduced?.toLocaleString() || 0} kg achieved`}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Food Waste Goal (5,000 kg)</span>
                          <span className="text-sm">
                            {analyticsLoading ? '...' : `${Math.min(Math.round(((analyticsData?.environmentalImpact?.totalFoodQuantity || 0) / 5000) * 100), 100)}%`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: analyticsLoading ? '0%' : `${Math.min(Math.round(((analyticsData?.environmentalImpact?.totalFoodQuantity || 0) / 5000) * 100), 100)}%`
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {analyticsLoading ? 'Loading...' : `${analyticsData?.environmentalImpact?.totalFoodQuantity?.toLocaleString() || 0} kg diverted`}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Meals Served Goal (10,000)</span>
                          <span className="text-sm">
                            {analyticsLoading ? '...' : `${Math.min(Math.round(((analyticsData?.environmentalImpact?.mealsServed || 0) / 10000) * 100), 100)}%`}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: analyticsLoading ? '0%' : `${Math.min(Math.round(((analyticsData?.environmentalImpact?.mealsServed || 0) / 10000) * 100), 100)}%`
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {analyticsLoading ? 'Loading...' : `${analyticsData?.environmentalImpact?.mealsServed?.toLocaleString() || 0} meals provided`}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Feedback & Issues</h2>
                  <p className="text-gray-600">Review user feedback and resolve issues</p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search feedback..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761] focus:border-transparent"
                    />
                  </div>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761]"
                    value={feedbackTypeFilter}
                    onChange={(e) => setFeedbackTypeFilter(e.target.value as any)}
                  >
                    <option value="all">All Types</option>
                    <option value="bug">Bug Reports</option>
                    <option value="feature">Feature Requests</option>
                    <option value="general">General Feedback</option>
                  </select>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#45A761]"
                    value={feedbackStatusFilter}
                    onChange={(e) => setFeedbackStatusFilter(e.target.value as any)}
                  >
                    <option value="all">All Status</option>
                    <option value="unresolved">Unresolved</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  {(feedbackTypeFilter !== 'all' || feedbackStatusFilter !== 'all') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFeedbackTypeFilter('all')
                        setFeedbackStatusFilter('all')
                      }}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      ✕ Clear Filters
                    </Button>
                  )}
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          {feedbackTypeFilter === 'all' && feedbackStatusFilter === 'all' ? 'Total Feedback' : 'Filtered Results'}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">{getDisplayedFeedbackItems().length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Unresolved</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {getDisplayedFeedbackItems().filter(item => item.status === 'unresolved').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Resolved</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {getDisplayedFeedbackItems().filter(item => item.status === 'resolved').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          {feedbackTypeFilter === 'bug' ? 'Bug Reports' :
                           feedbackTypeFilter === 'feature' ? 'Feature Requests' :
                           feedbackTypeFilter === 'general' ? 'General Feedback' :
                           'Avg Response Time'}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {feedbackTypeFilter === 'all' ? '4h' : getDisplayedFeedbackItems().length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Feedback Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getDisplayedFeedbackItems().map((feedback) => (
                          <tr key={feedback.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                                  {feedback.userEmail.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-sm text-gray-900">{feedback.userEmail}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant="outline"
                                className={
                                  feedback.type === 'bug' ? 'border-red-300 text-red-600' :
                                  feedback.type === 'feature' ? 'border-blue-300 text-blue-600' :
                                  'border-gray-300 text-gray-600'
                                }
                              >
                                {feedback.type === 'bug' ? '🐛 Bug' :
                                 feedback.type === 'feature' ? '💡 Feature' :
                                 '💬 General'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 font-medium">{feedback.subject}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{feedback.message}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={feedback.priority === 'high' ? 'destructive' : 'secondary'}
                                className={
                                  feedback.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }
                              >
                                {feedback.priority.charAt(0).toUpperCase() + feedback.priority.slice(1)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {feedback.submittedOn}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={feedback.status === 'resolved' ? 'default' : 'secondary'}
                                className={
                                  feedback.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }
                              >
                                {feedback.status === 'resolved' ? '✅ Resolved' : '⏳ Unresolved'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                  onClick={() => handleFeedbackAction(feedback.id, 'reply')}
                                >
                                  📩 Reply
                                </Button>
                                {feedback.status === 'unresolved' && (
                                  <Button
                                    size="sm"
                                    className="bg-[#45A761] hover:bg-[#3a8f52] text-white"
                                    onClick={() => handleFeedbackAction(feedback.id, 'resolve')}
                                  >
                                    🏷️ Resolve
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleFeedbackAction(feedback.id, 'assign')}
                                >
                                  🔁 Assign
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {getDisplayedFeedbackItems().length} of {feedbackItems.length} feedback items
                  {(feedbackTypeFilter !== 'all' || feedbackStatusFilter !== 'all') && (
                    <span className="ml-2 text-[#45A761] font-medium">
                      (Filtered by: {feedbackTypeFilter !== 'all' ? feedbackTypeFilter : ''}
                      {feedbackTypeFilter !== 'all' && feedbackStatusFilter !== 'all' ? ', ' : ''}
                      {feedbackStatusFilter !== 'all' ? feedbackStatusFilter : ''})
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkUpdate}
                  >
                    📧 Send Bulk Update
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportReport}
                  >
                    📊 Export Report
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Admin Settings</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Platform Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Auto-approve donations</label>
                      <p className="text-sm text-gray-500">Automatically approve donations from verified organizations</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email notifications</label>
                      <p className="text-sm text-gray-500">Receive email alerts for urgent donations</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">SMS notifications</label>
                      <p className="text-sm text-gray-500">Receive SMS alerts for critical issues</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                  </div>
                </div>
              </div>

              {/* Approval Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Donation expiry threshold (hours)
                    </label>
                    <input
                      type="number"
                      defaultValue="24"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#45A761] focus:border-[#45A761]"
                    />
                    <p className="text-sm text-gray-500 mt-1">Mark donations as urgent when expiring within this timeframe</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum pending time (days)
                    </label>
                    <input
                      type="number"
                      defaultValue="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#45A761] focus:border-[#45A761]"
                    />
                    <p className="text-sm text-gray-500 mt-1">Auto-reject donations pending longer than this period</p>
                  </div>
                </div>
              </div>

              {/* System Configuration */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform timezone
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#45A761] focus:border-[#45A761]" defaultValue="Africa/Cairo">
                      <optgroup label="🇪🇬 Egypt">
                        <option value="Africa/Cairo">Egypt Standard Time (EET) - Cairo</option>
                      </optgroup>
                      <optgroup label="🌍 Middle East & Africa">
                        <option value="Asia/Dubai">Gulf Standard Time (GST) - Dubai</option>
                        <option value="Asia/Riyadh">Arabia Standard Time (AST) - Riyadh</option>
                        <option value="Africa/Johannesburg">South Africa Standard Time (SAST)</option>
                        <option value="Asia/Jerusalem">Israel Standard Time (IST)</option>
                        <option value="Europe/Istanbul">Turkey Time (TRT) - Istanbul</option>
                      </optgroup>
                      <optgroup label="🌍 Europe">
                        <option value="Europe/London">Greenwich Mean Time (GMT) - London</option>
                        <option value="Europe/Paris">Central European Time (CET) - Paris</option>
                        <option value="Europe/Berlin">Central European Time (CET) - Berlin</option>
                        <option value="Europe/Rome">Central European Time (CET) - Rome</option>
                        <option value="Europe/Athens">Eastern European Time (EET) - Athens</option>
                      </optgroup>
                      <optgroup label="🌎 Americas">
                        <option value="America/New_York">Eastern Standard Time (EST) - New York</option>
                        <option value="America/Chicago">Central Standard Time (CST) - Chicago</option>
                        <option value="America/Denver">Mountain Standard Time (MST) - Denver</option>
                        <option value="America/Los_Angeles">Pacific Standard Time (PST) - Los Angeles</option>
                        <option value="America/Toronto">Eastern Standard Time (EST) - Toronto</option>
                      </optgroup>
                      <optgroup label="🌏 Asia Pacific">
                        <option value="Asia/Tokyo">Japan Standard Time (JST) - Tokyo</option>
                        <option value="Asia/Shanghai">China Standard Time (CST) - Shanghai</option>
                        <option value="Asia/Kolkata">India Standard Time (IST) - Mumbai</option>
                        <option value="Asia/Singapore">Singapore Standard Time (SGT)</option>
                        <option value="Australia/Sydney">Australian Eastern Time (AET) - Sydney</option>
                      </optgroup>
                      <optgroup label="🌐 Universal">
                        <option value="UTC">Coordinated Universal Time (UTC)</option>
                      </optgroup>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      Current time in Egypt: {new Date().toLocaleString('en-US', {
                        timeZone: 'Africa/Cairo',
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                      })}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default language
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#45A761] focus:border-[#45A761]">
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Two-factor authentication</label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Session timeout</label>
                      <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
                    </div>
                    <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="480">8 hours</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Change password</label>
                      <p className="text-sm text-gray-500">Update your admin password</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#45A761] hover:bg-[#3a8f52] text-white"
                onClick={handleSettingsSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Reply to Feedback</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseReplyModal}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {/* Original Feedback */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {selectedFeedback.userEmail.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{selectedFeedback.userEmail}</div>
                    <div className="text-xs text-gray-500">{selectedFeedback.submittedOn}</div>
                  </div>
                  <div className="ml-auto">
                    <Badge
                      variant="outline"
                      className={
                        selectedFeedback.type === 'bug' ? 'border-red-300 text-red-600' :
                        selectedFeedback.type === 'feature' ? 'border-blue-300 text-blue-600' :
                        'border-gray-300 text-gray-600'
                      }
                    >
                      {selectedFeedback.type === 'bug' ? '🐛 Bug Report' :
                       selectedFeedback.type === 'feature' ? '💡 Feature Request' :
                       '💬 General Feedback'}
                    </Badge>
                  </div>
                </div>

                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">{selectedFeedback.subject}</h4>
                </div>

                <div className="text-sm text-gray-700 bg-white p-3 rounded border">
                  {selectedFeedback.message}
                </div>

                <div className="mt-2 flex items-center space-x-2">
                  <Badge
                    variant={selectedFeedback.priority === 'high' ? 'destructive' : 'secondary'}
                    className={
                      selectedFeedback.priority === 'high' ? 'bg-red-100 text-red-800' :
                      selectedFeedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }
                  >
                    {selectedFeedback.priority.charAt(0).toUpperCase() + selectedFeedback.priority.slice(1)} Priority
                  </Badge>
                  <Badge
                    variant={selectedFeedback.status === 'resolved' ? 'default' : 'secondary'}
                    className={
                      selectedFeedback.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {selectedFeedback.status === 'resolved' ? '✅ Resolved' : '⏳ Unresolved'}
                  </Badge>
                </div>
              </div>

              {/* Reply Form */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Reply
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#45A761] focus:border-[#45A761] resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This reply will be sent to {selectedFeedback.userEmail}
                </p>
              </div>

              {/* Quick Reply Templates */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Reply Templates
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyMessage("Thank you for your feedback. We're looking into this issue and will get back to you soon.")}
                  >
                    📝 Standard Response
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyMessage("We've identified the issue and our development team is working on a fix. We'll notify you once it's resolved.")}
                  >
                    🔧 Bug Fix Response
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyMessage("Thank you for the feature suggestion! We've added it to our product roadmap for consideration.")}
                  >
                    💡 Feature Response
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyMessage("Could you please provide more details about this issue? Additional information would help us resolve it faster.")}
                  >
                    ❓ Request More Info
                  </Button>
                </div>
              </div>

              {/* Additional Options */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Mark as resolved after sending</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Send copy to admin email</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Add to internal notes</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handleCloseReplyModal}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#45A761] hover:bg-[#3a8f52] text-white"
                onClick={handleSendReply}
              >
                📩 Send Reply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Update Modal */}
      {showBulkUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Send Bulk Update</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseBulkUpdateModal}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {/* Target Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Send update to:
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bulkUpdateType"
                      value="unresolved"
                      checked={bulkUpdateType === 'unresolved'}
                      onChange={(e) => setBulkUpdateType(e.target.value as any)}
                      className="mr-3 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      Users with unresolved issues ({feedbackItems.filter(item => item.status === 'unresolved').length} users)
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bulkUpdateType"
                      value="resolved"
                      checked={bulkUpdateType === 'resolved'}
                      onChange={(e) => setBulkUpdateType(e.target.value as any)}
                      className="mr-3 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      Users with resolved issues ({feedbackItems.filter(item => item.status === 'resolved').length} users)
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bulkUpdateType"
                      value="all"
                      checked={bulkUpdateType === 'all'}
                      onChange={(e) => setBulkUpdateType(e.target.value as any)}
                      className="mr-3 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      All users who submitted feedback ({feedbackItems.length} users)
                    </span>
                  </label>
                </div>
              </div>

              {/* Recipients Preview */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Recipients Preview:</h4>
                <div className="text-sm text-gray-700">
                  {feedbackItems
                    .filter(item => {
                      if (bulkUpdateType === 'all') return true
                      if (bulkUpdateType === 'unresolved') return item.status === 'unresolved'
                      if (bulkUpdateType === 'resolved') return item.status === 'resolved'
                      return false
                    })
                    .map(item => item.userEmail)
                    .join(', ')}
                </div>
              </div>

              {/* Message Composition */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Message
                </label>
                <textarea
                  value={bulkUpdateMessage}
                  onChange={(e) => setBulkUpdateMessage(e.target.value)}
                  placeholder="Type your bulk update message here..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#45A761] focus:border-[#45A761] resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This message will be sent to all selected recipients
                </p>
              </div>

              {/* Quick Templates */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Templates
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBulkUpdateMessage("We've released a new update that addresses several reported issues. Please update your app to the latest version.")}
                  >
                    📱 App Update
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBulkUpdateMessage("Thank you for your patience. We've resolved the reported issues and the platform is now running smoothly.")}
                  >
                    ✅ Issues Resolved
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBulkUpdateMessage("We're currently experiencing some technical difficulties. Our team is working to resolve them as quickly as possible.")}
                  >
                    ⚠️ Technical Issues
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBulkUpdateMessage("We've added new features based on your feedback! Check out the latest improvements in the app.")}
                  >
                    🎉 New Features
                  </Button>
                </div>
              </div>

              {/* Additional Options */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Options</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Send copy to admin email</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Schedule for later delivery</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Track email open rates</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handleCloseBulkUpdateModal}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#45A761] hover:bg-[#3a8f52] text-white"
                onClick={handleSendBulkUpdate}
              >
                📧 Send Bulk Update
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Export Feedback Report</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseExportModal}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {/* Export Format Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    exportFormat === 'csv' ? 'border-[#45A761] bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="exportFormat"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="mr-3 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">📊 CSV Format</div>
                      <div className="text-xs text-gray-500">Excel/Sheets compatible</div>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    exportFormat === 'pdf' ? 'border-[#45A761] bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="exportFormat"
                      value="pdf"
                      checked={exportFormat === 'pdf'}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="mr-3 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">📄 PDF Format</div>
                      <div className="text-xs text-gray-500">Formatted document</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Filter Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Date Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select
                    value={exportDateRange}
                    onChange={(e) => setExportDateRange(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#45A761] focus:border-[#45A761]"
                  >
                    <option value="all">All Time</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={exportStatus}
                    onChange={(e) => setExportStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#45A761] focus:border-[#45A761]"
                  >
                    <option value="all">All Status</option>
                    <option value="unresolved">Unresolved Only</option>
                    <option value="resolved">Resolved Only</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={exportType}
                    onChange={(e) => setExportType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#45A761] focus:border-[#45A761]"
                  >
                    <option value="all">All Types</option>
                    <option value="bug">Bug Reports</option>
                    <option value="feature">Feature Requests</option>
                    <option value="general">General Feedback</option>
                  </select>
                </div>
              </div>

              {/* Preview */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Export Preview</h4>
                <div className="text-sm text-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>Items to export:</strong> {getFilteredFeedbackItems().length}</p>
                      <p><strong>Format:</strong> {exportFormat.toUpperCase()}</p>
                    </div>
                    <div>
                      <p><strong>Date range:</strong> {
                        exportDateRange === 'all' ? 'All time' :
                        exportDateRange === '7days' ? 'Last 7 days' :
                        exportDateRange === '30days' ? 'Last 30 days' :
                        'Last 90 days'
                      }</p>
                      <p><strong>Filters:</strong> {exportStatus === 'all' ? 'All status' : exportStatus}, {exportType === 'all' ? 'All types' : exportType}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Export Options</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Include summary statistics</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Include user email addresses</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Include full message content</span>
                  </label>
                  {exportFormat === 'pdf' && (
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2 h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded" />
                      <span className="text-sm text-gray-700">Include visual formatting and badges</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Format-specific info */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {exportFormat === 'csv' ? '📊 CSV Export Info' : '📄 PDF Export Info'}
                </h4>
                <div className="text-sm text-gray-600">
                  {exportFormat === 'csv' ? (
                    <ul className="space-y-1">
                      <li>• Compatible with Excel, Google Sheets, and other spreadsheet applications</li>
                      <li>• Data can be easily sorted, filtered, and analyzed</li>
                      <li>• Perfect for creating charts and pivot tables</li>
                    </ul>
                  ) : (
                    <ul className="space-y-1">
                      <li>• Formatted document with visual styling and badges</li>
                      <li>• Includes summary statistics and professional layout</li>
                      <li>• Perfect for sharing with stakeholders and presentations</li>
                      <li>• Note: Downloads as HTML file (can be printed to PDF)</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handleCloseExportModal}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#45A761] hover:bg-[#3a8f52] text-white"
                onClick={handleConfirmExport}
                disabled={getFilteredFeedbackItems().length === 0}
              >
                {exportFormat === 'csv' ? '📊 Export CSV' : '📄 Export PDF'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
