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
import { Search, Filter, X } from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useOrganizationStore } from '@/Store/organizationStore';
import OrganizationCard from '@/Components/OrganizationCard';
import { Organization, UserRole } from '@/Types';

export default function ExploreScreen() {
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

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    searchContainer: {
      padding: 16,
      backgroundColor: theme.card,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.background,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
    },
    filtersContainer: {
      backgroundColor: theme.card,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    filtersScrollContent: {
      paddingHorizontal: 16,
      paddingVertical: 4,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: theme.background,
      marginRight: 8,
    },
    filterButtonActive: {
      backgroundColor: theme.primary,
    },
    filterButtonText: {
      fontSize: 14,
      color: theme.textLight,
    },
    filterButtonTextActive: {
      color: theme.white,
      fontWeight: '600',
    },
    listContent: {
      padding: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    },
    emptyImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 24,
      opacity: 0.6,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textDark,
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 14,
      color: theme.textLight,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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

      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
        >
          {renderFilterButton('all', 'All')}
          {renderFilterButton('charity', 'Charities')}
          {renderFilterButton('shelter', 'Shelters')}
          {renderFilterButton('factory', 'Factories')}
        </ScrollView>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredOrganizations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrganizationCard organization={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=300&auto=format' }}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyTitle}>No Results Found</Text>
              <Text style={styles.emptyText}>
                Try adjusting your search or filters to find what you're looking for.
              </Text>
            </View>
          }
        />
      )}
    </View>
    </SafeAreaView>
  );
}