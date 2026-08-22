import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import { Filter } from 'lucide-react-native';
import { useFocusEffect } from 'expo-router';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';
import { useDonationStore } from '@/Store/donationStore';
import { useDonationTicketStore } from '@/Store/donationTicketStore';
import DonationCard from '@/Components/DonationCard';
import Card from '@/Components/Card';
import { Donation, DonationTicket, DonationType } from '@/Types';
import { supabase } from '@/lib/supabase';

export default function ActivityScreen() {
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const { donations, fetchDonations, isLoading } = useDonationStore();
  const [acceptedTickets, setAcceptedTickets] = useState<Donation[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'fulfilled' | 'cancelled'>('all');

  const isCharityOrShelter = user?.role === 'charity' || user?.role === 'shelter' || user?.role === 'factory';

  // Manual refresh function
  const handleRefresh = async () => {
    if (!user) return;

    setRefreshing(true);
    try {
      await Promise.all([
        fetchDonations(user.id, user.role),
        fetchAcceptedTickets()
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Function to fetch accepted donation tickets and convert them to Donation format
  const fetchAcceptedTickets = async () => {
    if (!user) return;

    setTicketsLoading(true);
    try {
      console.log('ActivityTab: Fetching accepted tickets for user:', user.id);

      const { data: tickets, error } = await supabase
        .from('donation_tickets')
        .select(`
          *,
          donor_org:users!donation_tickets_organization_id_fkey(name, id)
        `)
        .eq('recipient_id', user.id)
        .eq('status', 'accepted')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching accepted tickets:', error);
        return;
      }

      console.log('ActivityTab: Raw accepted tickets from DB:', tickets?.length || 0);

      // Convert tickets directly to Donation format for the activity tab
      const ticketsAsDonations: Donation[] = (tickets || []).map(ticket => {
        console.log('ActivityTab: Processing ticket:', ticket.id, ticket.title);

        return {
          id: ticket.id,
          amount: parseFloat(ticket.weight || '0'),
          donorId: ticket.organization_id || '',
          donorName: ticket.donor_org?.name || 'Unknown Organization',
          recipientId: user.id,
          recipientName: 'to you',
          type: 'food' as DonationType,
          anonymous: false,
          createdAt: ticket.created_at || '',
          status: 'fulfilled' as const,
          foodDetails: {
            name: ticket.title?.replace('Food Donation: ', '') || 'Food Donation',
            quantity: parseFloat(ticket.weight || '0'),
            unit: 'kg',
            expiryDate: ticket.expiry_date || '',
            foodType: ticket.title?.replace('Food Donation: ', '') || 'Food',
            notes: ticket.description || '',
          },
        };
      });

      console.log('ActivityTab: Converted tickets to donations:', ticketsAsDonations.length);
      setAcceptedTickets(ticketsAsDonations);
    } catch (error) {
      console.error('Error fetching accepted tickets:', error);
    } finally {
      setTicketsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDonations(user.id, user.role);
      fetchAcceptedTickets(); // Also fetch accepted donation tickets
    }
  }, [user]);

  // Refresh data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        fetchDonations(user.id, user.role);
        fetchAcceptedTickets();
      }
    }, [user])
  );

  // Combine regular donations and accepted tickets (already in Donation format)
  const allDonations = [...donations, ...acceptedTickets];

  console.log('ActivityTab: Regular donations:', donations.length);
  console.log('ActivityTab: Accepted tickets as donations:', acceptedTickets.length);
  console.log('ActivityTab: Total combined donations:', allDonations.length);

  const filteredDonations = allDonations.filter(donation => {
    // Filter by status
    if (statusFilter === 'all') return true;
    return donation.status === statusFilter;
  });

  // Sort by date (newest first)
  const sortedDonations = [...filteredDonations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const renderStatusFilterButton = (
    value: 'all' | 'pending' | 'fulfilled' | 'cancelled',
    label: string
  ) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        statusFilter === value && styles.filterButtonActive,
        statusFilter === value && value === 'pending' && styles.filterPending,
        statusFilter === value && value === 'fulfilled' && styles.filterFulfilled,
        statusFilter === value && value === 'cancelled' && styles.filterCancelled,
      ]}
      onPress={() => setStatusFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          statusFilter === value && styles.filterButtonTextActive,
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.8}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    filtersContainer: {
      backgroundColor: theme.card,
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    filterHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    filterIcon: {
      marginRight: 8,
    },
    filterTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.textDark,
    },
    filterRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    filterButton: {
      flex: 1,
      paddingHorizontal: 6,
      paddingVertical: 8,
      borderRadius: 20,
      marginHorizontal: 2,
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    filterButtonText: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.textLight,
      textAlign: 'center',
    },
    filterButtonTextActive: {
      color: theme.white,
    },
    filterPending: {
      backgroundColor: theme.warning,
      borderColor: theme.warning,
    },
    filterFulfilled: {
      backgroundColor: theme.success,
      borderColor: theme.success,
    },
    filterCancelled: {
      backgroundColor: theme.error,
      borderColor: theme.error,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textLight,
      textAlign: 'center',
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 16,
      color: theme.textLight,
      textAlign: 'center',
    },

    listContent: {
      padding: 16,
    },
    emptyImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 24,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.textDark,
      marginBottom: 8,
    },
    emptyButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 20,
      marginTop: 16,
    },
    emptyButtonText: {
      color: theme.white,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <View style={styles.filterHeader}>
          <Filter size={20} color={theme.textDark} style={styles.filterIcon} />
          <Text style={styles.filterTitle}>Filter by Status</Text>
        </View>

        <View style={styles.filterRow}>
          {renderStatusFilterButton('pending', 'Pending')}
          {renderStatusFilterButton('fulfilled', 'Fulfilled')}
          {renderStatusFilterButton('cancelled', 'Cancelled')}
          {renderStatusFilterButton('all', 'All')}
        </View>
      </View>

      {(isLoading || ticketsLoading) ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          data={sortedDonations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DonationCard donation={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.primary]}
              tintColor={theme.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1607113761692-0603282c4c96?q=80&w=300&auto=format' }}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyTitle}>No Activity Yet</Text>
              <Text style={styles.emptyText}>
                {isCharityOrShelter
                  ? 'No donations received yet. Your received donations will appear here.'
                  : 'Your donation history will appear here. Start by making a donation!'
                }
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => {}}
              >
                <Text style={styles.emptyButtonText}>Explore Organizations</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
    </SafeAreaView>
  );
}

