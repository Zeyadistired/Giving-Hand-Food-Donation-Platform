import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import { useAuthStore } from '@/Store/authStore';
import { useBiometricStore } from '@/Store/biometricStore';
import { useTheme } from '@/Components/ThemeProvider';
import Button from '@/Components/Buttons';

export default function Page() {
  console.log('Index: Page component mounted');
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const {
    isBiometricEnabled,
    authenticateWithBiometric,
    initializeBiometric,
    isAuthenticating
  } = useBiometricStore();
  const { theme } = useTheme();

  const [needsBiometricAuth, setNeedsBiometricAuth] = useState(false);
  const [biometricAuthFailed, setBiometricAuthFailed] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    console.log('Index: Initializing biometric');
    initializeBiometric();
  }, [initializeBiometric]);

  // Add timeout for loading state to prevent infinite white screen
  useEffect(() => {
    console.log('Index: Setting up loading timeout');
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Index: Loading timeout reached, forcing navigation to auth');
        setLoadingTimeout(true);
        router.replace('/auth');
      }
    }, 5000); // Reduced to 5 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading, router]);

  // Add emergency fallback timeout
  useEffect(() => {
    console.log('Index: Setting up emergency fallback timeout');
    const emergencyTimeout = setTimeout(() => {
      console.warn('Index: Emergency timeout - forcing navigation to auth regardless of state');
      router.replace('/auth');
    }, 8000); // 8 second emergency timeout

    return () => clearTimeout(emergencyTimeout);
  }, [router]);

  useEffect(() => {
    console.log('Index: Auth state changed - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated, 'isBiometricEnabled:', isBiometricEnabled);

    if (!isLoading) {
      if (isAuthenticated) {
        if (isBiometricEnabled) {
          console.log('Index: User authenticated, biometric enabled - showing biometric auth');
          setNeedsBiometricAuth(true);
        } else {
          console.log('Index: User authenticated, no biometric - navigating to tabs');
          router.replace('/tabs');
        }
      } else {
        console.log('Index: User not authenticated - navigating to auth');
        router.replace('/auth');
      }
    }
  }, [isAuthenticated, isLoading, isBiometricEnabled, router]);

  const handleBiometricAuth = async () => {
    try {
      const success = await authenticateWithBiometric();
      if (success) {
        setNeedsBiometricAuth(false);
        setBiometricAuthFailed(false);
        router.replace('/tabs');
      } else {
        setBiometricAuthFailed(true);
      }
    } catch (error) {
      setBiometricAuthFailed(true);
      Alert.alert(
        'Authentication Error',
        'Failed to authenticate with biometrics. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSkipBiometric = () => {
    setNeedsBiometricAuth(false);
    setBiometricAuthFailed(false);
    router.replace('/tabs');
  };

  // Show biometric authentication screen
  if (needsBiometricAuth) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
        padding: 24
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: theme.textDark,
          marginBottom: 16,
          textAlign: 'center'
        }}>
          Authenticate to Continue
        </Text>

        <Text style={{
          fontSize: 16,
          color: theme.textLight,
          marginBottom: 32,
          textAlign: 'center'
        }}>
          Use your biometric authentication to access the app
        </Text>

        {biometricAuthFailed && (
          <Text style={{
            fontSize: 14,
            color: theme.error,
            marginBottom: 16,
            textAlign: 'center'
          }}>
            Authentication failed. Please try again.
          </Text>
        )}

        <Button
          title={isAuthenticating ? "Authenticating..." : "Authenticate"}
          onPress={handleBiometricAuth}
          disabled={isAuthenticating}
          style={{ marginBottom: 16, width: '100%' }}
        />

        <Button
          title="Skip"
          onPress={handleSkipBiometric}
          variant="outline"
          style={{ width: '100%' }}
        />
      </View>
    );
  }

  // Show loading spinner while checking auth state
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
      <ActivityIndicator size="large" color={theme.primary} />
      {loadingTimeout && (
        <Text style={{ color: theme.text, marginTop: 16, textAlign: 'center' }}>
          Taking longer than expected...{'\n'}Redirecting to login
        </Text>
      )}
    </View>
  );
}
