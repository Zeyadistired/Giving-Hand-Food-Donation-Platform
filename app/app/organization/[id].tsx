import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Phone, Mail, Heart, DollarSign } from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useOrganizationStore } from '@/Store/organizationStore';
import { useDonationStore } from '@/Store/donationStore';
import { useAuthStore } from '@/Store/authStore';
import Button from '@/Components/Buttons';
import Card from '@/Components/Card';
import { Organization } from '@/Types';

export default function OrganizationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const { getOrganizationById, organizations, fetchOrganizations, isLoading } = useOrganizationStore();
  const { donations, makeDonation } = useDonationStore();

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (organizations.length === 0) {
      fetchOrganizations();
    } else {
      const org = getOrganizationById(id as string);
      setOrganization(org || null);
    }
  }, [id, organizations]);

  useEffect(() => {
    if (organizations.length > 0) {
      const org = getOrganizationById(id as string);
      setOrganization(org || null);
    }
  }, [organizations]);

  const orgDonations = donations.filter(
    d => d.recipientId === id && d.status === 'fulfilled'
  );

  const totalReceived = orgDonations.reduce(
    (sum, d) => sum + (d.amount || 0),
    0
  );

  const handleQuickDonate = async (amount: number) => {
    if (!user || !organization) return;

    setIsSubmitting(true);

    try {
      await makeDonation({
        donorId: user.id,
        donorName: user.name,
        recipientId: organization.id,
        recipientName: organization.name,
        type: 'money',
        amount: amount,
        anonymous: false,
      });

      Alert.alert(
        'Donation Successful',
        `Thank you for your EGP ${amount} donation to ${organization.name}!`,
        [
          {
            text: 'View Activity',
            onPress: () => router.push('/activity'),
          },
          {
            text: 'OK',
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Donation Failed',
        'There was an error processing your donation. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    errorText: {
      fontSize: 18,
      color: theme.textLight,
      textAlign: 'center',
    },
    coverImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    content: {
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.textDark,
      marginBottom: 4,
    },
    badge: {
      backgroundColor: theme.primaryLight,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 16,
      alignSelf: 'flex-start',
    },
    badgeText: {
      color: theme.primary,
      fontSize: 12,
      fontWeight: '600',
    },
    contactCard: {
      marginBottom: 24,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    contactText: {
      fontSize: 14,
      color: theme.text,
      marginLeft: 12,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textDark,
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      color: theme.text,
      lineHeight: 24,
    },
    impactCard: {
      padding: 16,
    },
    impactHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    impactHeaderText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginLeft: 8,
    },
    impactStats: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    impactStat: {
      flex: 1,
      alignItems: 'center',
    },
    impactValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.primary,
      marginBottom: 4,
    },
    impactLabel: {
      fontSize: 12,
      color: theme.textLight,
    },
    divider: {
      width: 1,
      height: 40,
      backgroundColor: theme.border,
    },
    donationCard: {
      padding: 16,
    },
    donationText: {
      fontSize: 14,
      color: theme.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    quickDonations: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    amountButton: {
      backgroundColor: theme.primaryLight,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
      width: '22%',
    },
    amountText: {
      color: theme.primary,
      fontWeight: '600',
      fontSize: 16,
    },
    customButton: {
      marginTop: 8,
    },
    donorCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 12,
      marginBottom: 8,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    donorInitials: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.primaryLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    initialsText: {
      color: theme.primary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    donorInfo: {
      flex: 1,
    },
    donorName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textDark,
      marginBottom: 4,
    },
    donationAmount: {
      fontSize: 12,
      color: theme.textLight,
    },
    emptyCard: {
      padding: 16,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 14,
      color: theme.textLight,
      textAlign: 'center',
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!organization) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Organization not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{
          uri: organization.profileImage ||
               'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070'
        }}
        style={styles.coverImage}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{organization.name}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {organization.role.charAt(0).toUpperCase() + organization.role.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        <Card variant="elevated" style={styles.contactCard}>
          <View style={styles.contactItem}>
            <MapPin size={16} color={theme.primary} />
            <Text style={styles.contactText}>{organization.location}</Text>
          </View>

          <View style={styles.contactItem}>
            <Phone size={16} color={theme.primary} />
            <Text style={styles.contactText}>{organization.phone}</Text>
          </View>

          <View style={styles.contactItem}>
            <Mail size={16} color={theme.primary} />
            <Text style={styles.contactText}>{organization.email}</Text>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{organization.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Impact</Text>

          <Card variant="elevated" style={styles.impactCard}>
            <View style={styles.impactHeader}>
              <Heart size={20} color={theme.primary} />
              <Text style={styles.impactHeaderText}>Organization Impact</Text>
            </View>

            <View style={styles.impactStats}>
              <View style={styles.impactStat}>
                <Text style={styles.impactValue}>EGP {totalReceived.toFixed(0)}</Text>
                <Text style={styles.impactLabel}>Total Received</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.impactStat}>
                <Text style={styles.impactValue}>{orgDonations.length}</Text>
                <Text style={styles.impactLabel}>Donations</Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Make a Donation</Text>

          <Card variant="elevated" style={styles.donationCard}>
            <Text style={styles.donationText}>
              Support {organization.name} with a quick donation
            </Text>

            <View style={styles.quickDonations}>
              {[50, 100, 250, 500].map(amount => (
                <TouchableOpacity
                  key={amount}
                  style={styles.amountButton}
                  onPress={() => handleQuickDonate(amount)}
                  disabled={isSubmitting}
                >
                  <Text style={styles.amountText}>EGP {amount}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button
              title="Custom Donation"
              variant="outline"
              onPress={() => router.push(`/donate/${id}`)}
              style={styles.customButton}
              icon={<DollarSign size={16} color={theme.primary} />}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Donors</Text>

          {orgDonations.length > 0 ? (
            orgDonations
              .slice(0, 3)
              .map((donation, index) => (
                <View key={index} style={styles.donorCard}>
                  <View style={styles.donorInitials}>
                    <Text style={styles.initialsText}>
                      {donation.anonymous
                        ? 'A'
                        : donation.donorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.donorInfo}>
                    <Text style={styles.donorName}>
                      {donation.anonymous ? 'Anonymous Donor' : donation.donorName}
                    </Text>
                    <Text style={styles.donationAmount}>
                      Donated ${donation.amount?.toFixed(0) || '0'}
                    </Text>
                  </View>
                </View>
              ))
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <Text style={styles.emptyText}>No donors yet. Be the first!</Text>
            </Card>
          )}
        </View>
      </View>
    </ScrollView>
  );
}