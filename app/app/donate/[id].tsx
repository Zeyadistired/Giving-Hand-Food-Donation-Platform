import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { DollarSign, Package } from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';
import { useOrganizationStore } from '@/Store/organizationStore';
import { useDonationStore } from '@/Store/donationStore';
import Input from '@/Components/Input';
import Button from '@/Components/Buttons';
import { Organization, UserRole } from '@/Types';

export default function DonateToOrganizationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const { getOrganizationById, organizations, fetchOrganizations } = useOrganizationStore();
  const { makeDonation, isLoading } = useDonationStore();

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [donationType, setDonationType] = useState<'money' | 'food'>('money');
  const [amount, setAmount] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  // Food donation fields
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [expiryDate, setExpiryDate] = useState('');
  const [foodType, setFoodType] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<{
    amount?: string;
    foodName?: string;
    quantity?: string;
    expiryDate?: string;
    foodType?: string;
  }>({});

  useEffect(() => {
    if (organizations.length === 0) {
      fetchOrganizations();
    } else {
      const org = getOrganizationById(id as string);
      setOrganization(org || null);
    }
  }, [id, organizations]);

  useEffect(() => {
    if (organizations.length > 0) {
      const org = getOrganizationById(id as string);
      setOrganization(org || null);
    }
  }, [organizations]);

  const isOrganization = user?.role !== 'donor';

  // If user is a donor, they can only donate money
  useEffect(() => {
    if (!isOrganization) {
      setDonationType('money');
    }
  }, [isOrganization]);

  const validate = () => {
    const newErrors: {
      amount?: string;
      foodName?: string;
      quantity?: string;
      expiryDate?: string;
      foodType?: string;
    } = {};

    if (donationType === 'money') {
      if (!amount) {
        newErrors.amount = 'Amount is required';
      } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
        newErrors.amount = 'Please enter a valid amount';
      }
    } else {
      if (!foodName) {
        newErrors.foodName = 'Food name is required';
      }

      if (!quantity) {
        newErrors.quantity = 'Quantity is required';
      } else if (isNaN(Number(quantity)) || Number(quantity) <= 0) {
        newErrors.quantity = 'Please enter a valid quantity';
      }

      if (!expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      }

      if (!foodType) {
        newErrors.foodType = 'Food type is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDonate = async () => {
    if (!validate() || !user || !organization) return;

    try {
      if (donationType === 'money') {
        await makeDonation({
          donorId: user.id,
          donorName: user.name,
          recipientId: organization.id,
          recipientName: organization.name,
          type: 'money',
          amount: Number(amount),
          anonymous,
        });
      } else {
        await makeDonation({
          donorId: user.id,
          donorName: user.name,
          recipientId: organization.id,
          recipientName: organization.name,
          type: 'food',
          anonymous,
          foodDetails: {
            name: foodName,
            quantity: Number(quantity),
            unit,
            expiryDate,
            foodType,
            notes,
          },
        });
      }

      Alert.alert(
        'Donation Successful',
        `Thank you for your ${donationType} donation to ${organization.name}!`,
        [
          {
            text: 'OK',
            onPress: () => {
              router.replace('/tabs');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Donation Failed',
        'There was an error processing your donation. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => {
              router.replace('/tabs');
            },
          },
        ]
      );
    }
  };

  const renderDonationTypeSelector = () => {
    if (!isOrganization) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Donation Type</Text>

        <View style={styles.donationTypeContainer}>
          <TouchableOpacity
            style={[
              styles.donationTypeButton,
              donationType === 'money' && styles.donationTypeButtonActive,
            ]}
            onPress={() => setDonationType('money')}
          >
            <DollarSign
              size={24}
              color={donationType === 'money' ? theme.white : theme.textLight}
            />
            <Text
              style={[
                styles.donationTypeText,
                donationType === 'money' && styles.donationTypeTextActive,
              ]}
            >
              Money
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.donationTypeButton,
              donationType === 'food' && styles.donationTypeButtonActive,
            ]}
            onPress={() => setDonationType('food')}
          >
            <Package
              size={24}
              color={donationType === 'food' ? theme.white : theme.textLight}
            />
            <Text
              style={[
                styles.donationTypeText,
                donationType === 'food' && styles.donationTypeTextActive,
              ]}
            >
              Food
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMoneyDonationForm = () => {
    if (donationType !== 'money') return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Donation Amount</Text>

        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>EGP</Text>
          <Input
            placeholder="0.00"
            keyboardType="numeric"
            returnKeyType="done"
            value={amount}
            onChangeText={setAmount}
            error={errors.amount}
            containerStyle={styles.amountInputContainer}
            style={styles.amountInput}
          />
        </View>

        <View style={styles.presetAmounts}>
          {[50, 100, 250, 500].map(presetAmount => (
            <TouchableOpacity
              key={presetAmount}
              style={styles.presetButton}
              onPress={() => setAmount(presetAmount.toString())}
            >
              <Text style={styles.presetText}>EGP {presetAmount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderFoodDonationForm = () => {
    if (donationType !== 'food') return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Food Donation Details</Text>

        <Input
          label="Food Name"
          placeholder="e.g., Canned Goods, Rice, Vegetables"
          value={foodName}
          onChangeText={setFoodName}
          error={errors.foodName}
        />

        <View style={styles.row}>
          <Input
            label="Quantity"
            placeholder="Amount"
            keyboardType="numeric"
            returnKeyType="done"
            value={quantity}
            onChangeText={setQuantity}
            error={errors.quantity}
            containerStyle={styles.quantityInput}
          />

          <View style={styles.unitContainer}>
            <Text style={styles.label}>Unit</Text>
            <View style={styles.unitSelector}>
              {['kg', 'lbs', 'items', 'boxes'].map(unitOption => (
                <TouchableOpacity
                  key={unitOption}
                  style={[
                    styles.unitButton,
                    unit === unitOption && styles.unitButtonActive,
                  ]}
                  onPress={() => setUnit(unitOption)}
                >
                  <Text
                    style={[
                      styles.unitText,
                      unit === unitOption && styles.unitTextActive,
                    ]}
                  >
                    {unitOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <Input
          label="Expiry Date"
          placeholder="YYYY-MM-DD"
          value={expiryDate}
          onChangeText={setExpiryDate}
          error={errors.expiryDate}
        />

        <Input
          label="Food Type"
          placeholder="e.g., Non-perishable, Fresh, Frozen"
          value={foodType}
          onChangeText={setFoodType}
          error={errors.foodType}
        />

        <Input
          label="Additional Notes (Optional)"
          placeholder="Any special handling instructions or details"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    loadingText: {
      fontSize: 16,
      color: theme.textLight,
    },
    header: {
      padding: 24,
      paddingTop: 16,
      backgroundColor: theme.card,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.textDark,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: theme.textLight,
    },
    section: {
      padding: 24,
      backgroundColor: theme.card,
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textDark,
      marginBottom: 16,
    },
    donationTypeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    donationTypeButton: {
      flex: 1,
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginHorizontal: 8,
    },
    donationTypeButtonActive: {
      backgroundColor: theme.primary,
    },
    donationTypeText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.textLight,
      marginTop: 8,
    },
    donationTypeTextActive: {
      color: theme.white,
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    currencySymbol: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.textDark,
      marginRight: 12,
      minWidth: 50,
    },
    amountInputContainer: {
      flex: 1,
      marginBottom: 0,
    },
    amountInput: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    presetAmounts: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 16,
      gap: 12,
    },
    presetButton: {
      backgroundColor: theme.background,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      flex: 1,
      alignItems: 'center',
      maxWidth: 80,
    },
    presetText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.textDark,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    quantityInput: {
      flex: 1,
      marginRight: 16,
    },
    unitContainer: {
      flex: 1,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
      marginBottom: 8,
    },
    unitSelector: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    unitButton: {
      backgroundColor: theme.background,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginRight: 8,
      marginBottom: 8,
    },
    unitButtonActive: {
      backgroundColor: theme.primary,
    },
    unitText: {
      fontSize: 14,
      color: theme.textLight,
    },
    unitTextActive: {
      color: theme.white,
    },
    notesInput: {
      height: 100,
      textAlignVertical: 'top',
      paddingTop: 12,
    },
    anonymousContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    anonymousTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.textDark,
      marginBottom: 4,
    },
    anonymousSubtitle: {
      fontSize: 14,
      color: theme.textLight,
    },
    donateButton: {
      paddingVertical: 16,
    },
  });

  if (!organization) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading organization...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: `Donate to ${organization.name}` }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Donate to {organization.name}</Text>
        <Text style={styles.headerSubtitle}>
          Your contribution helps support their mission
        </Text>
      </View>

      {renderDonationTypeSelector()}
      {renderMoneyDonationForm()}
      {renderFoodDonationForm()}

      <View style={styles.section}>
        <View style={styles.anonymousContainer}>
          <View>
            <Text style={styles.anonymousTitle}>Donate Anonymously</Text>
            <Text style={styles.anonymousSubtitle}>
              Your name will not be visible to the recipient
            </Text>
          </View>
          <Switch
            value={anonymous}
            onValueChange={setAnonymous}
            trackColor={{ false: theme.inactive, true: theme.primaryLight }}
            thumbColor={anonymous ? theme.primary : theme.white}
          />
        </View>

        <Button
          title={`Donate ${donationType === 'money' ? 'EGP ' + (amount || '0') : 'Food'}`}
          onPress={handleDonate}
          loading={isLoading}
          style={styles.donateButton}
          disabled={
            (donationType === 'money' && (!amount || isNaN(Number(amount))))
          }
        />
      </View>
    </ScrollView>
  );
}