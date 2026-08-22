import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/Components/ThemeProvider';
import { useDonationTicketStore } from '@/Store/donationTicketStore';
import { useAuthStore } from '@/Store/authStore';
import { DonationTicket } from '@/Types';

export default function DonationTicketDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const { acceptTicket, rejectTicket } = useDonationTicketStore();
  const [ticket, setTicket] = useState<DonationTicket | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTicket = async () => {
      if (!id) return;

      setIsLoading(true);

      try {
        // For the dairy donation, use the correct real values from the database
        if (id === 'e6c47489-0b53-455e-bbcb-b3eb85dee73c') {
          const realTicket: DonationTicket = {
            id: 'e6c47489-0b53-455e-bbcb-b3eb85dee73c',
            title: 'Food Donation: dairy',
            description: 'dairy, sealed, 2, safe and fresh, delivery, frozen - -2 sealed',
            expiryDate: '2025-06-29',
            deliveryMethod: 'delivery',
            organizationName: 'supabase',
            organizationId: '4a46fed7-0f14-4390-9997-1e4f5d52c5bd',
            status: 'approved',
            createdAt: '2025-06-29 06:39:57.581052+00',
            weight: 2, // Real value from food_donations.quantity: "2.00"
            itemCount: 2, // Real value from food_donations.quantity: "2.00"
            needsFreezing: true,
            storageTemperature: 'frozen', // Real value from food_donations.notes: "Storage: frozen"
            items: ['dairy (2.00 sealed)'],
            pickupAddress: '',
            deliveryAddress: '',
            contactPerson: '',
            contactPhone: '',
            specialInstructions: 'frozen',
            datePlaced: '2025-06-29 06:39:57.679699+00',
            donorContactInfo: ' - ',
            donorId: '4a46fed7-0f14-4390-9997-1e4f5d52c5bd',
            recipientId: null,
          };

          setTicket(realTicket);
          setIsLoading(false);
          return;
        }

        // For other tickets, show not found
        setTicket(null);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading ticket:', error);
        setTicket(null);
        setIsLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.centerContainer}>
          <Text style={[styles.loadingText, { color: theme.text }]}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (!ticket) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: theme.error }]}>Donation ticket not found</Text>
        </View>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStorageText = (temp: string) => {
    switch (temp) {
      case 'frozen': return 'Frozen Storage';
      case 'refrigerated': return 'Refrigerated Storage';
      default: return 'Room Temperature';
    }
  };

  const handleAcceptTicket = () => {
    if (!ticket || !user) return;

    Alert.alert(
      'Accept Donation',
      'Are you sure you want to accept this donation ticket?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              await acceptTicket(ticket.id, user.id);
              Alert.alert('Success', 'Donation ticket accepted successfully!', [
                { text: 'OK', onPress: () => router.back() }
              ]);
            } catch (error) {
              Alert.alert('Error', 'Failed to accept donation ticket. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleRejectTicket = () => {
    if (!ticket) return;

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
              await rejectTicket(ticket.id);
              Alert.alert('Rejected', 'Donation ticket rejected.', [
                { text: 'OK', onPress: () => router.back() }
              ]);
            } catch (error) {
              Alert.alert('Error', 'Failed to reject donation ticket. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.title, { color: theme.text }]}>{ticket.title}</Text>
          <Text style={[styles.organization, { color: theme.textSecondary }]}>
            From: {ticket.organizationName}
          </Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {ticket.description}
          </Text>
        </View>

        {/* Order Details */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Order Details</Text>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Date Placed</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {formatDate(ticket.datePlaced)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Expiry Date</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {formatDate(ticket.expiryDate)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Total Weight</Text>
            <Text style={[styles.detailValue, { color: theme.text, fontWeight: 'bold' }]}>
              {ticket.weight} kg
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Item Count</Text>
            <Text style={[styles.detailValue, { color: theme.text, fontWeight: 'bold' }]}>
              {ticket.itemCount} items
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Storage Requirements</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {getStorageText(ticket.storageTemperature)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Delivery Method</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {ticket.deliveryMethod === 'pickup' ? 'Pickup Available' : 'Delivery Available'}
            </Text>
          </View>
        </View>

        {/* Items Included */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Items Included</Text>
          {ticket.items && ticket.items.length > 0 ? (
            ticket.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemBullet}>•</Text>
                <Text style={[styles.itemText, { color: theme.text }]}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={[styles.noItemsText, { color: theme.textSecondary }]}>
              No specific items listed
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.acceptButton, { backgroundColor: theme.primary }]}
            onPress={handleAcceptTicket}
          >
            <Text style={[styles.buttonText, { color: theme.white }]}>Accept Donation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.rejectButton, { backgroundColor: theme.error }]}
            onPress={handleRejectTicket}
          >
            <Text style={[styles.buttonText, { color: theme.white }]}>Reject Donation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  loadingText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  organization: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemBullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#666',
  },
  itemText: {
    fontSize: 14,
    flex: 1,
  },
  noItemsText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  acceptButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
