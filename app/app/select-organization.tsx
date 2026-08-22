import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Search, Filter, X, ArrowRight, MapPin, Heart } from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useOrganizationStore } from '@/Store/organizationStore';
import { Organization, UserRole } from '@/Types';
import Card from '@/Components/Card';

export default function SelectOrganizationScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { organizations, fetchOrganizations, isLoading } = useOrganizationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<UserRole | 'all'>('all');

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'all' || org.role === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleOrganizationSelect = (organization: Organization) => {
    router.push(`/donate/${organization.id}`);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'charity': return 'Charity';
      case 'shelter': return 'Shelter';
      case 'factory': return 'Food Factory';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'charity': return theme.primary;
      case 'shelter': return theme.secondary;
      case 'factory': return theme.success;
      default: return theme.textLight;
    }
  };

  const renderFilterButton = (filter: UserRole | 'all', label: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === filter && styles.filterButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderOrganizationCard = ({ item: organization }: { item: Organization }) => (
    <TouchableOpacity
      onPress={() => handleOrganizationSelect(organization)}
      activeOpacity={0.8}
      style={styles.cardContainer}
    >
      <Card variant="elevated" style={styles.organizationCard}>
        <View style={styles.cardContent}>
          <Image
            source={{
              uri: organization.profileImage ||
                  'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070'
            }}
            style={styles.organizationImage}
          />

          <View style={styles.organizationInfo}>
            <View style={styles.organizationHeader}>
              <Text style={styles.organizationName} numberOfLines={1}>
                {organization.name}
              </Text>
              <View style={[styles.roleBadge, { backgroundColor: getRoleColor(organization.role) + '20' }]}>
                <Text style={[styles.roleBadgeText, { color: getRoleColor(organization.role) }]}>
                  {getRoleLabel(organization.role)}
                </Text>
              </View>
            </View>

            <Text style={styles.organizationDescription} numberOfLines={2}>
              {organization.description}
            </Text>

            <View style={styles.organizationFooter}>
              <View style={styles.locationContainer}>
                <MapPin size={14} color={theme.textLight} />
                <Text style={styles.locationText} numberOfLines={1}>
                  {organization.location}
                </Text>
              </View>

              <View style={styles.donateButtonContainer}>
                <Heart size={16} color={theme.primary} />
                <Text style={styles.donateButtonText}>Donate</Text>
                <ArrowRight size={16} color={theme.primary} />
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.card,
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.textDark,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textLight,
      marginBottom: 16,
    },
    searchContainer: {
      marginBottom: 16,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.background,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.textDark,
    },
    filtersContainer: {
      backgroundColor: theme.card,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    filtersScrollContent: {
      paddingRight: 16,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
    },
    filterButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    filterButtonText: {
      fontSize: 14,
      color: theme.textLight,
      fontWeight: '500',
    },
    filterButtonTextActive: {
      color: theme.white,
      fontWeight: '600',
    },
    listContainer: {
      flex: 1,
    },
    listContent: {
      padding: 16,
    },
    cardContainer: {
      marginBottom: 16,
    },
    organizationCard: {
      padding: 0,
      overflow: 'hidden',
    },
    cardContent: {
      flexDirection: 'row',
      padding: 16,
    },
    organizationImage: {
      width: 80,
      height: 80,
      borderRadius: 12,
      marginRight: 16,
    },
    organizationInfo: {
      flex: 1,
    },
    organizationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    organizationName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textDark,
      flex: 1,
      marginRight: 8,
    },
    roleBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    roleBadgeText: {
      fontSize: 12,
      fontWeight: '600',
    },
    organizationDescription: {
      fontSize: 14,
      color: theme.textLight,
      lineHeight: 20,
      marginBottom: 12,
    },
    organizationFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    locationText: {
      fontSize: 12,
      color: theme.textLight,
      marginLeft: 4,
      flex: 1,
    },
    donateButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.primaryLight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    donateButtonText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.primary,
      marginHorizontal: 4,
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
  });

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Select Organization',
          headerShown: true,
          headerStyle: { backgroundColor: theme.card },
          headerTitleStyle: { color: theme.textDark },
          headerTintColor: theme.textDark,
        }} 
      />

      <View style={styles.header}>
        <Text style={styles.title}>Choose an Organization</Text>
        <Text style={styles.subtitle}>Select where you'd like to make your donation</Text>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={18} color={theme.textLight} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search organizations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme.textLight}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={18} color={theme.textLight} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
        >
          {renderFilterButton('all', 'All Organizations')}
          {renderFilterButton('charity', 'Charities')}
          {renderFilterButton('shelter', 'Shelters')}
          {renderFilterButton('factory', 'Food Factories')}
        </ScrollView>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          style={styles.listContainer}
          data={filteredOrganizations}
          keyExtractor={(item) => item.id}
          renderItem={renderOrganizationCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No organizations found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
