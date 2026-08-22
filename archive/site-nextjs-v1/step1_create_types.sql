-- Step 1: Create Custom Types for GivingHand Database
-- Run this first in your Supabase SQL Editor

-- Create custom types (if they don't exist)
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

-- Verify types were created
SELECT 'Custom types created successfully!' as status;
SELECT typname as "Created Types" FROM pg_type WHERE typname IN (
    'organization_type', 'user_status', 'donation_status', 
    'delivery_method', 'priority_level', 'feedback_status'
);
