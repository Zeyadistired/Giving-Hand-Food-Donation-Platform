import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Search, Activity, User, Heart, Package } from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { user } = useAuthStore();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const isDonor = user?.role === 'donor';
  const isOrganization = user?.role === 'charity' || user?.role === 'shelter' || user?.role === 'factory';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.inactive,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          height: 80 + (insets.bottom > 0 ? insets.bottom - 15 : 0), // Add safe area but reduce by 15px to avoid too much space
          paddingBottom: insets.bottom > 0 ? insets.bottom : 12, // Safe area or default 12px
          paddingTop: 12, // Increased from 8 to 12
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14, // Increased font size
          fontWeight: '600', // Made labels bolder
          marginTop: 4, // Added margin for better spacing
        },
        headerStyle: {
          backgroundColor: theme.card,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          color: theme.textDark,
        },
      }}
    >
      {/* Home tab - shows for donors */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
          href: isDonor ? '/tabs' : null, // Only show for donors
        }}
      />

      {/* Home tab for organization users - shows donation tickets */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerTitle: 'Available Donations',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
          href: isOrganization ? '/tabs/home' : null, // Only show for charity/shelter/factory
        }}
      />

      {/* Donations tab - only for organization users */}
      <Tabs.Screen
        name="donations"
        options={{
          title: 'Donations',
          headerTitle: 'Donations Overview',
          tabBarIcon: ({ color }) => <Package size={28} color={color} />,
          href: isOrganization ? '/tabs/donations' : null, // Only show for charity/shelter/factory
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Search size={28} color={color} />,
          href: isDonor ? '/tabs/explore' : null, // Only show for donors
        }}
      />

      <Tabs.Screen
        name="donate"
        options={{
          title: 'Donate',
          tabBarIcon: ({ color }) => <Heart size={28} color={color} />,
          href: isDonor ? '/tabs/donate' : null, // Only show for donors
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <Activity size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}