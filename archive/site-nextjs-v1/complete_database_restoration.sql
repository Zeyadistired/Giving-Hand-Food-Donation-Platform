-- Complete GivingHand Database Restoration
-- This will recreate all your tables and custom types exactly as they were
-- Copy and paste this entire script into your Supabase SQL Editor

-- Step 1: Create all custom types
DO $$ 
BEGIN
    -- Create organization_type enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'organization_type') THEN
        CREATE TYPE organization_type AS ENUM ('supermarket', 'restaurant', 'hotel');
    END IF;
    
    -- Create user_status enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
        CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
    
    -- Create donation_status enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'donation_status') THEN
        CREATE TYPE donation_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
    
    -- Create delivery_method enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'delivery_method') THEN
        CREATE TYPE delivery_method AS ENUM ('delivery', 'pickup');
    END IF;
    
    -- Create priority_level enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'priority_level') THEN
        CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high');
    END IF;
    
    -- Create feedback_status enum
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'feedback_status') THEN
        CREATE TYPE feedback_status AS ENUM ('unresolved', 'in_progress', 'resolved');
    END IF;
END $$;

-- Step 2: Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    organization_name TEXT NOT NULL,
    organization_type organization_type NOT NULL,
    phone TEXT NOT NULL,
    status user_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create food_donations table
CREATE TABLE IF NOT EXISTS public.food_donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    organization_name TEXT NOT NULL,
    food_category TEXT NOT NULL,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    packaging_type TEXT NOT NULL,
    condition TEXT NOT NULL,
    expiry_date DATE NOT NULL,
    availability_date DATE NOT NULL,
    delivery_method delivery_method NOT NULL,
    storage_requirements TEXT,
    status donation_status DEFAULT 'pending',
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    priority priority_level DEFAULT 'medium',
    status feedback_status DEFAULT 'unresolved',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 5: Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Step 6: Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 7: Create triggers for updated_at columns
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_food_donations_updated_at ON public.food_donations;
CREATE TRIGGER update_food_donations_updated_at 
    BEFORE UPDATE ON public.food_donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_feedback_updated_at ON public.feedback;
CREATE TRIGGER update_feedback_updated_at 
    BEFORE UPDATE ON public.feedback
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users(status);
CREATE INDEX IF NOT EXISTS idx_users_organization_type ON public.users(organization_type);

CREATE INDEX IF NOT EXISTS idx_food_donations_user_id ON public.food_donations(user_id);
CREATE INDEX IF NOT EXISTS idx_food_donations_status ON public.food_donations(status);
CREATE INDEX IF NOT EXISTS idx_food_donations_created_at ON public.food_donations(created_at);
CREATE INDEX IF NOT EXISTS idx_food_donations_expiry_date ON public.food_donations(expiry_date);

CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON public.feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON public.feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_priority ON public.feedback(priority);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public.feedback(created_at);

-- Step 9: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Enable insert for users" ON public.users;
DROP POLICY IF EXISTS "Service role can do everything on users" ON public.users;

DROP POLICY IF EXISTS "Users can view own donations" ON public.food_donations;
DROP POLICY IF EXISTS "Users can insert own donations" ON public.food_donations;
DROP POLICY IF EXISTS "Users can update own donations" ON public.food_donations;
DROP POLICY IF EXISTS "Service role can do everything on donations" ON public.food_donations;

DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can view own feedback" ON public.feedback;
DROP POLICY IF EXISTS "Service role can do everything on feedback" ON public.feedback;

-- Step 10: Create RLS policies for users table
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for users" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can do everything on users" ON public.users
    FOR ALL USING (
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Step 11: Create RLS policies for food_donations table
CREATE POLICY "Users can view own donations" ON public.food_donations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own donations" ON public.food_donations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own donations" ON public.food_donations
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service role can do everything on donations" ON public.food_donations
    FOR ALL USING (
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Step 12: Create RLS policies for feedback table
CREATE POLICY "Anyone can insert feedback" ON public.feedback
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own feedback" ON public.feedback
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Service role can do everything on feedback" ON public.feedback
    FOR ALL USING (
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Step 13: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;

-- Step 14: Verification and success message
SELECT 'GivingHand database has been successfully restored!' as status;
SELECT 'All tables, types, policies, and triggers are now in place' as message;

-- Show created tables
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('users', 'food_donations', 'feedback')
ORDER BY table_name;

-- Show created custom types
SELECT typname as custom_type
FROM pg_type
WHERE typname IN ('organization_type', 'user_status', 'donation_status', 'delivery_method', 'priority_level', 'feedback_status')
ORDER BY typname;
