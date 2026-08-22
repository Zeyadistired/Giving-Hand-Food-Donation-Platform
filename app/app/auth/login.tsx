import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import Input from '@/Components/Input';
import Button from '@/Components/Buttons';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      await login(email, password);
      router.replace('/tabs');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        'Invalid email or password. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // For demo purposes
  const handleQuickLogin = (type: 'donor' | 'charity') => {
    if (type === 'donor') {
      setEmail('donor@example.com');
      setPassword('password');
    } else {
      setEmail('charity@example.com');
      setPassword('password');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 24,
    },
    header: {
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 40,
    },
    logoContainer: {
      marginBottom: 24,
    },
    logoCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoText: {
      color: theme.white,
      fontSize: 24,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.textDark,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textLight,
    },
    form: {
      marginBottom: 24,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 24,
    },
    forgotPasswordText: {
      color: theme.primary,
      fontSize: 14,
    },
    button: {
      marginBottom: 16,
      alignSelf: 'center',
      width: 150,
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
    signupText: {
      color: theme.textLight,
      fontSize: 14,
    },
    signupLink: {
      color: theme.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    demoContainer: {
      marginTop: 'auto',
      padding: 16,
      backgroundColor: theme.primaryLight,
      borderRadius: 16,
    },
    demoTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.primary,
      marginBottom: 12,
      textAlign: 'center',
    },
    demoButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    demoButton: {
      flex: 1,
      backgroundColor: theme.card,
      padding: 12,
      borderRadius: 12,
      alignItems: 'center',
    },
    demoButtonText: {
      color: theme.primary,
      fontWeight: '500',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>GH</Text>
          </View>
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue to GivingHand</Text>
      </View>

      <View style={styles.form}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          icon={<Mail size={20} color={theme.textLight} />}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          icon={<Lock size={20} color={theme.textLight} />}
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          title="Log In"
          onPress={handleLogin}
          loading={isLoading}
          style={styles.button}
        />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/signup')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Demo accounts */}
      <View style={styles.demoContainer}>
        <Text style={styles.demoTitle}>Demo Accounts</Text>
        <View style={styles.demoButtons}>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => handleQuickLogin('donor')}
          >
            <Text style={styles.demoButtonText}>Donor Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => handleQuickLogin('charity')}
          >
            <Text style={styles.demoButtonText}>Charity Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}