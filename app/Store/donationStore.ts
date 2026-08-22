import { create } from 'zustand';
import { Donation, DonationStats, FoodDonation } from '@/Types';
import { supabase } from '@/lib/supabase';

interface DonationState {
  donations: Donation[];
  isLoading: boolean;
  stats: DonationStats;
  fetchDonations: (userId: string, userRole?: string) => Promise<void>;
  makeDonation: (donation: Partial<Donation>) => Promise<void>;
  updateDonationStatus: (donationId: string, status: 'pending' | 'fulfilled' | 'cancelled') => Promise<void>;
  getDonationStats: (userId: string) => DonationStats;
}

export const useDonationStore = create<DonationState>((set, get) => ({
  donations: [],
  isLoading: false,
  stats: {
    totalReceived: 0,
    totalGiven: 0,
    pendingCount: 0,
    fulfilledCount: 0,
    cancelledCount: 0
  },

  fetchDonations: async (userId, userRole) => {
    set({ isLoading: true });

    try {
      console.log('Fetching donations for userId:', userId, 'userRole:', userRole);

      // Validate userId is a proper UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(userId)) {
        throw new Error(`Invalid userId format: ${userId}`);
      }
      // Fetch money donations from Supabase
      let query = supabase
        .from('money_donations')
        .select(`
          *,
          donor:users!money_donations_donor_id_fkey(name),
          recipient:users!money_donations_recipient_id_fkey(name)
        `);

      if (['charity', 'shelter', 'factory', 'supermarket', 'hotel', 'restaurant'].includes(userRole || '')) {
        // For organization users: show only admin-approved donations received by their organization
        query = query.eq('recipient_id', userId).eq('admin_approved', true);
      } else {
        // For donor users: show all donations where they are donor or recipient
        query = query.or(`donor_id.eq.${userId},recipient_id.eq.${userId}`);
      }

      const { data: moneyDonations, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Format the data to match our Donation interface
      const formattedDonations: Donation[] = (moneyDonations || []).map(donation => ({
        id: donation.id,
        amount: parseFloat(donation.amount),
        donorId: donation.donor_id,
        donorName: donation.donor?.name || 'Anonymous',
        recipientId: donation.recipient_id,
        recipientName: donation.recipient?.name || 'Unknown',
        type: 'money' as const,
        anonymous: donation.anonymous,
        createdAt: donation.created_at,
        status: donation.status as 'pending' | 'fulfilled' | 'cancelled',
      }));

      set({
        donations: formattedDonations,
        isLoading: false
      });

      // Update stats
      get().getDonationStats(userId);
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching donations:', error);
    }
  },

  makeDonation: async (donationData) => {
    set({ isLoading: true });

    try {
      // Only handle money donations in this store
      if (donationData.type === 'money' && donationData.amount) {
        const { data: newDonation, error } = await supabase
          .from('money_donations')
          .insert({
            amount: donationData.amount,
            donor_id: donationData.donorId || '',
            recipient_id: donationData.recipientId || '',
            anonymous: donationData.anonymous || false,
            status: 'pending',
            transaction_method: 'app_transfer'
          })
          .select(`
            *,
            donor:users!money_donations_donor_id_fkey(name),
            recipient:users!money_donations_recipient_id_fkey(name)
          `)
          .single();

        if (error) {
          throw error;
        }

        const formattedDonation: Donation = {
          id: newDonation.id,
          amount: parseFloat(newDonation.amount),
          donorId: newDonation.donor_id,
          donorName: newDonation.donor?.name || 'Anonymous',
          recipientId: newDonation.recipient_id,
          recipientName: newDonation.recipient?.name || 'Unknown',
          type: 'money' as const,
          anonymous: newDonation.anonymous,
          createdAt: newDonation.created_at,
          status: newDonation.status as 'pending' | 'fulfilled' | 'cancelled',
        };

        set(state => ({
          donations: [formattedDonation, ...state.donations],
          isLoading: false
        }));

        // Update stats
        get().getDonationStats(donationData.donorId || '');
      } else {
        set({ isLoading: false });
        throw new Error('Invalid donation data for money donation');
      }
    } catch (error) {
      set({ isLoading: false });
      console.error('Error making donation:', error);
      throw error;
    }
  },

  updateDonationStatus: async (donationId, status) => {
    set({ isLoading: true });

    try {
      const { error } = await supabase
        .from('money_donations')
        .update({ status })
        .eq('id', donationId);

      if (error) {
        throw error;
      }

      set(state => ({
        donations: state.donations.map(d =>
          d.id === donationId ? { ...d, status } : d
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error('Error updating donation status:', error);
      throw error;
    }
  },

  getDonationStats: (userId) => {
    const { donations } = get();

    const given = donations.filter(d => d.donorId === userId);
    const received = donations.filter(d => d.recipientId === userId);

    const totalGiven = given.reduce((sum, d) => sum + (d.amount || 0), 0);
    const totalReceived = received.reduce((sum, d) => sum + (d.amount || 0), 0);

    const pendingCount = donations.filter(d =>
      (d.donorId === userId || d.recipientId === userId) && d.status === 'pending'
    ).length;

    const fulfilledCount = donations.filter(d =>
      (d.donorId === userId || d.recipientId === userId) && d.status === 'fulfilled'
    ).length;

    const cancelledCount = donations.filter(d =>
      (d.donorId === userId || d.recipientId === userId) && d.status === 'cancelled'
    ).length;

    const stats = {
      totalGiven,
      totalReceived,
      pendingCount,
      fulfilledCount,
      cancelledCount
    };

    set({ stats });

    return stats;
  }
}));