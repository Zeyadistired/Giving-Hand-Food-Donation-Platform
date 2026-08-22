import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  LogOut,
  User as UserIcon,
  MapPin,
  Mail,
  FileText,
  Clock,
  ChevronRight,
  Bell,
  Heart,
  Settings
} from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';
import { useDonationStore } from '@/Store/donationStore';
import Button from '@/Components/Buttons';
import Card from '@/Components/Card';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { user, logout } = useAuthStore();
  const { stats } = useDonationStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const isOrganization = user?.role !== 'donor';

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/');
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'charity':
        return 'Charity';
      case 'shelter':
        return 'Shelter';
      case 'factory':
        return 'Food Factory';
      default:
        return 'Donor';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      backgroundColor: theme.card,
      padding: 24,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
    },
    profileInitials: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    initialsText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.white,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.textDark,
      marginBottom: 8,
    },
    roleBadge: {
      backgroundColor: theme.primaryLight,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    roleText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.primary,
    },
    section: {
      margin: 16,
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textDark,
      marginBottom: 16,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    lastInfoItem: {
      borderBottomWidth: 0,
    },
    infoIconContainer: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: theme.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    infoLabel: {
      fontSize: 16,
      color: theme.textLight,
      fontWeight: '500',
      flex: 1,
    },
    infoValue: {
      fontSize: 16,
      color: theme.textDark,
      fontWeight: '600',
    },
    impactStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
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
      fontSize: 14,
      color: theme.textLight,
      fontWeight: '500',
    },
    divider: {
      width: 1,
      backgroundColor: theme.border,
      marginHorizontal: 16,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    lastSettingItem: {
      borderBottomWidth: 0,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIconContainer: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: theme.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    settingText: {
      fontSize: 16,
      color: theme.textDark,
      fontWeight: '500',
    },
    logoutButton: {
      margin: 16,
      marginTop: 8,
    },
    logoutButtonText: {
      color: theme.error,
    },
    content: {
      flex: 1,
    },
    impactCard: {
      margin: 16,
      marginBottom: 8,
    },
    impactHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    impactTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textDark,
      marginLeft: 8,
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        {user?.profileImage ? (
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileInitials}>
            <Text style={styles.initialsText}>
              {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </Text>
          </View>
        )}

        <Text style={styles.name}>{user?.name}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{getRoleLabel(user?.role || 'donor')}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Impact Card */}
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
                {stats.fulfilledCount}
              </Text>
              <Text style={styles.impactStatLabel}>Fulfilled</Text>
            </View>
          </View>
        </Card>

        {/* Account Info */}
        <Card variant="elevated" style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <UserIcon size={16} color={theme.primary} />
            </View>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user?.name}</Text>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Mail size={16} color={theme.primary} />
            </View>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <MapPin size={16} color={theme.primary} />
            </View>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{user?.location}</Text>
          </View>

          <View style={[styles.infoItem, styles.lastInfoItem]}>
            <View style={styles.infoIconContainer}>
              <Clock size={16} color={theme.primary} />
            </View>
            <Text style={styles.infoLabel}>Joined</Text>
            <Text style={styles.infoValue}>{formatDate(user?.createdAt || '')}</Text>
          </View>
        </Card>

        {/* Settings */}
        <Card variant="elevated" style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconContainer}>
                <Bell size={16} color={theme.primary} />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.inactive, true: theme.primaryLight }}
              thumbColor={notificationsEnabled ? theme.primary : theme.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/settings')}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIconContainer}>
                <Settings size={16} color={theme.primary} />
              </View>
              <Text style={styles.settingText}>Account Settings</Text>
            </View>
            <ChevronRight size={16} color={theme.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconContainer}>
                <FileText size={16} color={theme.primary} />
              </View>
              <Text style={styles.settingText}>Privacy Policy</Text>
            </View>
            <ChevronRight size={16} color={theme.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.lastSettingItem]}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconContainer}>
                <FileText size={16} color={theme.primary} />
              </View>
              <Text style={styles.settingText}>Terms of Service</Text>
            </View>
            <ChevronRight size={16} color={theme.textLight} />
          </TouchableOpacity>
        </Card>

        {/* Logout Button */}
        <Button
          title="Logout"
          variant="outline"
          onPress={handleLogout}
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
          icon={<LogOut size={16} color={theme.error} />}
        />
      </View>
    </ScrollView>
  );
}