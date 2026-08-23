import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Override via a `.env` file (see .env.example): EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://jgpuwacstfbtpubvhsxa.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpncHV3YWNzdGZidHB1YnZoc3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODc3NTMsImV4cCI6MjA2NjQ2Mzc1M30.6Cw3ZwiC8W-kxTd4FNIR27UWqKjgd06cFa72WxeXAyU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Test Supabase connection on initialization
console.log('Supabase: Client initialized');

// Add a simple connection test
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase: Initial connection test failed:', error);
  } else {
    console.log('Supabase: Initial connection test successful');
  }
}).catch((error) => {
  console.error('Supabase: Connection test error:', error);
});

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          auth_id?: string;
          name: string;
          email: string;
          phone?: string;
          location?: string;
          role: 'donor' | 'charity' | 'shelter' | 'factory' | 'supermarket' | 'hotel' | 'restaurant';
          approved?: boolean;
          description?: string;
          profile_image_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: string;
          auth_id?: string;
          name: string;
          email: string;
          phone?: string;
          location?: string;
          role: 'donor' | 'charity' | 'shelter' | 'factory' | 'supermarket' | 'hotel' | 'restaurant';
          approved?: boolean;
          description?: string;
          profile_image_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_id?: string;
          name?: string;
          email?: string;
          phone?: string;
          location?: string;
          role?: 'donor' | 'charity' | 'shelter' | 'factory' | 'supermarket' | 'hotel' | 'restaurant';
          approved?: boolean;
          description?: string;
          profile_image_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      money_donations: {
        Row: {
          id: string;
          donor_id?: string;
          recipient_id?: string;
          amount: number;
          anonymous?: boolean;
          status?: 'pending' | 'fulfilled' | 'cancelled';
          transaction_method?: string;
          admin_approved?: boolean;
          admin_approved_at?: string;
          admin_approved_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: string;
          donor_id?: string;
          recipient_id?: string;
          amount: number;
          anonymous?: boolean;
          status?: 'pending' | 'fulfilled' | 'cancelled';
          transaction_method?: string;
          admin_approved?: boolean;
          admin_approved_at?: string;
          admin_approved_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          donor_id?: string;
          recipient_id?: string;
          amount?: number;
          anonymous?: boolean;
          status?: 'pending' | 'fulfilled' | 'cancelled';
          transaction_method?: string;
          admin_approved?: boolean;
          admin_approved_at?: string;
          admin_approved_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      donation_tickets: {
        Row: {
          id: string;
          title: string;
          description?: string;
          expiry_date?: string;
          delivery_method: 'pickup' | 'delivery';
          organization_id?: string;
          organization_name: string;
          status?: string;
          weight?: number;
          item_count?: number;
          needs_freezing?: boolean;
          items?: string[];
          pickup_address?: string;
          delivery_address?: string;
          contact_person?: string;
          contact_phone?: string;
          special_instructions?: string;
          admin_approved?: boolean;
          admin_approved_at?: string;
          admin_approved_by?: string;
          recipient_id?: string;
          date_placed?: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          expiry_date?: string;
          delivery_method: 'pickup' | 'delivery';
          organization_id?: string;
          organization_name: string;
          status?: string;
          weight?: number;
          item_count?: number;
          needs_freezing?: boolean;
          items?: string[];
          pickup_address?: string;
          delivery_address?: string;
          contact_person?: string;
          contact_phone?: string;
          special_instructions?: string;
          admin_approved?: boolean;
          admin_approved_at?: string;
          admin_approved_by?: string;
          recipient_id?: string;
          date_placed?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          expiry_date?: string;
          delivery_method?: 'pickup' | 'delivery';
          organization_id?: string;
          organization_name?: string;
          status?: string;
          weight?: number;
          item_count?: number;
          needs_freezing?: boolean;
          items?: string[];
          pickup_address?: string;
          delivery_address?: string;
          contact_person?: string;
          contact_phone?: string;
          special_instructions?: string;
          admin_approved?: boolean;
          admin_approved_at?: string;
          admin_approved_by?: string;
          recipient_id?: string;
          date_placed?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
