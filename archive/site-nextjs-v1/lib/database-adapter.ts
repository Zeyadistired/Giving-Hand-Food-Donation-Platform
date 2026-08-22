import { supabaseAdmin } from './supabase'
import type { User, Donation, FoodDonation, DonationTicket, LegacyUser, LegacyFoodDonation } from './supabase'

/**
 * Database adapter to bridge between legacy code expectations and actual database schema
 */

// User management functions
export async function createUser(userData: {
  id: string
  email: string
  fullName: string
  organizationName: string
  organizationType: string
  phone: string
}): Promise<User> {
  // Map legacy user data to actual database schema
  const mappedData: Partial<User> = {
    id: userData.id,
    auth_id: userData.id,
    name: userData.fullName,
    email: userData.email,
    phone: userData.phone,
    // Map organization type to role
    role: mapOrganizationTypeToRole(userData.organizationType),
    approved: false, // Start as not approved
    description: `${userData.organizationType}: ${userData.organizationName}`,
  }

  const { data, error } = await supabaseAdmin
    .from('users')
    .insert(mappedData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    throw error
  }
  return data
}

export async function getUserByAuthId(authId: string): Promise<User | null> {
  // First try to find user by auth_id
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('auth_id', authId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // User not found by auth_id, try to find by matching id (for legacy users)
      const { data: legacyData, error: legacyError } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', authId)
        .single()

      if (legacyError) {
        if (legacyError.code === 'PGRST116') {
          // Still not found, try to find by email from auth.users
          return await findUserByAuthEmail(authId)
        }
        throw legacyError
      }

      // If found by id but auth_id is null, update the auth_id
      if (legacyData && !legacyData.auth_id) {
        const { data: updatedData, error: updateError } = await supabaseAdmin
          .from('users')
          .update({ auth_id: authId, updated_at: new Date().toISOString() })
          .eq('id', authId)
          .select()
          .single()

        if (updateError) {
          console.error('Error updating auth_id:', updateError)
          return legacyData // Return the original data even if update fails
        }
        return updatedData
      }

      return legacyData
    }
    throw error
  }

  return data
}

// Helper function to find user by email when auth_id lookup fails
async function findUserByAuthEmail(authId: string): Promise<User | null> {
  try {
    // Get the email from auth.users
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(authId)

    if (authError || !authUser.user) {
      return null
    }

    // Find user in public.users by email (case-insensitive)
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .ilike('email', authUser.user.email)
      .single()

    if (userError) {
      if (userError.code === 'PGRST116') return null // Not found
      throw userError
    }

    // Update the user's auth_id to link them properly
    if (userData && !userData.auth_id) {
      const { data: updatedData, error: updateError } = await supabaseAdmin
        .from('users')
        .update({ auth_id: authId, updated_at: new Date().toISOString() })
        .eq('id', userData.id)
        .select()
        .single()

      if (updateError) {
        console.error('Error updating auth_id for user found by email:', updateError)
        return userData // Return the original data even if update fails
      }
      return updatedData
    }

    return userData
  } catch (error) {
    console.error('Error in findUserByAuthEmail:', error)
    return null
  }
}

export async function updateUserApprovalStatus(userId: string, approved: boolean): Promise<User> {
  // First get the current user data
  const currentUser = await getUserById(userId)
  if (!currentUser) {
    throw new Error('User not found')
  }

  // If approving a user and they don't have an auth_id, try to find existing auth user by email
  if (approved && !currentUser.auth_id) {
    try {
      // Check if there's already an auth user with this email
      const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers()

      if (!listError && existingUsers) {
        const existingAuthUser = existingUsers.users.find(user =>
          user.email.toLowerCase() === currentUser.email.toLowerCase()
        )

        if (existingAuthUser) {
          // Link the existing auth user to this profile
          const { data, error } = await supabaseAdmin
            .from('users')
            .update({
              approved,
              auth_id: existingAuthUser.id,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId)
            .select()
            .single()

          if (error) throw error

          console.log(`Linked existing auth user ${existingAuthUser.id} to profile ${userId}`)
          return data
        } else {
          console.log(`No existing auth user found for email ${currentUser.email}. User will need to sign up.`)
        }
      }
    } catch (linkError) {
      console.error('Failed to link existing auth account:', linkError)
      // Continue with regular approval if linking fails
    }
  }

  // Regular approval update
  const { data, error } = await supabaseAdmin
    .from('users')
    .update({ approved, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Function to check and fix users without auth accounts
export async function getUsersNeedingAuthAccounts(): Promise<User[]> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .is('auth_id', null)
    .eq('approved', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Legacy user functions for backward compatibility
export function mapUserToLegacy(user: User): LegacyUser {
  // Determine status based on approval - keep it simple for legacy compatibility
  let status: 'pending' | 'approved' | 'rejected' = 'pending'
  if (user.approved) {
    status = 'approved'
  }

  return {
    id: user.id,
    email: user.email,
    full_name: user.name,
    organization_name: extractOrganizationName(user.description || ''),
    organization_type: mapRoleToOrganizationType(user.role),
    role: user.role, // Include the actual role from database
    phone: user.phone || '',
    status: status,
    created_at: user.created_at || new Date().toISOString(),
    updated_at: user.updated_at || new Date().toISOString(),
  }
}

// Donation management functions
export async function createDonation(donationData: {
  donorId: string
  donorName: string
  recipientName: string
  type: 'money' | 'food'
  amount?: number
  anonymous?: boolean
}): Promise<Donation> {
  const { data, error } = await supabaseAdmin
    .from('donations')
    .insert({
      donor_id: donationData.donorId,
      donor_name: donationData.donorName,
      recipient_name: donationData.recipientName,
      type: donationData.type,
      amount: donationData.amount,
      anonymous: donationData.anonymous || false,
      status: 'pending',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createFoodDonation(foodData: {
  donationId?: string
  name: string
  quantity: number
  unit: string
  expiryDate?: string
  foodType?: string
  notes?: string
}): Promise<FoodDonation> {
  const { data, error } = await supabaseAdmin
    .from('food_donations')
    .insert({
      donation_id: foodData.donationId,
      name: foodData.name,
      quantity: foodData.quantity,
      unit: foodData.unit,
      expiry_date: foodData.expiryDate,
      food_type: foodData.foodType,
      notes: foodData.notes,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createDonationTicket(ticketData: {
  title: string
  description?: string
  expiryDate?: string
  deliveryMethod: 'pickup' | 'delivery'
  organizationName: string
  organizationId?: string
  weight?: number
  itemCount?: number
  needsFreezing?: boolean
  items?: string[]
  pickupAddress?: string
  deliveryAddress?: string
  contactPerson?: string
  contactPhone?: string
  specialInstructions?: string
}): Promise<DonationTicket> {
  const { data, error } = await supabaseAdmin
    .from('donation_tickets')
    .insert({
      title: ticketData.title,
      description: ticketData.description,
      expiry_date: ticketData.expiryDate,
      delivery_method: ticketData.deliveryMethod,
      organization_name: ticketData.organizationName,
      organization_id: ticketData.organizationId,
      weight: ticketData.weight,
      item_count: ticketData.itemCount,
      needs_freezing: ticketData.needsFreezing,
      items: ticketData.items,
      pickup_address: ticketData.pickupAddress,
      delivery_address: ticketData.deliveryAddress,
      contact_person: ticketData.contactPerson,
      contact_phone: ticketData.contactPhone,
      special_instructions: ticketData.specialInstructions,
      status: 'pending',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Helper functions
function mapOrganizationTypeToRole(orgType: string): 'donor' | 'charity' | 'shelter' | 'factory' | 'supermarket' | 'restaurant' | 'hotel' {
  switch (orgType.toLowerCase()) {
    case 'supermarket':
      return 'supermarket'
    case 'restaurant':
      return 'restaurant'
    case 'hotel':
      return 'hotel'
    case 'charity':
      return 'charity'
    case 'shelter':
      return 'shelter'
    case 'factory':
      return 'factory'
    default:
      return 'donor'
  }
}

function mapRoleToOrganizationType(role: string): 'supermarket' | 'restaurant' | 'hotel' {
  // Direct mapping for new role types, legacy mapping for old ones
  switch (role) {
    case 'supermarket':
      return 'supermarket'
    case 'restaurant':
      return 'restaurant'
    case 'hotel':
      return 'hotel'
    // Legacy mappings for backward compatibility
    case 'donor':
      return 'restaurant'
    case 'charity':
      return 'restaurant'
    case 'shelter':
      return 'hotel'
    case 'factory':
      return 'supermarket'
    default:
      return 'restaurant'
  }
}

function extractOrganizationName(description: string): string {
  // Extract organization name from description field
  const match = description.match(/^[^:]+:\s*(.+)$/)
  return match ? match[1] : description || 'Unknown Organization'
}

// Statistics functions
export async function getWebsiteStats() {
  // Get total approved users
  const { count: totalOrganizations } = await supabaseAdmin
    .from('users')
    .select('id', { count: 'exact' })
    .eq('approved', true)

  // Get total donations
  const { count: totalDonations } = await supabaseAdmin
    .from('donations')
    .select('id', { count: 'exact' })

  // Get total food donations
  const { count: totalFoodDonations } = await supabaseAdmin
    .from('food_donations')
    .select('id', { count: 'exact' })

  // Get total donation tickets
  const { count: totalTickets } = await supabaseAdmin
    .from('donation_tickets')
    .select('id', { count: 'exact' })

  return {
    totalOrganizations: totalOrganizations || 0,
    totalDonations: totalDonations || 0,
    totalFoodDonations: totalFoodDonations || 0,
    totalTickets: totalTickets || 0,
  }
}
