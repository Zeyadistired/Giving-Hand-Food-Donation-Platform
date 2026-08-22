-- Step 3: Create Food Donations Table
-- Run this after step2_create_users_table.sql

-- Create food_donations table
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

-- Enable RLS
ALTER TABLE public.food_donations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own donations" ON public.food_donations;
DROP POLICY IF EXISTS "Users can insert own donations" ON public.food_donations;
DROP POLICY IF EXISTS "Users can update own donations" ON public.food_donations;
DROP POLICY IF EXISTS "Service role can do everything on donations" ON public.food_donations;

-- Create policies for food_donations table
CREATE POLICY "Users can view own donations" ON public.food_donations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own donations" ON public.food_donations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own donations" ON public.food_donations
    FOR UPDATE USING (auth.uid() = user_id);

-- Service role policy (for admin operations)
CREATE POLICY "Service role can do everything on donations" ON public.food_donations
    FOR ALL USING (
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_food_donations_user_id ON public.food_donations(user_id);
CREATE INDEX IF NOT EXISTS idx_food_donations_status ON public.food_donations(status);
CREATE INDEX IF NOT EXISTS idx_food_donations_created_at ON public.food_donations(created_at);
CREATE INDEX IF NOT EXISTS idx_food_donations_expiry_date ON public.food_donations(expiry_date);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_food_donations_updated_at ON public.food_donations;
CREATE TRIGGER update_food_donations_updated_at 
    BEFORE UPDATE ON public.food_donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.food_donations TO anon, authenticated, service_role;

SELECT 'Food donations table created successfully!' as status;
