-- Clean up orphaned data (OPTIONAL - only run if you have issues)
-- This removes data that references non-existent auth users

-- Check for orphaned records first
SELECT 'CHECKING FOR ORPHANED DATA:' as info;

SELECT 'Public users without auth users:' as check1;
SELECT COUNT(*) as count
FROM public.users pu
WHERE NOT EXISTS (SELECT 1 FROM auth.users au WHERE au.id = pu.id);

SELECT 'Food donations without valid users:' as check2;
SELECT COUNT(*) as count
FROM public.food_donations fd
WHERE NOT EXISTS (SELECT 1 FROM auth.users au WHERE au.id = fd.user_id);

SELECT 'Feedback without valid users:' as check3;
SELECT COUNT(*) as count
FROM public.feedback f
WHERE f.user_id IS NOT NULL 
AND NOT EXISTS (SELECT 1 FROM auth.users au WHERE au.id = f.user_id);

-- UNCOMMENT BELOW ONLY IF YOU WANT TO DELETE ORPHANED DATA
-- (Usually you want to restore auth users instead)

/*
-- Delete orphaned food donations
DELETE FROM public.food_donations 
WHERE NOT EXISTS (SELECT 1 FROM auth.users au WHERE au.id = user_id);

-- Set feedback user_id to NULL for orphaned feedback
UPDATE public.feedback 
SET user_id = NULL 
WHERE user_id IS NOT NULL 
AND NOT EXISTS (SELECT 1 FROM auth.users au WHERE au.id = user_id);

-- Delete orphaned public users
DELETE FROM public.users 
WHERE NOT EXISTS (SELECT 1 FROM auth.users au WHERE au.id = id);
*/

SELECT 'Cleanup check complete!' as status;
