export type UserRole = 'donor' | 'charity' | 'shelter' | 'factory' | 'supermarket' | 'hotel' | 'restaurant';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
  approved: boolean;
  createdAt: string;
  profileImage?: string;
  description?: string;
}

export interface Organization extends User {
  description: string;
  licenseUrl?: string;
  certificationUrl?: string;
}

export type DonationType = 'money' | 'food';

export interface Donation {
  id: string;
  amount?: number;
  donorId: string;
  donorName: string;
  recipientId: string;
  recipientName: string;
  type: DonationType;
  anonymous: boolean;
  createdAt: string;
  status: 'pending' | 'fulfilled' | 'cancelled';
  foodDetails?: FoodDonation;
}

export interface FoodDonation {
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  foodType: string;
  notes?: string;
}

export interface DonationStats {
  totalReceived: number;
  totalGiven: number;
  pendingCount: number;
  fulfilledCount: number;
  cancelledCount: number;
}

export interface DonationTicket {
  id: string;
  title: string;
  description: string;
  expiryDate: string; // expiry_date
  datePlaced?: string; // date_placed
  deliveryMethod: 'pickup' | 'delivery'; // pickup_method (self_delivery/courier)
  organizationName: string;
  organizationId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  weight: number; // total_weight in kg
  itemCount: number; // item_count
  needsFreezing: boolean; // storage_temperature (frozen/refrigerated/room_temp)
  storageTemperature?: 'frozen' | 'refrigerated' | 'room_temp'; // storage_temperature
  items: string[]; // list of food items
  pickupAddress?: string; // for pickup method
  deliveryAddress?: string; // for delivery method
  contactPerson: string;
  contactPhone: string;
  donorContactInfo?: string; // donor_contact_info
  specialInstructions?: string;
}