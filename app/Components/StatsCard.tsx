import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/Constants/colors';
import { DonationStats } from '@/Types';
import Card from './Card';

interface StatsCardProps {
  stats: DonationStats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <Card>
      <View style={styles.row}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>EGP {stats.totalReceived.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Received</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>EGP {stats.totalGiven.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Given</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.statusBox}>
          <Text style={styles.statusCount}>{stats.pendingCount}</Text>
          <Text style={styles.statusLabel}>Pending</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusCount}>{stats.fulfilledCount}</Text>
          <Text style={styles.statusLabel}>Fulfilled</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusCount}>{stats.cancelledCount}</Text>
          <Text style={styles.statusLabel}>Cancelled</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  statusBox: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  statusCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
});