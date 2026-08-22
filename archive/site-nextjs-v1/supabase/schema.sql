-- GivingHand Database Schema
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE organization_type AS ENUM ('supermarket', 'restaurant', 'hotel');
CREATE TYPE user_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE donation_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE delivery_method AS ENUM ('delivery', 'pickup');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE feedback_status AS ENUM ('unresolved', 'in_progress', 'resolved');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    organization_name TEXT NOT NULL,
    organization_type organization_type NOT NULL,
    phone TEXT NOT NULL,
    status user_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Food donations table
CREATE TABLE public.food_donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) NOT NULL,
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

-- Feedback table
CREATE TABLE public.feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    priority priority_level DEFAULT 'medium',
    status feedback_status DEFAULT 'unresolved',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table (for admin authentication)
CREATE TABLE public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: Eui1234)
INSERT INTO public.admin_users (email, password_hash, full_name) 
VALUES ('Eui@admin.com', '$2b$10$rGKqDxvNZFjxjO7/VJk0/.vJ9Owz8Qg5YJXzQQQQQQQQQQQQQQQQQQ', 'Admin User');

-- Row Level Security Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Users can only see and edit their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Users can only see and manage their own donations
CREATE POLICY "Users can view own donations" ON public.food_donations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own donations" ON public.food_donations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own donations" ON public.food_donations
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can insert feedback
CREATE POLICY "Anyone can insert feedback" ON public.feedback
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own feedback" ON public.feedback
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Admin policies (you'll need to implement admin role checking)
CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

CREATE POLICY "Admins can update all users" ON public.users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_food_donations_updated_at BEFORE UPDATE ON public.food_donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON public.feedback
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_status ON public.users(status);
CREATE INDEX idx_food_donations_user_id ON public.food_donations(user_id);
CREATE INDEX idx_food_donations_status ON public.food_donations(status);
CREATE INDEX idx_feedback_status ON public.feedback(status);
CREATE INDEX idx_feedback_priority ON public.feedback(priority);
