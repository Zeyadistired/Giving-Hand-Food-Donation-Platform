-- Simple Table Creation Script
-- This creates tables without any complex features first

-- Create organization_type enum
CREATE TYPE organization_type AS ENUM ('supermarket', 'restaurant', 'hotel');

-- Create user_status enum  
CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected');

-- Create donation_status enum
CREATE TYPE donation_status AS ENUM ('pending', 'approved', 'rejected');

-- Create delivery_method enum
CREATE TYPE delivery_method AS ENUM ('delivery', 'pickup');

-- Create priority_level enum
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high');

-- Create feedback_status enum
CREATE TYPE feedback_status AS ENUM ('unresolved', 'in_progress', 'resolved');

-- Create users table (simple version first)
CREATE TABLE public.users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    organization_name TEXT NOT NULL,
    organization_type organization_type NOT NULL,
    phone TEXT NOT NULL,
    status user_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create food_donations table (simple version first)
CREATE TABLE public.food_donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
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

-- Create feedback table (simple version first)
CREATE TABLE public.feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    priority priority_level DEFAULT 'medium',
    status feedback_status DEFAULT 'unresolved',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verify tables were created
SELECT 'Tables created successfully!' as status;

-- Show created tables
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Show created types
SELECT typname FROM pg_type WHERE typname IN (
    'organization_type', 'user_status', 'donation_status', 
    'delivery_method', 'priority_level', 'feedback_status'
) ORDER BY typname;
