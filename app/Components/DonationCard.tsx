import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowRight, DollarSign, Package } from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { Donation } from '@/Types';
import { useAuthStore } from '@/Store/authStore';
import Card from './Card';

interface DonationCardProps {
  donation: Donation;
  onPress?: () => void;
}

export default function DonationCard({ donation, onPress }: DonationCardProps) {
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const isRecipient = user?.id === donation.recipientId;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fulfilled': return theme.success;
      case 'cancelled': return theme.error;
      default: return theme.warning;
    }
  };

  const styles = StyleSheet.create({
    card: {
      marginBottom: 16,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    type: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textDark,
      flex: 1,
      marginRight: 8,
    },
    statusBadge: {
      backgroundColor: theme.primaryLight,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.primary,
    },
    amount: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.primary,
      marginBottom: 8,
    },
    participants: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    participantText: {
      fontSize: 14,
      color: theme.textLight,
      flex: 1,
    },
    arrow: {
      marginHorizontal: 8,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    date: {
      fontSize: 12,
      color: theme.textLight,
      flex: 1,
    },
    actions: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 12,
    },
    actionButton: {
      flex: 1,
      backgroundColor: theme.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    actionText: {
      color: theme.white,
      fontSize: 14,
      fontWeight: '600',
    },
    rejectButton: {
      backgroundColor: theme.error,
    },
    rejectText: {
      color: theme.white,
      fontSize: 14,
      fontWeight: '600',
    },
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.cardContent}>
          <View style={[
            styles.iconContainer,
            { backgroundColor: donation.type === 'money' ? theme.primaryLight : '#FFF4E5' }
          ]}>
            {donation.type === 'money' ? (
              <DollarSign size={20} color={theme.primary} />
            ) : (
              <Package size={20} color={theme.secondary} />
            )}
          </View>

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.type} numberOfLines={1}>
                {donation.type === 'money' ? 'Money Donation' : 'Food Donation'}
              </Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(donation.status) + '20' }
              ]}>
                <Text style={[styles.statusText, { color: getStatusColor(donation.status) }]}>
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </Text>
              </View>
            </View>

            {donation.type === 'money' && donation.amount && (
              <Text style={styles.amount}>EGP {donation.amount.toFixed(0)}</Text>
            )}

            {donation.type === 'food' && donation.foodDetails && (
              <Text style={styles.amount}>
                {donation.foodDetails.quantity} {donation.foodDetails.unit} of {donation.foodDetails.name}
              </Text>
            )}

            <View style={styles.participants}>
              <Text style={styles.participantText} numberOfLines={1}>
                {isRecipient ? (
                  donation.anonymous ? 'Anonymous Donor' : donation.donorName
                ) : (
                  donation.recipientName
                )}
              </Text>
              <ArrowRight size={14} color={theme.textLight} style={styles.arrow} />
              <Text style={styles.participantText} numberOfLines={1}>
                {isRecipient ? 'You' : donation.recipientName}
              </Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.date}>{formatDate(donation.createdAt)}</Text>
            </View>
          </View>
        </View>

        {donation.status === 'pending' && isRecipient && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
              <Text style={styles.rejectText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
}