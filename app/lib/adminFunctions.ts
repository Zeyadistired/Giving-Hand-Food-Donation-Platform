import { supabase } from './supabase';

// Admin functions for managing donations and tickets
export class AdminFunctions {
  
  // Approve a money donation
  static async approveMoneyDonation(donationId: string, adminUserId: string) {
    try {
      const { data, error } = await supabase
        .from('money_donations')
        .update({
          admin_approved: true,
          admin_approved_at: new Date().toISOString(),
          admin_approved_by: adminUserId,
          status: 'fulfilled'
        })
        .eq('id', donationId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error approving money donation:', error);
      return { success: false, error };
    }
  }

  // Reject a money donation
  static async rejectMoneyDonation(donationId: string, adminUserId: string) {
    try {
      const { data, error } = await supabase
        .from('money_donations')
        .update({
          admin_approved: false,
          admin_approved_at: new Date().toISOString(),
          admin_approved_by: adminUserId,
          status: 'cancelled'
        })
        .eq('id', donationId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error rejecting money donation:', error);
      return { success: false, error };
    }
  }

  // Approve a food donation ticket
  static async approveFoodDonationTicket(ticketId: string, adminUserId: string) {
    try {
      const { data, error } = await supabase
        .from('donation_tickets')
        .update({
          admin_approved: true,
          admin_approved_at: new Date().toISOString(),
          admin_approved_by: adminUserId,
          status: 'approved'
        })
        .eq('id', ticketId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error approving food donation ticket:', error);
      return { success: false, error };
    }
  }

  // Reject a food donation ticket
  static async rejectFoodDonationTicket(ticketId: string, adminUserId: string) {
    try {
      const { data, error } = await supabase
        .from('donation_tickets')
        .update({
          admin_approved: false,
          admin_approved_at: new Date().toISOString(),
          admin_approved_by: adminUserId,
          status: 'rejected'
        })
        .eq('id', ticketId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error rejecting food donation ticket:', error);
      return { success: false, error };
    }
  }

  // Get all pending money donations for admin review
  static async getPendingMoneyDonations() {
    try {
      const { data, error } = await supabase
        .from('money_donations')
        .select(`
          *,
          donor:users!money_donations_donor_id_fkey(name, email),
          recipient:users!money_donations_recipient_id_fkey(name, email)
        `)
        .eq('admin_approved', false)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching pending money donations:', error);
      return { success: false, error };
    }
  }

  // Get all pending food donation tickets for admin review
  static async getPendingFoodDonationTickets() {
    try {
      const { data, error } = await supabase
        .from('donation_tickets')
        .select(`
          *,
          organization:users!donation_tickets_organization_id_fkey(name, email)
        `)
        .eq('admin_approved', false)
        .in('status', ['pending', 'approved'])
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching pending food donation tickets:', error);
      return { success: false, error };
    }
  }
}

// Test admin functions
export async function testAdminFunctions() {
  console.log('Testing admin functions...\n');

  // Test getting pending items
  const pendingMoney = await AdminFunctions.getPendingMoneyDonations();
  console.log('Pending money donations:', pendingMoney);

  const pendingTickets = await AdminFunctions.getPendingFoodDonationTickets();
  console.log('Pending food donation tickets:', pendingTickets);
}
