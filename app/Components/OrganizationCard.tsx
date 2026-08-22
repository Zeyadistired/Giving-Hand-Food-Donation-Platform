import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Heart } from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { Organization } from '@/Types';
import Card from './Card';

interface OrganizationCardProps {
  organization: Organization;
  showDonateButton?: boolean;
}

export default function OrganizationCard({ organization, showDonateButton = false }: OrganizationCardProps) {
  const router = useRouter();
  const { theme } = useTheme();

  const handlePress = () => {
    router.push(`/organization/${organization.id}`);
  };

  const handleDonatePress = (e: any) => {
    e.stopPropagation();
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

  const styles = StyleSheet.create({
    card: {
      marginBottom: 16,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
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
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textDark,
      flex: 1,
      marginRight: 8,
    },
    badge: {
      backgroundColor: theme.primaryLight,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.primary,
    },
    description: {
      fontSize: 14,
      color: theme.textLight,
      marginBottom: 8,
      lineHeight: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    location: {
      fontSize: 12,
      color: theme.textLight,
      flex: 1,
    },
    donateButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    donateButtonText: {
      color: theme.white,
      fontSize: 12,
      fontWeight: '600',
      marginLeft: 4,
    },
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{
              uri: organization.profileImage ||
                  'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070'
            }}
            style={styles.image}
          />

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.name} numberOfLines={1}>{organization.name}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{getRoleLabel(organization.role)}</Text>
              </View>
            </View>

            <Text style={styles.description} numberOfLines={2}>
              {organization.description}
            </Text>

            <View style={styles.footer}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <MapPin size={14} color={theme.textLight} />
                <Text style={styles.location}>{organization.location}</Text>
              </View>

              {showDonateButton && (
                <TouchableOpacity
                  style={styles.donateButton}
                  onPress={handleDonatePress}
                  activeOpacity={0.8}
                >
                  <Heart size={12} color={theme.white} />
                  <Text style={styles.donateButtonText}>Donate</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}