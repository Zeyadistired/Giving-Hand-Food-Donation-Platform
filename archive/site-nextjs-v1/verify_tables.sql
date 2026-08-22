-- Verify Tables Were Created Successfully
-- Run this to check if everything is working

-- Check tables
SELECT 'TABLES CREATED:' as info;
SELECT 
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'food_donations', 'feedback')
ORDER BY tablename;

-- Check custom types
SELECT 'CUSTOM TYPES CREATED:' as info;
SELECT typname as type_name
FROM pg_type 
WHERE typname IN (
    'organization_type', 'user_status', 'donation_status', 
    'delivery_method', 'priority_level', 'feedback_status'
)
ORDER BY typname;

-- Check table structure
SELECT 'USERS TABLE STRUCTURE:' as info;
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'users'
ORDER BY ordinal_position;

SELECT 'FOOD_DONATIONS TABLE STRUCTURE:' as info;
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'food_donations'
ORDER BY ordinal_position;

SELECT 'FEEDBACK TABLE STRUCTURE:' as info;
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'feedback'
ORDER BY ordinal_position;

-- Check RLS status
SELECT 'ROW LEVEL SECURITY STATUS:' as info;
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'food_donations', 'feedback')
ORDER BY tablename;

-- Check policies
SELECT 'POLICIES CREATED:' as info;
SELECT 
    tablename,
    policyname,
    cmd as command
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Final success message
SELECT 'Database restoration verification complete!' as final_status;
