import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';
import { useDonationStore } from '@/Store/donationStore';
import { DollarSign, Package, TrendingUp, Calendar, Users } from 'lucide-react-native';

interface DonationSummary {
  totalMonetaryDonations: number;
  totalFoodDonations: number;
  monetaryCount: number;
  foodCount: number;
  thisMonthMonetary: number;
  thisMonthFood: number;
}

export default function DonationsScreen() {
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const { donations, fetchDonations } = useDonationStore();
  const [refreshing, setRefreshing] = useState(false);
  const [donationSummary, setDonationSummary] = useState<DonationSummary>({
    totalMonetaryDonations: 0,
    totalFoodDonations: 0,
    monetaryCount: 0,
    foodCount: 0,
    thisMonthMonetary: 0,
    thisMonthFood: 0,
  });

  useEffect(() => {
    if (user) {
      fetchDonations(user.id, user.role);
    }
  }, [user]);

  useEffect(() => {
    loadDonationSummary();
  }, [donations]);

  const loadDonationSummary = async () => {
    // Calculate summary from real donations data
    const monetaryDonations = donations.filter(d => d.type === 'money');
    const foodDonations = donations.filter(d => d.type === 'food');

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthMonetary = monetaryDonations
      .filter(d => {
        const donationDate = new Date(d.createdAt);
        return donationDate.getMonth() === currentMonth && donationDate.getFullYear() === currentYear;
      })
      .reduce((sum, d) => sum + (d.amount || 0), 0);

    const thisMonthFood = foodDonations
      .filter(d => {
        const donationDate = new Date(d.createdAt);
        return donationDate.getMonth() === currentMonth && donationDate.getFullYear() === currentYear;
      }).length;

    setDonationSummary({
      totalMonetaryDonations: monetaryDonations.reduce((sum, d) => sum + (d.amount || 0), 0),
      totalFoodDonations: foodDonations.length,
      monetaryCount: monetaryDonations.length,
      foodCount: foodDonations.length,
      thisMonthMonetary,
      thisMonthFood,
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (user) {
      await fetchDonations(user.id, user.role);
      await loadDonationSummary();
    }
    setRefreshing(false);
  };

  const StatCard = ({ 
    icon, 
    title, 
    value, 
    unit, 
    subtitle, 
    color 
  }: {
    icon: React.ReactNode;
    title: string;
    value: number;
    unit: string;
    subtitle: string;
    color: string;
  }) => (
    <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <View style={styles.statContent}>
        <Text style={[styles.statTitle, { color: theme.textLight }]}>{title}</Text>
        <Text style={[styles.statValue, { color: theme.textDark }]}>
          {value.toLocaleString()} {unit}
        </Text>
        <Text style={[styles.statSubtitle, { color: theme.textLight }]}>{subtitle}</Text>
      </View>
    </View>
  );

  const SummaryCard = ({ 
    title, 
    totalValue, 
    totalUnit, 
    count, 
    monthlyValue, 
    monthlyUnit, 
    icon, 
    color 
  }: {
    title: string;
    totalValue: number;
    totalUnit: string;
    count: number;
    monthlyValue: number;
    monthlyUnit: string;
    icon: React.ReactNode;
    color: string;
  }) => (
    <View style={[styles.summaryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.summaryHeader}>
        <View style={[styles.summaryIcon, { backgroundColor: color + '20' }]}>
          {icon}
        </View>
        <Text style={[styles.summaryTitle, { color: theme.textDark }]}>{title}</Text>
      </View>
      
      <View style={styles.summaryStats}>
        <View style={styles.summaryStatItem}>
          <Text style={[styles.summaryStatLabel, { color: theme.textLight }]}>Total All-Time</Text>
          <Text style={[styles.summaryStatValue, { color: theme.textDark }]}>
            {totalValue.toLocaleString()} {totalUnit}
          </Text>
          <Text style={[styles.summaryStatCount, { color: theme.textLight }]}>
            {count} donations
          </Text>
        </View>
        
        <View style={styles.summaryStatItem}>
          <Text style={[styles.summaryStatLabel, { color: theme.textLight }]}>This Month</Text>
          <Text style={[styles.summaryStatValue, { color: color }]}>
            {monthlyValue.toLocaleString()} {monthlyUnit}
          </Text>
          <View style={styles.trendContainer}>
            <TrendingUp size={14} color={theme.success} />
            <Text style={[styles.trendText, { color: theme.success }]}>+12%</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      >
        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <StatCard
            icon={<DollarSign size={24} color={theme.primary} />}
            title="Total Monetary"
            value={donationSummary.totalMonetaryDonations}
            unit="EGP"
            subtitle={`${donationSummary.monetaryCount} donations`}
            color={theme.primary}
          />
          
          <StatCard
            icon={<Package size={24} color={theme.secondary} />}
            title="Total Food"
            value={donationSummary.totalFoodDonations}
            unit="kg"
            subtitle={`${donationSummary.foodCount} donations`}
            color={theme.secondary}
          />
        </View>

        {/* Detailed Summary Cards */}
        <View style={styles.summarySection}>
          <Text style={[styles.sectionTitle, { color: theme.textDark }]}>
            Donation Breakdown
          </Text>
          
          <SummaryCard
            title="Monetary Donations"
            totalValue={donationSummary.totalMonetaryDonations}
            totalUnit="EGP"
            count={donationSummary.monetaryCount}
            monthlyValue={donationSummary.thisMonthMonetary}
            monthlyUnit="EGP"
            icon={<DollarSign size={20} color={theme.primary} />}
            color={theme.primary}
          />
          
          <SummaryCard
            title="Food Donations"
            totalValue={donationSummary.totalFoodDonations}
            totalUnit="kg"
            count={donationSummary.foodCount}
            monthlyValue={donationSummary.thisMonthFood}
            monthlyUnit="kg"
            icon={<Package size={20} color={theme.secondary} />}
            color={theme.secondary}
          />
        </View>

        {/* Additional Info */}
        <View style={[styles.infoCard, { backgroundColor: theme.primaryLight, borderColor: theme.primary }]}>
          <View style={styles.infoHeader}>
            <Users size={20} color={theme.primary} />
            <Text style={[styles.infoTitle, { color: theme.primary }]}>
              Impact Summary
            </Text>
          </View>
          <Text style={[styles.infoText, { color: theme.textDark }]}>
            Your organization has received donations from {donationSummary.monetaryCount + donationSummary.foodCount} different donors, 
            helping you serve the community better. Keep up the great work!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  quickStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statContent: {
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 11,
  },
  summarySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryStatItem: {
    flex: 1,
  },
  summaryStatLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  summaryStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryStatCount: {
    fontSize: 11,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
