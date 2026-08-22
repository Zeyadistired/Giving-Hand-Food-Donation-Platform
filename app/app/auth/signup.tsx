import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Input from '@/Components/Input';
import Button from '@/Components/Buttons';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';

export default function SignupScreen() {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      padding: 24,
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
      marginBottom: 32,
    },
    form: {
      marginBottom: 24,
    },
    button: {
      marginTop: 8,
      marginBottom: 16,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
    loginText: {
      color: theme.textLight,
      fontSize: 14,
    },
    loginLink: {
      color: theme.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    orgSignupContainer: {
      marginTop: 24,
      alignItems: 'center',
    },
    orgSignupText: {
      color: theme.primary,
      fontSize: 14,
      fontWeight: '500',
      textDecorationLine: 'underline',
    },
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    location?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      phone?: string;
      location?: string;
    } = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      await signup(
        {
          name,
          email,
          phone,
          location,
          role: 'donor',
        },
        password
      );

      Alert.alert(
        'Account Created',
        'Your account has been created successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/tabs'),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Signup Failed',
        'There was an error creating your account. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up as a donor to start contributing</Text>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <Input
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            error={errors.phone}
          />

          <Input
            label="Location"
            placeholder="City, State"
            value={location}
            onChangeText={setLocation}
            error={errors.location}
          />

          <Button
            title="Sign Up"
            onPress={handleSignup}
            loading={isLoading}
            style={styles.button}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.orgSignupContainer}
            onPress={() => router.push('/auth/org-signup')}
          >
            <Text style={styles.orgSignupText}>
              Signing up as an organization? Click here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}