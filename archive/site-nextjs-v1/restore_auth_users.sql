-- Restore Auth Users from Public Users Table
-- This will recreate the auth.users entries based on your public.users data

-- First, let's see what we have
SELECT 'CURRENT PUBLIC USERS:' as info;
SELECT id, email, full_name, organization_name FROM public.users;

SELECT 'CURRENT AUTH USERS:' as info;
SELECT id, email FROM auth.users;

-- Insert missing auth users based on public.users data
-- We'll create auth entries for users that exist in public.users but not in auth.users
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token,
    aud,
    role
)
SELECT 
    u.id,
    '00000000-0000-0000-0000-000000000000'::uuid as instance_id,
    u.email,
    crypt('defaultpassword123', gen_salt('bf')) as encrypted_password, -- Default password
    NOW() as email_confirmed_at,
    u.created_at,
    u.updated_at,
    '' as confirmation_token,
    '' as email_change,
    '' as email_change_token_new,
    '' as recovery_token,
    'authenticated' as aud,
    'authenticated' as role
FROM public.users u
WHERE NOT EXISTS (
    SELECT 1 FROM auth.users au WHERE au.id = u.id
);

-- Also insert into auth.identities for proper authentication
INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    created_at,
    updated_at
)
SELECT 
    gen_random_uuid() as id,
    u.id as user_id,
    json_build_object('sub', u.id::text, 'email', u.email) as identity_data,
    'email' as provider,
    u.created_at,
    u.updated_at
FROM public.users u
WHERE NOT EXISTS (
    SELECT 1 FROM auth.identities ai WHERE ai.user_id = u.id
);

-- Verify the restoration
SELECT 'RESTORED AUTH USERS:' as info;
SELECT 
    au.id,
    au.email,
    au.created_at,
    pu.full_name,
    pu.organization_name
FROM auth.users au
JOIN public.users pu ON au.id = pu.id
ORDER BY au.created_at;

SELECT 'RESTORATION COMPLETE!' as status;
SELECT 'Default password for all restored users: defaultpassword123' as note;
SELECT 'Users should change their passwords after logging in' as important;
