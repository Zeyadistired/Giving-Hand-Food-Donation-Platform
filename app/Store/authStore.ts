import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '@/Types';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User>, password: string, documents?: { license?: string; certification?: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      checkSession: async () => {
        console.log('AuthStore: Starting session check');
        set({ isLoading: true });

        try {
          // Add timeout to prevent hanging
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Session check timeout')), 8000)
          );

          console.log('AuthStore: Checking Supabase session');
          // Check if there's an active Supabase Auth session
          const { data: { session }, error } = await Promise.race([
            supabase.auth.getSession(),
            timeoutPromise
          ]) as any;

          if (error) {
            console.error('AuthStore: Supabase session error:', error);
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return;
          }

          if (!session) {
            console.log('AuthStore: No active session found');
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return;
          }

          console.log('AuthStore: Session found, fetching user profile');
          // Get user profile from our users table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('auth_id', session.user.id)
            .single();

          if (userError) {
            console.error('AuthStore: User profile fetch error:', userError);
            // If no profile exists, sign out
            await supabase.auth.signOut();
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return;
          }

          if (!userData) {
            console.log('AuthStore: No user profile found');
            await supabase.auth.signOut();
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return;
          }

          // Check if organization account is approved
          if (['charity', 'shelter', 'factory', 'supermarket', 'hotel', 'restaurant'].includes(userData.role) && !userData.approved) {
            console.log('AuthStore: Organization account not approved');
            await supabase.auth.signOut();
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return;
          }

          console.log('AuthStore: Session check successful, user authenticated');
          set({
            user: {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              phone: userData.phone || '',
              location: userData.location || '',
              role: userData.role as UserRole,
              approved: userData.approved,
              createdAt: userData.created_at,
              profileImage: userData.profile_image_url,
              description: userData.description,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('AuthStore: Error checking session:', error);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      login: async (email, password) => {
        set({ isLoading: true });

        try {
          // Use Supabase Auth for proper authentication
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (authError || !authData.user) {
            throw new Error(authError?.message || 'Invalid credentials');
          }

          // Get user profile from our users table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('auth_id', authData.user.id)
            .single();

          if (userError || !userData) {
            // If no profile exists, create one (for existing users)
            const { data: newUserData, error: createError } = await supabase
              .from('users')
              .insert({
                auth_id: authData.user.id,
                name: authData.user.user_metadata?.name || 'User',
                email: authData.user.email || email,
                role: 'donor', // Default role
                approved: true,
              })
              .select()
              .single();

            if (createError) {
              throw new Error('Failed to create user profile');
            }

            userData = newUserData;
          }

          // Check if organization account is approved
          if (['charity', 'shelter', 'factory', 'supermarket', 'hotel', 'restaurant'].includes(userData.role) && !userData.approved) {
            await supabase.auth.signOut();
            throw new Error('Your organization account is pending approval. Please wait for admin approval.');
          }

          set({
            user: {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              phone: userData.phone || '',
              location: userData.location || '',
              role: userData.role as UserRole,
              approved: userData.approved,
              createdAt: userData.created_at,
              profileImage: userData.profile_image_url,
              description: userData.description,
            },
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (userData, password, documents) => {
        set({ isLoading: true });

        try {
          // Create auth user with Supabase Auth
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: userData.email || '',
            password,
            options: {
              data: {
                name: userData.name || '',
                role: userData.role || 'donor',
              }
            }
          });

          if (authError || !authData.user) {
            throw new Error(authError?.message || 'Failed to create account');
          }

          // Create user profile in our users table
          const { data: newUser, error: userError } = await supabase
            .from('users')
            .insert({
              auth_id: authData.user.id,
              name: userData.name || '',
              email: userData.email || '',
              phone: userData.phone || '',
              location: userData.location || '',
              role: userData.role || 'donor',
              description: userData.description || '',
              approved: userData.role === 'donor', // Donors are auto-approved, organizations need approval
            })
            .select()
            .single();

          if (userError) {
            // If user profile creation fails, clean up auth user
            await supabase.auth.signOut();
            console.error('User profile creation error:', userError);
            throw new Error(`Failed to create user profile: ${userError.message}`);
          }

          // For organizations, they need approval, so don't auto-login
          if (userData.role !== 'donor') {
            await supabase.auth.signOut();
            set({ isLoading: false });
            return;
          }

          // Auto-login donors (auth user is already signed in)
          set({
            user: {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              phone: newUser.phone || '',
              location: newUser.location || '',
              role: newUser.role as UserRole,
              approved: newUser.approved,
              createdAt: newUser.created_at,
              profileImage: newUser.profile_image_url,
              description: newUser.description,
            },
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({ isLoading: false });
          console.error('Signup error:', error);
          throw error;
        }
      },

      logout: async () => {
        console.log('AuthStore: Logout requested');

        try {
          await supabase.auth.signOut();
          console.log('AuthStore: Supabase signOut completed');
        } catch (error) {
          console.error('AuthStore: Error signing out:', error);
        }

        // Always set the state to logged out, regardless of current state
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        console.log('AuthStore: Logout completed');
      },

      updateUser: async (userData) => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
          const { data: updatedUser, error } = await supabase
            .from('users')
            .update({
              name: userData.name,
              phone: userData.phone,
              location: userData.location,
              description: userData.description,
              profile_image: userData.profileImage,
            })
            .eq('id', currentUser.id)
            .select()
            .single();

          if (error) {
            throw error;
          }

          set({
            user: {
              ...currentUser,
              name: updatedUser.name,
              phone: updatedUser.phone,
              location: updatedUser.location,
              description: updatedUser.description,
              profileImage: updatedUser.profile_image,
            }
          });
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      },

      deleteAccount: async () => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
          // Delete user profile from our users table
          const { error: profileError } = await supabase
            .from('users')
            .delete()
            .eq('id', currentUser.id);

          if (profileError) {
            throw profileError;
          }

          // Delete auth user (this will also sign them out)
          const { error: authError } = await supabase.auth.admin.deleteUser(
            currentUser.id
          );

          // Note: admin.deleteUser requires service role key, so this might fail
          // In that case, we'll just sign out the user
          if (authError) {
            console.warn('Could not delete auth user, signing out instead:', authError);
            await supabase.auth.signOut();
          }

          set({
            user: null,
            isAuthenticated: false
          });
        } catch (error) {
          console.error('Error deleting account:', error);
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage-v3', // Updated version for new auth system
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

// Listen for auth state changes
let isProcessingAuthChange = false;
let lastAuthEventTime = 0;
const AUTH_EVENT_COOLDOWN = 1000; // 1 second cooldown between auth events

supabase.auth.onAuthStateChange(async (event, session) => {
  const now = Date.now();

  // Prevent multiple simultaneous auth state changes
  if (isProcessingAuthChange) {
    console.log('AuthStore: Skipping auth state change - already processing');
    return;
  }

  // Prevent rapid successive auth events
  if (now - lastAuthEventTime < AUTH_EVENT_COOLDOWN) {
    console.log('AuthStore: Skipping auth state change - too soon after last event');
    return;
  }

  isProcessingAuthChange = true;
  lastAuthEventTime = now;
  console.log('AuthStore: Auth state change:', event, !!session);

  try {
    const store = useAuthStore.getState();

    if (event === 'SIGNED_OUT' || !session) {
      console.log('AuthStore: User signed out or no session');
      // Just update the state directly for SIGNED_OUT events to avoid loops
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } else if (event === 'SIGNED_IN') {
      console.log('AuthStore: User signed in, checking session');
      // Only check session if not already authenticated and not loading
      if (!store.isAuthenticated && !store.isLoading) {
        await store.checkSession();
      }
    } else if (event === 'TOKEN_REFRESHED') {
      console.log('AuthStore: Token refreshed - no action needed');
      // Don't check session on token refresh to prevent loops
    }
  } catch (error) {
    console.error('AuthStore: Error processing auth state change:', error);
  } finally {
    // Add a small delay before allowing next auth event
    setTimeout(() => {
      isProcessingAuthChange = false;
    }, 500);
  }
});