import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Heart, Search, DollarSign } from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';
import { useOrganizationStore } from '@/Store/organizationStore';
import { useDonationStore } from '@/Store/donationStore';
import OrganizationCard from '@/Components/OrganizationCard';
import DonationCard from '@/Components/DonationCard';
import Card from '@/Components/Card';
import Button from '@/Components/Buttons';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const { organizations, fetchOrganizations } = useOrganizationStore();
  const { donations, stats, fetchDonations, getDonationStats } = useDonationStore();

  useEffect(() => {
    if (user) {
      // Redirect organization users to their specific home page
      if (user.role === 'charity' || user.role === 'shelter' || user.role === 'factory') {
        router.replace('/tabs/home');
        return;
      }

      fetchOrganizations();
      fetchDonations(user.id, user.role);
    }
  }, [user]);

  const isOrganization = user?.role !== 'donor';

  // Show 3 random organizations
  const featuredOrgs = [...organizations]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Show 2 most recent donations
  const recentDonations = [...donations]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    hero: {
      height: 220,
    },
    heroImage: {
      opacity: 0.8,
    },
    heroOverlay: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      flex: 1,
      justifyContent: 'flex-end',
    },
    heroContent: {
      padding: 24,
    },
    greeting: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.white,
      marginBottom: 4,
    },
    heroText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.white,
      marginBottom: 16,
    },
    searchButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    searchText: {
      marginLeft: 8,
      color: theme.textLight,
      fontSize: 14,
    },
    content: {
      padding: 16,
    },
    impactCard: {
      backgroundColor: theme.card,
      marginTop: -30,
      borderRadius: 16,
    },
    impactHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    impactTitle: {
      fontSize: 16,
      fontWeight: 'bold',
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
    impactStatValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.primary,
      marginBottom: 4,
    },
    impactStatLabel: {
      fontSize: 12,
      color: theme.textLight,
    },
    divider: {
      width: 1,
      height: 40,
      backgroundColor: theme.border,
    },
    quickActions: {
      flexDirection: 'row',
      marginTop: 16,
      gap: 12,
    },
    actionButton: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 2,
    },
    actionButtonFull: {
      width: '100%',
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 2,
    },
    actionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    actionText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    section: {
      marginTop: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textDark,
    },
    seeAllText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.primary,
    },
    emptyCard: {
      alignItems: 'center',
      padding: 24,
    },
    emptyText: {
      fontSize: 16,
      color: theme.textLight,
      marginBottom: 16,
    },
    emptyButton: {
      width: '100%',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070&auto=format' }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <Text style={styles.greeting}>
              Hello, {user?.name.split(' ')[0]}
            </Text>
            <Text style={styles.heroText}>
              {isOrganization
                ? 'Make an impact today'
                : 'Ready to make a difference?'}
            </Text>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => router.push('/tabs/explore')}
            >
              <Search size={18} color={theme.textLight} />
              <Text style={styles.searchText}>Find organizations to support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        {/* Impact Stats */}
        <Card variant="elevated" style={styles.impactCard}>
          <View style={styles.impactHeader}>
            <Heart size={20} color={theme.primary} />
            <Text style={styles.impactTitle}>Your Impact</Text>
          </View>

          <View style={styles.impactStats}>
            <View style={styles.impactStat}>
              <Text style={styles.impactStatValue}>
                EGP {stats.totalGiven.toFixed(0)}
              </Text>
              <Text style={styles.impactStatLabel}>Donated</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.impactStat}>
              <Text style={styles.impactStatValue}>
                {donations.filter(d => d.status === 'fulfilled').length}
              </Text>
              <Text style={styles.impactStatLabel}>Contributions</Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButtonFull}
            onPress={() => router.push('/select-organization')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFF4E5' }]}>
              <DollarSign size={20} color={theme.secondary} />
            </View>
            <Text style={styles.actionText}>Make a Donation</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Organizations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Organizations</Text>
            <TouchableOpacity onPress={() => router.push('/tabs/explore')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {featuredOrgs.map(org => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
          </View>

          {recentDonations.length > 0 ? (
            recentDonations.map(donation => (
              <DonationCard key={donation.id} donation={donation} />
            ))
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <Text style={styles.emptyText}>No recent activity</Text>
              <Button
                title="Make Your First Donation"
                onPress={() => router.push('/tabs/explore')}
                style={styles.emptyButton}
              />
            </Card>
          )}
        </View>
      </View>
    </ScrollView>
  );
}