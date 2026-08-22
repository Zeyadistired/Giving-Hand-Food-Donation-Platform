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
import { useRouter } from 'expo-router';
import { DollarSign, Package } from 'lucide-react-native';
import { useTheme } from '@/Components/ThemeProvider';
import { useAuthStore } from '@/Store/authStore';
import { useOrganizationStore } from '@/Store/organizationStore';
import { useDonationStore } from '@/Store/donationStore';
import Input from '@/Components/Input';
import Button from '@/Components/Buttons';
import { Organization, UserRole } from '@/Types';

export default function DonateScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const { organizations, fetchOrganizations } = useOrganizationStore();
  const { makeDonation, isLoading } = useDonationStore();

  const [donationType, setDonationType] = useState<'money' | 'food'>('money');
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [amount, setAmount] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [currentStep, setCurrentStep] = useState<'organization' | 'donation'>('organization');

  // Food donation fields
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [expiryDate, setExpiryDate] = useState('');
  const [foodType, setFoodType] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<{
    organization?: string;
    amount?: string;
    foodName?: string;
    quantity?: string;
    expiryDate?: string;
    foodType?: string;
  }>({});

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const isOrganization = user?.role !== 'donor';

  // If user is a donor, they can only donate money
  useEffect(() => {
    if (!isOrganization) {
      setDonationType('money');
    }
  }, [isOrganization]);

  const validate = () => {
    const newErrors: {
      organization?: string;
      amount?: string;
      foodName?: string;
      quantity?: string;
      expiryDate?: string;
      foodType?: string;
    } = {};

    if (!selectedOrganization) {
      newErrors.organization = 'Please select an organization';
    }

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
    if (!validate() || !user || !selectedOrganization) return;

    try {
      if (donationType === 'money') {
        await makeDonation({
          donorId: user.id,
          donorName: user.name,
          recipientId: selectedOrganization.id,
          recipientName: selectedOrganization.name,
          type: 'money',
          amount: Number(amount),
          anonymous,
        });
      } else {
        await makeDonation({
          donorId: user.id,
          donorName: user.name,
          recipientId: selectedOrganization.id,
          recipientName: selectedOrganization.name,
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
        `Thank you for your ${donationType} donation to ${selectedOrganization.name}!`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setSelectedOrganization(null);
              setAmount('');
              setFoodName('');
              setQuantity('');
              setExpiryDate('');
              setFoodType('');
              setNotes('');
              setAnonymous(false);
              setCurrentStep('organization');

              // Navigate to home screen
              router.push('/tabs');
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
              // Reset to organization selection
              setCurrentStep('organization');
              // Navigate to home screen
              router.push('/tabs');
            },
          },
        ]
      );
    }
  };

  const handleOrganizationSelect = (org: Organization) => {
    setSelectedOrganization(org);
    setCurrentStep('donation');
  };

  const handleBackToOrganizations = () => {
    setCurrentStep('organization');
  };

  const renderOrganizationSelectionStep = () => {
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <Text style={styles.stepTitle}>Choose an Organization</Text>
          <Text style={styles.stepSubtitle}>
            Select the organization you'd like to support with your donation
          </Text>
        </View>

        <ScrollView
          style={styles.organizationsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.organizationsContent}
        >
          {organizations.map(org => (
            <TouchableOpacity
              key={org.id}
              style={styles.organizationCard}
              onPress={() => handleOrganizationSelect(org)}
              activeOpacity={0.8}
            >
              <View style={styles.orgCardContent}>
                <View style={styles.orgInfo}>
                  <Text style={styles.orgCardName} numberOfLines={1}>
                    {org.name}
                  </Text>
                  <Text style={styles.orgCardType}>
                    {org.role.charAt(0).toUpperCase() + org.role.slice(1)}
                  </Text>
                  <Text style={styles.orgCardDescription} numberOfLines={2}>
                    {org.description}
                  </Text>
                  <Text style={styles.orgCardLocation}>
                    📍 {org.location}
                  </Text>
                </View>
                <View style={styles.selectButton}>
                  <Text style={styles.selectButtonText}>Select</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
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
    stepContainer: {
      flex: 1,
      padding: 16,
    },
    stepHeader: {
      marginBottom: 24,
      padding: 16,
    },
    stepTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.textDark,
      marginBottom: 8,
    },
    stepSubtitle: {
      fontSize: 16,
      color: theme.textLight,
      lineHeight: 24,
    },
    backButton: {
      alignSelf: 'flex-start',
      marginBottom: 16,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: theme.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    backButtonText: {
      fontSize: 16,
      color: theme.primary,
      fontWeight: '600',
    },
    selectedOrgContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    selectedOrgText: {
      fontSize: 16,
      color: theme.textLight,
      flex: 1,
    },
    selectedOrgName: {
      fontWeight: '600',
      color: theme.primary,
    },
    changeOrgButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: theme.primaryLight,
      borderRadius: 6,
    },
    changeOrgText: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: '600',
    },
    organizationsList: {
      flex: 1,
    },
    organizationsContent: {
      paddingBottom: 20,
    },
    organizationCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.textDark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    orgCardContent: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    orgInfo: {
      flex: 1,
      marginRight: 16,
    },
    orgCardName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textDark,
      marginBottom: 4,
    },
    orgCardType: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: '600',
      marginBottom: 8,
    },
    orgCardDescription: {
      fontSize: 14,
      color: theme.textLight,
      lineHeight: 20,
      marginBottom: 8,
    },
    orgCardLocation: {
      fontSize: 12,
      color: theme.textLight,
    },
    selectButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    selectButtonText: {
      color: theme.white,
      fontSize: 14,
      fontWeight: '600',
    },
    header: {
      padding: 24,
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
    orgScrollContent: {
      paddingBottom: 8,
    },
    orgCard: {
      width: 150,
      height: 100,
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginRight: 12,
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.border,
    },
    orgCardSelected: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    orgName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.textDark,
    },
    orgNameSelected: {
      color: theme.white,
    },
    orgType: {
      fontSize: 14,
      color: theme.textLight,
    },
    orgTypeSelected: {
      color: theme.white,
    },
    donationTypeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    donationTypeButton: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginHorizontal: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    donationTypeButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
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
    },
    amountInput: {
      fontSize: 18,
      fontWeight: '600',
    },
    presetAmounts: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 16,
      gap: 12,
    },
    presetButton: {
      backgroundColor: theme.card,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: theme.border,
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
    column: {
      flex: 1,
      marginHorizontal: 8,
    },
    firstColumn: {
      marginLeft: 0,
    },
    lastColumn: {
      marginRight: 0,
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
      backgroundColor: theme.card,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginRight: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    unitButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
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
    errorText: {
      color: theme.error,
      fontSize: 14,
      marginTop: 8,
    },
    quantityInput: {
      flex: 1,
      marginRight: 16,
    },
    unitContainer: {
      flex: 1,
    },
  });

  const renderDonationStep = () => {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.stepHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToOrganizations}
          >
            <Text style={styles.backButtonText}>← Back to Organizations</Text>
          </TouchableOpacity>

          <Text style={styles.stepTitle}>Make Your Donation</Text>
          <View style={styles.selectedOrgContainer}>
            <Text style={styles.selectedOrgText}>
              Donating to: <Text style={styles.selectedOrgName}>{selectedOrganization?.name}</Text>
            </Text>
            <TouchableOpacity
              style={styles.changeOrgButton}
              onPress={handleBackToOrganizations}
            >
              <Text style={styles.changeOrgText}>Change</Text>
            </TouchableOpacity>
          </View>
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
              (donationType === 'money' && (!amount || isNaN(Number(amount)))) ||
              !selectedOrganization
            }
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {currentStep === 'organization' ? renderOrganizationSelectionStep() : renderDonationStep()}
    </View>
  );
}