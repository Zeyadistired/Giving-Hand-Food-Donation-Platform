import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

interface BiometricState {
  isBiometricEnabled: boolean;
  isBiometricAvailable: boolean;
  biometricType: string | null;
  isAuthenticating: boolean;
  setBiometricEnabled: (enabled: boolean) => Promise<void>;
  checkBiometricAvailability: () => Promise<void>;
  authenticateWithBiometric: () => Promise<boolean>;
  initializeBiometric: () => Promise<void>;
}

export const useBiometricStore = create<BiometricState>()(
  persist(
    (set, get) => ({
      isBiometricEnabled: false,
      isBiometricAvailable: false,
      biometricType: null,
      isAuthenticating: false,

      setBiometricEnabled: async (enabled: boolean) => {
        if (enabled) {
          // Check if biometric is available before enabling
          const isAvailable = await LocalAuthentication.hasHardwareAsync();
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();
          
          if (!isAvailable || !isEnrolled) {
            throw new Error('Biometric authentication is not available or not set up on this device');
          }

          // Test biometric authentication before enabling
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Enable biometric authentication',
            fallbackLabel: 'Use passcode',
            disableDeviceFallback: false,
          });

          if (!result.success) {
            throw new Error('Biometric authentication failed');
          }
        }

        set({ isBiometricEnabled: enabled });
      },

      checkBiometricAvailability: async () => {
        console.log('BiometricStore: Checking biometric availability');

        // For iOS simulator, skip biometric checks to prevent hanging
        if (Platform.OS === 'ios' && __DEV__) {
          console.log('BiometricStore: iOS simulator detected, skipping biometric checks');
          set({
            isBiometricAvailable: false,
            biometricType: null,
          });
          return;
        }

        try {
          // Add aggressive timeout to prevent hanging
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Biometric check timeout')), 2000)
          );

          const [isAvailable, isEnrolled, supportedTypes] = await Promise.race([
            Promise.all([
              LocalAuthentication.hasHardwareAsync(),
              LocalAuthentication.isEnrolledAsync(),
              LocalAuthentication.supportedAuthenticationTypesAsync(),
            ]),
            timeoutPromise
          ]) as any;

          let biometricType = null;
          if (Platform.OS === 'ios') {
            if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
              biometricType = 'Face ID';
            } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
              biometricType = 'Touch ID';
            }
          } else {
            if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
              biometricType = 'Fingerprint';
            } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
              biometricType = 'Face Recognition';
            }
          }

          console.log('BiometricStore: Availability check complete - available:', isAvailable, 'enrolled:', isEnrolled, 'type:', biometricType);
          set({
            isBiometricAvailable: isAvailable && isEnrolled,
            biometricType,
          });
        } catch (error) {
          console.error('BiometricStore: Error checking biometric availability:', error);
          set({
            isBiometricAvailable: false,
            biometricType: null,
          });
        }
      },

      authenticateWithBiometric: async (): Promise<boolean> => {
        console.log('BiometricStore: Starting biometric authentication');

        const { isBiometricEnabled, isBiometricAvailable } = get();

        if (!isBiometricEnabled || !isBiometricAvailable) {
          console.log('BiometricStore: Biometric not enabled or available');
          return false;
        }

        // For iOS simulator, always return false
        if (Platform.OS === 'ios' && __DEV__) {
          console.log('BiometricStore: iOS simulator detected, skipping biometric authentication');
          return false;
        }

        set({ isAuthenticating: true });

        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Authentication timeout')), 30000)
          );

          const result = await Promise.race([
            LocalAuthentication.authenticateAsync({
              promptMessage: 'Authenticate to access the app',
              fallbackLabel: 'Use passcode',
              disableDeviceFallback: false,
            }),
            timeoutPromise
          ]) as any;

          set({ isAuthenticating: false });
          console.log('BiometricStore: Authentication result:', result.success);
          return result.success;
        } catch (error) {
          console.error('BiometricStore: Biometric authentication error:', error);
          set({ isAuthenticating: false });
          return false;
        }
      },

      initializeBiometric: async () => {
        console.log('BiometricStore: Initializing biometric');
        try {
          await get().checkBiometricAvailability();
          console.log('BiometricStore: Biometric initialization completed');
        } catch (error) {
          console.error('BiometricStore: Failed to initialize biometric:', error);
          // Continue anyway - app should work without biometric
        }
      },
    }),
    {
      name: 'biometric-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isBiometricEnabled: state.isBiometricEnabled,
      }),
    }
  )
);
