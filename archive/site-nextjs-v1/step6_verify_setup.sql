-- Step 6: Verify Database Setup
-- Run this last to verify everything was created correctly

-- Check if all tables exist
SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'food_donations', 'feedback', 'admin_users')
ORDER BY tablename;

-- Check if all custom types exist
SELECT typname as "Custom Types", typtype 
FROM pg_type 
WHERE typname IN (
    'organization_type', 'user_status', 'donation_status', 
    'delivery_method', 'priority_level', 'feedback_status'
)
ORDER BY typname;

-- Check RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'food_donations', 'feedback', 'admin_users')
ORDER BY tablename;

-- Check policies
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd as "Command",
    roles
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Check indexes
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'food_donations', 'feedback', 'admin_users')
ORDER BY tablename, indexname;

-- Check triggers
SELECT 
    event_object_schema as schema_name,
    event_object_table as table_name,
    trigger_name,
    event_manipulation as event
FROM information_schema.triggers 
WHERE event_object_schema = 'public'
AND event_object_table IN ('users', 'food_donations', 'feedback', 'admin_users')
ORDER BY table_name, trigger_name;

-- Final verification message
SELECT 
    'Database setup verification complete!' as status,
    'All tables, types, policies, and triggers should be listed above' as note;
