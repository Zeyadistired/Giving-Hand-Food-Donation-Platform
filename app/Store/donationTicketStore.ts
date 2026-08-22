import { create } from 'zustand';
import { DonationTicket } from '@/Types';
import { supabase } from '@/lib/supabase';

interface DonationTicketState {
  tickets: DonationTicket[];
  isLoading: boolean;
  fetchTickets: (userId: string) => Promise<void>;
  fetchTicketById: (ticketId: string) => Promise<DonationTicket | null>;
  testRPCFunction: () => Promise<void>;
  fetchPendingAdminTickets: () => Promise<DonationTicket[]>;
  acceptTicket: (ticketId: string, userId: string) => Promise<void>;
  rejectTicket: (ticketId: string) => Promise<void>;
  createTicket: (ticketData: Partial<DonationTicket>) => Promise<void>;
}


export const useDonationTicketStore = create<DonationTicketState>((set, get) => ({
  tickets: [],
  isLoading: false,

  fetchTickets: async (userId) => {
    console.log('DonationTicketStore: Fetching tickets for user:', userId);
    set({ isLoading: true });

    try {
      // For charity/shelter/factory users: show only admin-approved tickets that are available
      // Use RPC to join with food_donations based on title pattern matching
      const { data: tickets, error } = await supabase.rpc('get_available_food_tickets');

      if (error) {
        console.error('DonationTicketStore: Supabase error:', error);
        throw error;
      }

      console.log('DonationTicketStore: Raw tickets from database:', tickets?.length || 0);

      const formattedTickets: DonationTicket[] = (tickets || []).map(ticket => {
        // Extract storage requirements from food notes
        const storageTemp = ticket.food_notes?.toLowerCase().includes('frozen') ? 'frozen' :
                           ticket.food_notes?.toLowerCase().includes('refrigerated') ? 'refrigerated' : 'room_temp';

        // Parse quantity and weight properly
        const quantity = parseFloat(ticket.food_quantity || '0');
        const weight = parseFloat(ticket.weight || ticket.food_quantity || '0');

        return {
          id: ticket.id,
          title: ticket.title, // Keep original title from donation_tickets
          description: ticket.description || '', // Use description from donation_tickets
          expiryDate: ticket.food_expiry_date || ticket.expiry_date || '',
          deliveryMethod: ticket.delivery_method,
          organizationName: ticket.organization_name || 'Unknown',
          organizationId: ticket.organization_id || '',
          status: ticket.status as 'pending' | 'accepted' | 'rejected',
          createdAt: ticket.created_at || '',
          weight: weight,
          itemCount: Math.round(quantity), // Use food quantity as item count
          needsFreezing: storageTemp === 'frozen',
          storageTemperature: storageTemp as 'frozen' | 'refrigerated' | 'room_temp',
          items: ticket.food_type ? [`${ticket.food_type} (${ticket.food_quantity} ${ticket.food_unit})`] : (ticket.items || []),
          pickupAddress: ticket.pickup_address,
          deliveryAddress: ticket.delivery_address,
          contactPerson: ticket.contact_person || '',
          contactPhone: ticket.contact_phone || '',
          specialInstructions: ticket.special_instructions || ticket.food_notes,
          datePlaced: ticket.date_placed || ticket.created_at || '',
          donorContactInfo: `${ticket.contact_person || ''} - ${ticket.contact_phone || ''}`,
          donorId: ticket.organization_id || '',
          recipientId: ticket.recipient_id,
        };
      });

      console.log('DonationTicketStore: Formatted tickets:', formattedTickets.length);

      set({
        tickets: formattedTickets,
        isLoading: false
      });
    } catch (error) {
      console.error('DonationTicketStore: Error fetching tickets:', error);
      set({ isLoading: false });
    }
  },

  fetchTicketById: async (ticketId) => {
    console.log('=== DonationTicketStore: fetchTicketById START ===');
    console.log('DonationTicketStore: Fetching single ticket:', ticketId);
    console.log('DonationTicketStore: Supabase client exists:', !!supabase);

    try {
      console.log('DonationTicketStore: About to call RPC get_food_ticket_by_id...');
      // Use specific RPC to get single ticket with food details by ID
      const { data: ticketResults, error } = await supabase.rpc('get_food_ticket_by_id', { ticket_id: ticketId });

      console.log('DonationTicketStore: RPC call completed');
      console.log('DonationTicketStore: Error:', error);
      console.log('DonationTicketStore: Results length:', ticketResults?.length || 0);

      if (error) {
        console.error('DonationTicketStore: Error fetching ticket by ID:', JSON.stringify(error, null, 2));
        throw error;
      }

      // Get the first (and should be only) result
      const ticketData = ticketResults?.[0];

      if (!ticketData) {
        console.log('DonationTicketStore: Ticket not found with ID:', ticketId);
        return null;
      }

      console.log('DonationTicketStore: Raw ticket data from RPC:', JSON.stringify(ticketData, null, 2));

      // Format the ticket data
      console.log('DonationTicketStore: Starting data transformation...');
      console.log('DonationTicketStore: food_notes:', ticketData.food_notes);
      console.log('DonationTicketStore: food_quantity:', ticketData.food_quantity);
      console.log('DonationTicketStore: weight:', ticketData.weight);

      const storageTemp = ticketData.food_notes?.toLowerCase().includes('frozen') ? 'frozen' :
                         ticketData.food_notes?.toLowerCase().includes('refrigerated') ? 'refrigerated' : 'room_temp';

      // Parse quantity and weight properly
      const quantity = parseFloat(ticketData.food_quantity || '0');
      const weight = parseFloat(ticketData.weight || ticketData.food_quantity || '0');

      console.log('DonationTicketStore: Calculated storageTemp:', storageTemp);
      console.log('DonationTicketStore: Calculated quantity:', quantity);
      console.log('DonationTicketStore: Calculated weight:', weight);

      const formattedTicket: DonationTicket = {
        id: ticketData.id,
        title: ticketData.title, // Keep original title from donation_tickets
        description: ticketData.description || '', // Use description from donation_tickets
        expiryDate: ticketData.food_expiry_date || ticketData.expiry_date || '',
        deliveryMethod: ticketData.delivery_method,
        organizationName: ticketData.organization_name || 'Unknown',
        organizationId: ticketData.organization_id || '',
        status: ticketData.status as 'pending' | 'accepted' | 'rejected',
        createdAt: ticketData.created_at || '',
        weight: weight,
        itemCount: Math.round(quantity), // Use food quantity as item count
        needsFreezing: storageTemp === 'frozen',
        storageTemperature: storageTemp as 'frozen' | 'refrigerated' | 'room_temp',
        items: ticketData.food_type ? [`${ticketData.food_type} (${ticketData.food_quantity} ${ticketData.food_unit})`] : (ticketData.items || []),
        pickupAddress: ticketData.pickup_address,
        deliveryAddress: ticketData.delivery_address,
        contactPerson: ticketData.contact_person || '',
        contactPhone: ticketData.contact_phone || '',
        specialInstructions: ticketData.special_instructions || ticketData.food_notes,
        datePlaced: ticketData.date_placed || ticketData.created_at || '',
        donorContactInfo: `${ticketData.contact_person || ''} - ${ticketData.contact_phone || ''}`,
        donorId: ticketData.organization_id || '',
        recipientId: ticketData.recipient_id,
      };

      console.log('DonationTicketStore: Final formatted ticket:');
      console.log('  - Title:', formattedTicket.title);
      console.log('  - Weight:', formattedTicket.weight);
      console.log('  - ItemCount:', formattedTicket.itemCount);
      console.log('  - StorageTemperature:', formattedTicket.storageTemperature);
      console.log('  - DeliveryMethod:', formattedTicket.deliveryMethod);
      console.log('DonationTicketStore: Returning formatted ticket');
      console.log('=== DonationTicketStore: fetchTicketById END ===');
      return formattedTicket;
    } catch (error) {
      console.error('DonationTicketStore: Error fetching ticket by ID:', error);
      return null;
    }
  },

  testRPCFunction: async () => {
    console.log('=== DonationTicketStore: Testing RPC function START ===');
    console.log('DonationTicketStore: Supabase client exists:', !!supabase);

    try {
      console.log('DonationTicketStore: About to call RPC...');
      const { data: result, error } = await supabase.rpc('get_food_ticket_by_id', {
        ticket_id: 'e6c47489-0b53-455e-bbcb-b3eb85dee73c'
      });

      console.log('DonationTicketStore: RPC call completed');
      console.log('DonationTicketStore: Error:', error);
      console.log('DonationTicketStore: Data:', result);

      if (error) {
        console.error('DonationTicketStore: RPC Test Error:', JSON.stringify(error, null, 2));
        alert('RPC Error: ' + JSON.stringify(error));
      } else {
        console.log('DonationTicketStore: RPC Test Success:', JSON.stringify(result, null, 2));
        alert('RPC Success! Check console for details. Data length: ' + (result?.length || 0));
      }
    } catch (error) {
      console.error('DonationTicketStore: RPC Test Exception:', error);
      alert('RPC Exception: ' + error.message);
    }
    console.log('=== DonationTicketStore: Testing RPC function END ===');
  },

  fetchPendingAdminTickets: async () => {
    try {
      // Fetch tickets that need admin approval
      const { data: tickets, error } = await supabase
        .from('donation_tickets')
        .select(`
          *,
          organization:users!donation_tickets_organization_id_fkey(name)
        `)
        .eq('admin_approved', false)
        .in('status', ['pending', 'approved'])
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const formattedTickets: DonationTicket[] = tickets.map(ticket => ({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description || '',
        expiryDate: ticket.expiry_date || '',
        deliveryMethod: ticket.delivery_method,
        organizationName: ticket.organization?.name || ticket.organization_name || 'Unknown',
        organizationId: ticket.organization_id || '',
        status: ticket.status as 'pending' | 'accepted' | 'rejected',
        createdAt: ticket.created_at || '',
        weight: parseFloat(ticket.weight || '0'),
        itemCount: ticket.item_count || 0,
        needsFreezing: ticket.needs_freezing || false,
        items: ticket.items || [],
        pickupAddress: ticket.pickup_address,
        deliveryAddress: ticket.delivery_address,
        contactPerson: ticket.contact_person || '',
        contactPhone: ticket.contact_phone || '',
        specialInstructions: ticket.special_instructions,
        datePlaced: ticket.date_placed || ticket.created_at || '',
        donorContactInfo: `${ticket.contact_person || ''} - ${ticket.contact_phone || ''}`,
        donorId: ticket.organization_id || '',
        recipientId: ticket.recipient_id,
      }));

      return formattedTickets;
    } catch (error) {
      console.error('Error fetching pending admin tickets:', error);
      return [];
    }
  },

  acceptTicket: async (ticketId, userId) => {
    set({ isLoading: true });

    try {
      const { error } = await supabase
        .from('donation_tickets')
        .update({
          status: 'accepted',
          recipient_id: userId
        })
        .eq('id', ticketId);

      if (error) {
        throw error;
      }

      set(state => ({
        tickets: state.tickets.filter(ticket => ticket.id !== ticketId), // Remove accepted tickets from the list
        isLoading: false
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error('Error accepting donation ticket:', error);
      throw error;
    }
  },

  rejectTicket: async (ticketId) => {
    set({ isLoading: true });

    try {
      const { error } = await supabase
        .from('donation_tickets')
        .update({ status: 'rejected' })
        .eq('id', ticketId);

      if (error) {
        throw error;
      }

      set(state => ({
        tickets: state.tickets.filter(ticket => ticket.id !== ticketId), // Remove rejected tickets from the list
        isLoading: false
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error('Error rejecting donation ticket:', error);
      throw error;
    }
  },

  createTicket: async (ticketData) => {
    set({ isLoading: true });

    try {
      const { data: newTicket, error } = await supabase
        .from('donation_tickets')
        .insert({
          title: ticketData.title || '',
          description: ticketData.description || '',
          expiry_date: ticketData.expiryDate || '',
          weight: ticketData.weight || 0,
          item_count: ticketData.itemCount || 0,
          needs_freezing: ticketData.needsFreezing || false,
          delivery_method: ticketData.deliveryMethod || 'pickup',
          organization_id: ticketData.organizationId || '',
          organization_name: ticketData.organizationName || '',
          items: ticketData.items || [],
          pickup_address: ticketData.pickupAddress,
          delivery_address: ticketData.deliveryAddress,
          contact_person: ticketData.contactPerson || '',
          contact_phone: ticketData.contactPhone || '',
          special_instructions: ticketData.specialInstructions,
          status: 'pending',
          admin_approved: false,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error creating donation ticket:', error);
      throw error;
    }
  },
}));
