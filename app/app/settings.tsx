import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import {
  ArrowLeft,
  User as UserIcon,
  Mail,
  Lock,
  Palette,
  Shield,
  Trash2,
  Camera,
  ChevronRight,
  Fingerprint,
} from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';
import { useBiometricStore } from '@/Store/biometricStore';
import Button from '@/Components/Buttons';
import Card from '@/Components/Card';
import Input from '@/Components/Input';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { user, updateUser, deleteAccount, logout } = useAuthStore();
  const {
    isBiometricEnabled,
    isBiometricAvailable,
    biometricType,
    setBiometricEnabled,
    initializeBiometric
  } = useBiometricStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  useEffect(() => {
    initializeBiometric();
  }, [initializeBiometric]);

  const handleBiometricToggle = async (enabled: boolean) => {
    try {
      await setBiometricEnabled(enabled);
    } catch (error) {
      Alert.alert(
        'Biometric Authentication',
        error instanceof Error ? error.message : 'Failed to enable biometric authentication',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSaveProfile = async () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        await updateUser({ name, email });
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated successfully');
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChangePassword = async () => {
    const newErrors: typeof errors = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Simulate password change API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsChangingPassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        Alert.alert('Success', 'Password changed successfully');
      } catch (error) {
        Alert.alert('Error', 'Failed to change password');
      } finally {
        setIsLoading(false);
      }
    }
  };



  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Final Confirmation',
              'This will permanently delete your account and all associated data.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete Forever',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await deleteAccount();
                      router.replace('/auth');
                    } catch (error) {
                      Alert.alert('Error', 'Failed to delete account');
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleProfilePictureChange = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library', 'Remove Photo'],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 3,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 1:
              Alert.alert('Camera', 'Camera functionality would be implemented here');
              break;
            case 2:
              Alert.alert('Photo Library', 'Photo library functionality would be implemented here');
              break;
            case 3:
              Alert.alert('Remove Photo', 'Photo removed');
              break;
          }
        }
      );
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'charity': return 'Charity';
      case 'shelter': return 'Shelter';
      case 'factory': return 'Food Factory';
      default: return 'Donor';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    section: {
      margin: 16,
      marginBottom: 8,
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textDark,
      marginBottom: 16,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 24,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    profileInitials: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    initialsText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.white,
    },
    cameraIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.primary,
      borderRadius: 12,
      padding: 4,
      borderWidth: 2,
      borderColor: theme.white,
    },
    editForm: {
      gap: 16,
    },
    profileInfo: {
      gap: 16,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    infoLabel: {
      fontSize: 16,
      color: theme.textLight,
      fontWeight: '500',
    },
    infoValue: {
      fontSize: 16,
      color: theme.textDark,
      fontWeight: '600',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 8,
    },
    button: {
      flex: 1,
    },
    cancelButton: {
      borderColor: theme.textLight,
    },
    saveButton: {
      backgroundColor: theme.primary,
    },
    editButton: {
      marginTop: 8,
    },
    passwordForm: {
      gap: 16,
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
    roleInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    currentRole: {
      fontSize: 14,
      color: theme.textLight,
      fontWeight: '500',
    },
    dangerSection: {
      borderColor: theme.error + '30',
      borderWidth: 1,
      borderRadius: 16,
    },
    dangerTitle: {
      color: theme.error,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
    dangerItem: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.error,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 24,
      marginTop: 4,
    },
    dangerIconContainer: {
      backgroundColor: theme.error + '20',
      borderRadius: 8,
      width: 32,
      height: 32,
    },
    dangerText: {
      color: theme.error,
      fontSize: 16,
      fontWeight: '600',
    },
    dangerDescription: {
      color: theme.textLight,
      fontSize: 12,
      marginTop: 4,
      lineHeight: 16,
    },
  });

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
      <Stack.Screen 
        options={{ 
          title: 'Account Settings',
          headerBackTitle: 'Profile',
        }} 
      />

      {/* Profile Section */}
      <Card variant="elevated" style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handleProfilePictureChange}>
            {user?.profileImage ? (
              <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileInitials}>
                <Text style={styles.initialsText}>
                  {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.cameraIcon}>
              <Camera size={16} color={theme.white} />
            </View>
          </TouchableOpacity>
        </View>

        {isEditing ? (
          <View style={styles.editForm}>
            <Input
              label="Full Name"
              value={name}
              onChangeText={setName}
              error={errors.name}
              icon={<UserIcon size={16} color={theme.primary} />}
            />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<Mail size={16} color={theme.primary} />}
            />

            <View style={styles.buttonRow}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => {
                  setIsEditing(false);
                  setName(user?.name || '');
                  setEmail(user?.email || '');
                  setErrors({});
                }}
                style={[styles.button, styles.cancelButton]}
              />
              <Button
                title="Save"
                onPress={handleSaveProfile}
                loading={isLoading}
                style={[styles.button, styles.saveButton]}
              />
            </View>
          </View>
        ) : (
          <View style={styles.profileInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{user?.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Account Type</Text>
              <Text style={styles.infoValue}>{getRoleLabel(user?.role || 'donor')}</Text>
            </View>
            
            <Button
              title="Edit Profile"
              variant="outline"
              onPress={() => setIsEditing(true)}
              style={styles.editButton}
            />
          </View>
        )}
      </Card>

      {/* Security Section */}
      <Card variant="elevated" style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>

        {isChangingPassword ? (
          <View style={styles.passwordForm}>
            <Input
              label="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              error={errors.currentPassword}
              secureTextEntry
              icon={<Lock size={16} color={theme.primary} />}
            />

            <Input
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              error={errors.newPassword}
              secureTextEntry
              icon={<Lock size={16} color={theme.primary} />}
            />

            <Input
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
              secureTextEntry
              icon={<Lock size={16} color={theme.primary} />}
            />

            <View style={styles.buttonRow}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => {
                  setIsChangingPassword(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setErrors({});
                }}
                style={[styles.button, styles.cancelButton]}
              />
              <Button
                title="Change Password"
                onPress={handleChangePassword}
                loading={isLoading}
                style={[styles.button, styles.saveButton]}
              />
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setIsChangingPassword(true)}
          >
            <View style={styles.settingLeft}>
              <View style={styles.settingIconContainer}>
                <Lock size={16} color={theme.primary} />
              </View>
              <Text style={styles.settingText}>Change Password</Text>
            </View>
            <ChevronRight size={16} color={theme.textLight} />
          </TouchableOpacity>
        )}

        {isBiometricAvailable && (
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconContainer}>
                <Fingerprint size={16} color={theme.primary} />
              </View>
              <Text style={styles.settingText}>
                {biometricType || 'Biometric Authentication'}
              </Text>
            </View>
            <Switch
              value={isBiometricEnabled}
              onValueChange={handleBiometricToggle}
              trackColor={{ false: theme.inactive, true: theme.primaryLight }}
              thumbColor={isBiometricEnabled ? theme.primary : theme.white}
            />
          </View>
        )}
      </Card>

      {/* Preferences Section */}
      <Card variant="elevated" style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={[styles.settingItem, styles.lastSettingItem]}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIconContainer}>
              <Palette size={16} color={theme.primary} />
            </View>
            <Text style={[styles.settingText, { color: theme.textDark }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.inactive, true: theme.primaryLight }}
            thumbColor={isDarkMode ? theme.primary : theme.white}
          />
        </View>


      </Card>

      {/* Danger Zone */}
      <Card variant="elevated" style={[styles.section, styles.dangerSection]}>
        <Text style={[styles.sectionTitle, styles.dangerTitle]}>Danger Zone</Text>

        <TouchableOpacity
          style={[styles.dangerItem]}
          onPress={handleDeleteAccount}
          activeOpacity={0.7}
        >
          <View style={styles.settingLeft}>
            <View style={[styles.settingIconContainer, styles.dangerIconContainer]}>
              <Trash2 size={16} color={theme.error} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.settingText, styles.dangerText]}>Delete Account</Text>
              <Text style={styles.dangerDescription}>
                Permanently delete your account and all associated data
              </Text>
            </View>
          </View>
          <ChevronRight size={16} color={theme.error} />
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
}


