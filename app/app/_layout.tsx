import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from "@/Components/ThemeProvider";
import { useAuthStore } from "@/Store/authStore";
import ErrorBoundary from "@/Components/ErrorBoundary";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Add emergency splash screen hide after 3 seconds
setTimeout(() => {
  console.log('Emergency splash screen hide after 3 seconds');
  SplashScreen.hideAsync().catch(console.error);
}, 3000);

export default function RootLayout() {
  console.log('RootLayout: Starting app initialization');

  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  console.log('RootLayout: Fonts loaded:', loaded, 'Error:', error);

  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
      // Don't throw error, just continue with default fonts
      SplashScreen.hideAsync();
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      console.log('RootLayout: Fonts loaded successfully, hiding splash screen');
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Add timeout for font loading to prevent infinite splash screen
  useEffect(() => {
    const fontTimeout = setTimeout(() => {
      if (!loaded && !error) {
        console.warn('RootLayout: Font loading timeout, forcing splash screen hide');
        SplashScreen.hideAsync();
      }
    }, 2000); // Reduced to 2 second timeout

    return () => clearTimeout(fontTimeout);
  }, [loaded, error]);

  // Force render after 2 seconds regardless of font loading state
  const [forceRender, setForceRender] = useState(false);
  useEffect(() => {
    const forceTimeout = setTimeout(() => {
      console.log('RootLayout: Force rendering app after timeout');
      setForceRender(true);
      SplashScreen.hideAsync();
    }, 2000);

    return () => clearTimeout(forceTimeout);
  }, []);

  if (!loaded && !error && !forceRender) {
    console.log('RootLayout: Fonts not loaded yet, returning null');
    return null;
  }

  console.log('RootLayout: Fonts loaded or error occurred, rendering app');

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();
  const { checkSession } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('RootLayoutNav: Initializing auth');
      try {
        await checkSession();
        console.log('RootLayoutNav: Auth initialization completed');
      } catch (error) {
        console.error('RootLayoutNav: Failed to initialize auth:', error);
        // Continue anyway - the app should still work without auth
      }
    };

    initializeAuth();
  }, [checkSession]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: theme.card,
          },
          headerTintColor: theme.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: theme.textDark,
          },
        headerShadowVisible: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen
          name="organization/[id]"
          options={{
            title: "Organization Details",
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="donate/[id]"
          options={{
            title: "Make a Donation",
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Account Settings",
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="select-organization"
          options={{
            title: "Select Organization",
            presentation: 'card',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}