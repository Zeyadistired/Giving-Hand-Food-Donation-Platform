-- Sample Data for GivingHand Database
-- Run this AFTER running the restore_supabase_tables.sql script
-- This will populate your tables with sample data for testing

-- Note: You'll need to create actual auth.users first through Supabase Auth
-- This script assumes you have some auth users created

-- Sample Users (you'll need to replace these UUIDs with actual auth.users IDs)
-- First, create some auth users through your signup process, then update these UUIDs

-- Sample user data (replace UUIDs with real ones from auth.users)
INSERT INTO public.users (id, email, full_name, organization_name, organization_type, phone, status) VALUES
('11111111-1111-1111-1111-111111111111', 'restaurant@example.com', 'Ahmed Hassan', 'Cairo Kitchen Restaurant', 'restaurant', '+201234567890', 'approved'),
('22222222-2222-2222-2222-222222222222', 'supermarket@example.com', 'Fatma Ali', 'Fresh Market Supermarket', 'supermarket', '+201234567891', 'approved'),
('33333333-3333-3333-3333-333333333333', 'hotel@example.com', 'Omar Mohamed', 'Nile View Hotel', 'hotel', '+201234567892', 'pending'),
('44444444-4444-4444-4444-444444444444', 'bakery@example.com', 'Mona Ibrahim', 'Golden Bakery', 'restaurant', '+201234567893', 'approved'),
('55555555-5555-5555-5555-555555555555', 'market@example.com', 'Khaled Mahmoud', 'City Center Market', 'supermarket', '+201234567894', 'rejected');

-- Sample Food Donations
INSERT INTO public.food_donations (
    user_id, organization_name, food_category, description, quantity, 
    packaging_type, condition, expiry_date, availability_date, 
    delivery_method, storage_requirements, status
) VALUES
-- Approved donations
('11111111-1111-1111-1111-111111111111', 'Cairo Kitchen Restaurant', 'Prepared Meals', 'Fresh grilled chicken with rice and vegetables', 50, 'Containers', 'Excellent', '2025-01-15', '2025-01-10', 'pickup', 'Keep refrigerated', 'approved'),
('11111111-1111-1111-1111-111111111111', 'Cairo Kitchen Restaurant', 'Bread & Bakery', 'Fresh bread loaves and pastries', 30, 'Bags', 'Good', '2025-01-12', '2025-01-10', 'delivery', 'Room temperature', 'approved'),
('22222222-2222-2222-2222-222222222222', 'Fresh Market Supermarket', 'Fruits & Vegetables', 'Mixed seasonal fruits - apples, oranges, bananas', 100, 'Boxes', 'Good', '2025-01-20', '2025-01-10', 'pickup', 'Cool, dry place', 'approved'),
('22222222-2222-2222-2222-222222222222', 'Fresh Market Supermarket', 'Dairy Products', 'Yogurt cups and milk cartons', 75, 'Refrigerated boxes', 'Excellent', '2025-01-18', '2025-01-10', 'delivery', 'Keep refrigerated', 'approved'),
('44444444-4444-4444-4444-444444444444', 'Golden Bakery', 'Bread & Bakery', 'Assorted bread, croissants, and muffins', 80, 'Bags', 'Excellent', '2025-01-11', '2025-01-10', 'pickup', 'Room temperature', 'approved'),

-- Pending donations
('33333333-3333-3333-3333-333333333333', 'Nile View Hotel', 'Prepared Meals', 'Buffet leftovers - mixed international cuisine', 120, 'Large containers', 'Good', '2025-01-11', '2025-01-10', 'pickup', 'Keep refrigerated', 'pending'),
('22222222-2222-2222-2222-222222222222', 'Fresh Market Supermarket', 'Canned Goods', 'Canned vegetables and soups near expiry', 200, 'Boxes', 'Good', '2025-02-15', '2025-01-10', 'delivery', 'Room temperature', 'pending'),
('11111111-1111-1111-1111-111111111111', 'Cairo Kitchen Restaurant', 'Prepared Meals', 'Fresh salads and appetizers', 40, 'Containers', 'Excellent', '2025-01-11', '2025-01-10', 'pickup', 'Keep refrigerated', 'pending'),

-- Rejected donation (with reason)
('55555555-5555-5555-5555-555555555555', 'City Center Market', 'Meat & Poultry', 'Frozen chicken pieces', 60, 'Frozen bags', 'Fair', '2025-01-25', '2025-01-10', 'pickup', 'Keep frozen', 'rejected');

-- Update the rejected donation with a reason
UPDATE public.food_donations 
SET rejection_reason = 'Food safety concerns - expiry date too close and storage conditions not adequate'
WHERE user_id = '55555555-5555-5555-5555-555555555555';

-- Sample Feedback/Support Tickets
INSERT INTO public.feedback (user_id, name, email, subject, message, priority, status) VALUES
-- From registered users
('11111111-1111-1111-1111-111111111111', 'Ahmed Hassan', 'restaurant@example.com', 'Delivery Schedule Issue', 'I need to change the pickup time for my donation. The original time conflicts with our busy hours.', 'medium', 'in_progress'),
('22222222-2222-2222-2222-222222222222', 'Fatma Ali', 'supermarket@example.com', 'Great Service!', 'Thank you for the smooth donation process. The pickup was on time and professional.', 'low', 'resolved'),
('33333333-3333-3333-3333-333333333333', 'Omar Mohamed', 'hotel@example.com', 'Account Approval Status', 'My account has been pending for a week. When will it be approved?', 'high', 'unresolved'),

-- From anonymous users (no user_id)
(NULL, 'Sara Ahmed', 'sara.ahmed@email.com', 'Website Suggestion', 'It would be great to have a mobile app for easier donation management.', 'low', 'unresolved'),
(NULL, 'Mohamed Ali', 'mohamed.ali@email.com', 'Partnership Inquiry', 'We are a charity organization interested in partnering with GivingHand.', 'high', 'in_progress'),
(NULL, 'Layla Hassan', 'layla.hassan@email.com', 'Technical Issue', 'The donation form is not submitting properly on mobile devices.', 'medium', 'unresolved');

-- Add some older donations for analytics (backdated)
INSERT INTO public.food_donations (
    user_id, organization_name, food_category, description, quantity, 
    packaging_type, condition, expiry_date, availability_date, 
    delivery_method, storage_requirements, status, created_at
) VALUES
-- December 2024 donations
('11111111-1111-1111-1111-111111111111', 'Cairo Kitchen Restaurant', 'Prepared Meals', 'Holiday special meals', 80, 'Containers', 'Excellent', '2024-12-25', '2024-12-20', 'pickup', 'Keep refrigerated', 'approved', '2024-12-20 10:00:00+00'),
('22222222-2222-2222-2222-222222222222', 'Fresh Market Supermarket', 'Fruits & Vegetables', 'Winter vegetables', 150, 'Boxes', 'Good', '2024-12-30', '2024-12-22', 'delivery', 'Cool, dry place', 'approved', '2024-12-22 14:30:00+00'),
('44444444-4444-4444-4444-444444444444', 'Golden Bakery', 'Bread & Bakery', 'Christmas pastries', 60, 'Bags', 'Good', '2024-12-26', '2024-12-24', 'pickup', 'Room temperature', 'approved', '2024-12-24 09:15:00+00'),

-- November 2024 donations
('11111111-1111-1111-1111-111111111111', 'Cairo Kitchen Restaurant', 'Prepared Meals', 'Traditional Egyptian dishes', 70, 'Containers', 'Excellent', '2024-11-15', '2024-11-10', 'pickup', 'Keep refrigerated', 'approved', '2024-11-10 16:45:00+00'),
('22222222-2222-2222-2222-222222222222', 'Fresh Market Supermarket', 'Dairy Products', 'Fresh dairy products', 90, 'Refrigerated boxes', 'Excellent', '2024-11-20', '2024-11-12', 'delivery', 'Keep refrigerated', 'approved', '2024-11-12 11:20:00+00');

-- Success message
SELECT 'Sample data has been successfully inserted into your GivingHand database!' as status,
       'Remember to replace the sample UUIDs with real auth.users IDs for proper functionality' as note;
