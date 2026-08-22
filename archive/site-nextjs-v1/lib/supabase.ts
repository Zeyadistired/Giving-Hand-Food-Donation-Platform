import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for API routes)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Database types matching your existing Supabase schema
export interface User {
  id: string
  auth_id?: string
  name: string
  email: string
  phone?: string
  location?: string
  role: 'donor' | 'charity' | 'shelter' | 'factory' | 'supermarket' | 'restaurant' | 'hotel'
  approved?: boolean
  description?: string
  profile_image_url?: string
  created_at?: string
  updated_at?: string
}

export interface Donation {
  id: string
  donor_id?: string
  donor_name: string
  recipient_id?: string
  recipient_name: string
  type: 'money' | 'food'
  amount?: number
  anonymous?: boolean
  status?: 'pending' | 'fulfilled' | 'cancelled'
  created_at?: string
  updated_at?: string
}

export interface FoodDonation {
  id: string
  donation_id?: string
  name: string
  quantity: number
  unit: string
  expiry_date?: string
  food_type?: string
  notes?: string
  created_at?: string
}

export interface DonationTicket {
  id: string
  title: string
  description?: string
  expiry_date?: string
  delivery_method: 'pickup' | 'delivery'
  organization_id?: string
  organization_name: string
  status?: string
  weight?: number
  item_count?: number
  needs_freezing?: boolean
  items?: string[]
  pickup_address?: string
  delivery_address?: string
  contact_person?: string
  contact_phone?: string
  special_instructions?: string
  created_at?: string
  updated_at?: string
}

// Legacy interfaces for backward compatibility with existing code
export interface LegacyUser {
  id: string
  email: string
  full_name: string
  organization_name: string
  organization_type: 'supermarket' | 'restaurant' | 'hotel'
  role: 'donor' | 'charity' | 'shelter' | 'factory' | 'supermarket' | 'restaurant' | 'hotel'
  phone: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface LegacyFoodDonation {
  id: string
  user_id: string
  organization_name: string
  food_category: string
  description: string
  quantity: number
  packaging_type: string
  condition: string
  expiry_date: string
  availability_date: string
  delivery_method: 'delivery' | 'pickup'
  storage_requirements: string
  status: 'pending' | 'approved' | 'rejected'
  rejection_reason?: string
  created_at: string
  updated_at: string
}

export interface Feedback {
  id: string
  user_id?: string
  name: string
  email: string
  subject: string
  message: string
  priority: 'low' | 'medium' | 'high'
  status: 'unresolved' | 'in_progress' | 'resolved'
  created_at: string
  updated_at: string
}
