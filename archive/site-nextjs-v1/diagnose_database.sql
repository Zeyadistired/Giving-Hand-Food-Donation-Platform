-- Diagnostic Script for Supabase Database
-- Run this first to see what's currently in your database

-- Check what tables currently exist
SELECT 'CURRENT TABLES:' as info;
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check what custom types exist
SELECT 'CURRENT CUSTOM TYPES:' as info;
SELECT 
    typname as type_name,
    typtype as type_type
FROM pg_type 
WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND typtype = 'e'  -- enum types
ORDER BY typname;

-- Check if auth schema exists and has users
SELECT 'AUTH USERS COUNT:' as info;
SELECT COUNT(*) as auth_users_count FROM auth.users;

-- Check current database permissions
SELECT 'CURRENT USER AND PERMISSIONS:' as info;
SELECT 
    current_user as current_user,
    session_user as session_user,
    current_database() as current_database;

-- Check if we can create tables (test permissions)
SELECT 'TESTING PERMISSIONS:' as info;
SELECT has_schema_privilege('public', 'CREATE') as can_create_in_public_schema;

-- Show any existing policies
SELECT 'EXISTING POLICIES:' as info;
SELECT 
    schemaname,
    tablename,
    policyname
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
