import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  textLight: string;
  textDark: string;
  border: string;
  error: string;
  errorLight: string;
  success: string;
  warning: string;
  inactive: string;
  white: string;
  black: string;
  shadow: string;
}

export const lightTheme: Theme = {
  primary: '#45A761',
  primaryDark: '#3A8D52',
  primaryLight: '#E8F5EB',
  secondary: '#F5A623',
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  textDark: '#1A1A1A',
  border: '#EEEEEE',
  error: '#E53935',
  errorLight: '#FFEBEE',
  success: '#4CAF50',
  warning: '#FFC107',
  inactive: '#BDBDBD',
  white: '#FFFFFF',
  black: '#000000',
  shadow: 'rgba(0, 0, 0, 0.05)',
};

export const darkTheme: Theme = {
  primary: '#45A761',
  primaryDark: '#3A8D52',
  primaryLight: '#2D4A32',
  secondary: '#F5A623',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textLight: '#B3B3B3',
  textDark: '#FFFFFF',
  border: '#333333',
  error: '#EF5350',
  errorLight: '#4A1A1A',
  success: '#66BB6A',
  warning: '#FFCA28',
  inactive: '#666666',
  white: '#FFFFFF',
  black: '#000000',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

interface ThemeState {
  isDarkMode: boolean;
  theme: Theme;
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      theme: lightTheme,

      toggleTheme: () => {
        const { isDarkMode } = get();
        const newIsDarkMode = !isDarkMode;
        set({
          isDarkMode: newIsDarkMode,
          theme: newIsDarkMode ? darkTheme : lightTheme,
        });
      },

      setDarkMode: (isDark: boolean) => {
        set({
          isDarkMode: isDark,
          theme: isDark ? darkTheme : lightTheme,
        });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
