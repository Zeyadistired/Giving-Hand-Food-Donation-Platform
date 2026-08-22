import { create } from 'zustand';
import { Organization, UserRole } from '@/Types';
import { supabase } from '@/lib/supabase';

interface OrganizationState {
  organizations: Organization[];
  isLoading: boolean;
  fetchOrganizations: () => Promise<void>;
  getOrganizationById: (id: string) => Organization | undefined;
}

export const useOrganizationStore = create<OrganizationState>((set, get) => ({
  organizations: [],
  isLoading: false,

  fetchOrganizations: async () => {
    set({ isLoading: true });

    try {
      const { data: organizations, error } = await supabase
        .from('users')
        .select('*')
        .in('role', ['charity', 'shelter', 'factory', 'supermarket', 'hotel', 'restaurant'])
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const formattedOrgs: Organization[] = organizations.map(org => ({
        id: org.id,
        name: org.name,
        email: org.email,
        phone: org.phone,
        location: org.location,
        role: org.role as UserRole,
        approved: org.approved,
        createdAt: org.created_at,
        profileImage: org.profile_image || 'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070',
        description: org.description || '',
      }));

      set({
        organizations: formattedOrgs,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching organizations:', error);
    }
  },

  getOrganizationById: (id) => {
    return get().organizations.find(org => org.id === id);
  }
}));