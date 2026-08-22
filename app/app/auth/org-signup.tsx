import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Upload } from 'lucide-react-native';
import Input from '@/Components/Input';
import Button from '@/Components/Buttons';
import Colors from '@/Constants/colors';
import { useAuthStore } from '@/Store/authStore';
import { UserRole } from '@/Types';

export default function OrgSignupScreen() {
  const router = useRouter();
  const { signup, isLoading } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState<UserRole>('charity');
  const [license, setLicense] = useState<string | null>(null);
  const [certification, setCertification] = useState<string | null>(null);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    location?: string;
    description?: string;
    license?: string;
    certification?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      phone?: string;
      location?: string;
      description?: string;
      license?: string;
      certification?: string;
    } = {};

    if (!name) {
      newErrors.name = 'Organization name is required';
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

    if (!description) {
      newErrors.description = 'Description is required';
    }

    if (!license) {
      newErrors.license = 'Trade license is required';
    }

    if (!certification) {
      newErrors.certification = 'Certification is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickDocument = async (type: 'license' | 'certification') => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        if (type === 'license') {
          setLicense(result.assets[0].uri);
        } else {
          setCertification(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
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
          role,
          description,
        },
        password,
        {
          license,
          certification,
        }
      );

      Alert.alert(
        'Account Pending Approval',
        'Your organization account has been created and is pending approval. You will be notified once approved.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/auth/login'),
          },
        ]
      );
    } catch (error) {
      console.error('Organization signup error:', error);
      Alert.alert(
        'Signup Failed',
        error.message || 'There was an error creating your account. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Organization Sign Up</Text>
        <Text style={styles.subtitle}>
          Create an account for your organization to participate in food donation
        </Text>

        <View style={styles.form}>
          <Input
            label="Organization Name"
            placeholder="Enter organization name"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

          <Input
            label="Email"
            placeholder="Enter organization email"
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
            placeholder="Enter organization phone"
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

          <Input
            label="Description"
            placeholder="Describe your organization"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            error={errors.description}
          />

          <Text style={styles.label}>Organization Type</Text>
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'charity' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('charity')}
            >
              <Text
                style={[
                  styles.roleText,
                  role === 'charity' && styles.roleTextActive,
                ]}
              >
                Charity
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'shelter' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('shelter')}
            >
              <Text
                style={[
                  styles.roleText,
                  role === 'shelter' && styles.roleTextActive,
                ]}
              >
                Shelter
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'factory' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('factory')}
            >
              <Text
                style={[
                  styles.roleText,
                  role === 'factory' && styles.roleTextActive,
                ]}
              >
                Factory
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'supermarket' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('supermarket')}
            >
              <Text
                style={[
                  styles.roleText,
                  role === 'supermarket' && styles.roleTextActive,
                ]}
              >
                Supermarket
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'hotel' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('hotel')}
            >
              <Text
                style={[
                  styles.roleText,
                  role === 'hotel' && styles.roleTextActive,
                ]}
              >
                Hotel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'restaurant' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('restaurant')}
            >
              <Text
                style={[
                  styles.roleText,
                  role === 'restaurant' && styles.roleTextActive,
                ]}
              >
                Restaurant
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Upload Documents</Text>
          <Text style={styles.docInfo}>
            Please upload your trade license and certification documents
          </Text>

          <View style={styles.uploadContainer}>
            <TouchableOpacity
              style={[
                styles.uploadButton,
                license ? styles.uploadButtonSuccess : null,
                errors.license ? styles.uploadButtonError : null,
              ]}
              onPress={() => pickDocument('license')}
            >
              <Upload
                size={24}
                color={license ? Colors.success : Colors.textLight}
              />
              <Text
                style={[
                  styles.uploadText,
                  license ? styles.uploadTextSuccess : null,
                ]}
              >
                {license ? 'License Uploaded' : 'Upload Trade License'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.uploadButton,
                certification ? styles.uploadButtonSuccess : null,
                errors.certification ? styles.uploadButtonError : null,
              ]}
              onPress={() => pickDocument('certification')}
            >
              <Upload
                size={24}
                color={certification ? Colors.success : Colors.textLight}
              />
              <Text
                style={[
                  styles.uploadText,
                  certification ? styles.uploadTextSuccess : null,
                ]}
              >
                {certification ? 'Certification Uploaded' : 'Upload Certification'}
              </Text>
            </TouchableOpacity>
          </View>

          {errors.license && <Text style={styles.errorText}>{errors.license}</Text>}
          {errors.certification && <Text style={styles.errorText}>{errors.certification}</Text>}

          <Text style={styles.approvalNote}>
            Note: Organization accounts require admin approval before activation
          </Text>

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 8,
  },
  roleButtonActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  roleText: {
    color: Colors.textLight,
    fontWeight: '500',
  },
  roleTextActive: {
    color: Colors.primary,
  },
  docInfo: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 16,
  },
  uploadContainer: {
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    borderStyle: 'dashed',
    marginBottom: 12,
  },
  uploadButtonSuccess: {
    borderColor: Colors.success,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  uploadButtonError: {
    borderColor: Colors.error,
  },
  uploadText: {
    marginLeft: 8,
    color: Colors.textLight,
  },
  uploadTextSuccess: {
    color: Colors.success,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    marginBottom: 16,
  },
  approvalNote: {
    fontSize: 14,
    color: Colors.textLight,
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
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
    color: Colors.textLight,
    fontSize: 14,
  },
  loginLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});