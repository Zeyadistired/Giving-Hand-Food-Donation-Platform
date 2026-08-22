import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import { useTheme } from '@/Components/ThemeProvider';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  variant = 'primary',
  loading = false,
  style,
  textStyle,
  disabled,
  icon,
  ...rest
}: ButtonProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    primaryButton: {
      backgroundColor: theme.primary,
    },
    secondaryButton: {
      backgroundColor: theme.secondary,
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.primary,
    },
    disabledButton: {
      backgroundColor: theme.inactive,
      borderColor: theme.inactive,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.white,
    },
    outlineButtonText: {
      color: theme.primary,
    },
    disabledText: {
      color: theme.textLight,
    },
    iconContainer: {
      marginRight: 8,
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' && styles.primaryButton,
        variant === 'secondary' && styles.secondaryButton,
        variant === 'outline' && styles.outlineButton,
        disabled && styles.disabledButton,
        style
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? theme.primary : theme.white}
        />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            style={[
              styles.buttonText,
              variant === 'outline' && styles.outlineButtonText,
              disabled && styles.disabledText,
              textStyle
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}