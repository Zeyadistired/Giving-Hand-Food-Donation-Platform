import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';
import { useDonationTicketStore } from '@/Store/donationTicketStore';
import { DonationTicket } from '@/Types';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, Package, Thermometer } from 'lucide-react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import Card from '@/Components/Card';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const { tickets, isLoading, fetchTickets, acceptTicket, rejectTicket } = useDonationTicketStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTickets(user.id);
    }
  }, [user]);

  // Refresh tickets when screen comes into focus (e.g., returning from detail page)
  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        fetchTickets(user.id);
      }
    }, [user])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    if (user) {
      await fetchTickets(user.id);
    }
    setRefreshing(false);
  };

  const handleAcceptTicket = (ticketId: string) => {
    Alert.alert(
      'Accept Donation',
      'Are you sure you want to accept this donation ticket?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              if (user) {
                await acceptTicket(ticketId, user.id);
                Alert.alert('Success', 'Donation ticket accepted successfully!');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to accept donation ticket. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleRejectTicket = (ticketId: string) => {
    Alert.alert(
      'Reject Donation',
      'Are you sure you want to reject this donation ticket?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: async () => {
            try {
              await rejectTicket(ticketId);
              Alert.alert('Rejected', 'Donation ticket rejected.');
            } catch (error) {
              Alert.alert('Error', 'Failed to reject donation ticket. Please try again.');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDetails = (ticketId: string) => {
    router.push(`/donation-ticket/${ticketId}`);
  };

  const renderTicket = ({ item: ticket }: { item: DonationTicket }) => {
    const daysUntilExpiry = getDaysUntilExpiry(ticket.expiryDate);
    const isUrgent = daysUntilExpiry <= 3;

    return (
      <TouchableOpacity
        onPress={() => handleViewDetails(ticket.id)}
        activeOpacity={0.7}
        style={[styles.ticketCard, { backgroundColor: theme.card, borderColor: theme.border }]}
      >
        <View style={styles.ticketHeader}>
          <Text style={[styles.ticketTitle, { color: theme.textDark }]}>{ticket.title}</Text>
          <View style={[
            styles.urgencyBadge,
            { backgroundColor: isUrgent ? theme.errorLight : theme.primaryLight }
          ]}>
            <Text style={[
              styles.urgencyText,
              { color: isUrgent ? theme.error : theme.primary }
            ]}>
              {daysUntilExpiry} days left
            </Text>
          </View>
        </View>

        <Text style={[styles.organizationName, { color: theme.textLight }]}>
          From: {ticket.organizationName}
        </Text>

        <Text style={[styles.description, { color: theme.text }]} numberOfLines={2}>
          {ticket.description}
        </Text>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={theme.textLight} />
            <Text style={[styles.detailText, { color: theme.textLight }]}>
              Expires: {formatDate(ticket.expiryDate)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <MapPin size={16} color={theme.textLight} />
            <Text style={[styles.detailText, { color: theme.textLight }]}>
              {ticket.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'}
            </Text>
          </View>
        </View>

        <View style={styles.quickInfo}>
          <Text style={[styles.quickInfoText, { color: theme.textLight }]}>
            {ticket.weight} kg • {ticket.itemCount} items
          </Text>
          <Text style={[styles.viewDetailsText, { color: theme.primary }]}>
            Tap to view details →
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.rejectButton, { backgroundColor: theme.errorLight, borderColor: theme.error }]}
            onPress={(e) => {
              e.stopPropagation();
              handleRejectTicket(ticket.id);
            }}
          >
            <XCircle size={18} color={theme.error} />
            <Text style={[styles.rejectButtonText, { color: theme.error }]}>Reject</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.acceptButton, { backgroundColor: theme.primary }]}
            onPress={(e) => {
              e.stopPropagation();
              handleAcceptTicket(ticket.id);
            }}
          >
            <CheckCircle size={18} color={theme.white} />
            <Text style={[styles.acceptButtonText, { color: theme.white }]}>Accept</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id}
          renderItem={renderTicket}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1607113761692-0603282c4c96?q=80&w=300&auto=format' }}
                style={styles.emptyImage}
              />
              <Text style={[styles.emptyTitle, { color: theme.textDark }]}>
                No Donation Tickets
              </Text>
              <Text style={[styles.emptyText, { color: theme.textLight }]}>
                Check back later for new donation opportunities from organizations.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  ticketCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  organizationName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 6,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  quickInfoText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
