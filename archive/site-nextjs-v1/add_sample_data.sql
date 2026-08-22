-- Sample Data for Testing GivingHand Database
-- Run this AFTER the complete_database_restoration.sql script
-- This adds sample feedback data that doesn't require user authentication

-- Add sample feedback records
INSERT INTO public.feedback (name, email, subject, message, priority, status) VALUES
('Ahmed Hassan', 'ahmed.hassan@email.com', 'Great Platform!', 'Thank you for creating this amazing platform to reduce food waste. It has helped our restaurant connect with local charities effectively.', 'low', 'resolved'),

('Fatma Ali', 'fatma.ali@email.com', 'Delivery Timing Issue', 'I had some trouble coordinating the delivery timing for my donation. It would be helpful to have more flexible time slots.', 'medium', 'in_progress'),

('Omar Mohamed', 'omar.mohamed@email.com', 'Mobile App Request', 'It would be great to have a mobile app for easier access and donation management on the go.', 'low', 'unresolved'),

('Sara Ibrahim', 'sara.ibrahim@email.com', 'Account Approval Status', 'My account has been pending approval for over a week. Could you please check the status?', 'high', 'unresolved'),

('Khaled Mahmoud', 'khaled.mahmoud@email.com', 'Partnership Inquiry', 'We are a local charity organization interested in partnering with GivingHand. How can we get started?', 'high', 'in_progress'),

('Mona Youssef', 'mona.youssef@email.com', 'Technical Issue', 'The donation form is not submitting properly on mobile devices. I get an error message.', 'medium', 'unresolved'),

('Hassan Ali', 'hassan.ali@email.com', 'Positive Feedback', 'Excellent service! The pickup was on time and the process was very smooth.', 'low', 'resolved'),

('Layla Ahmed', 'layla.ahmed@email.com', 'Feature Suggestion', 'Could you add a feature to track the environmental impact of our donations? It would be motivating to see the CO2 reduction.', 'low', 'unresolved'),

('Youssef Ibrahim', 'youssef.ibrahim@email.com', 'Donation Categories', 'Please add more specific food categories. We have specialty items that don''t fit the current categories.', 'medium', 'in_progress'),

('Nadia Farouk', 'nadia.farouk@email.com', 'Thank You', 'Just wanted to say thank you for this wonderful initiative. We''ve been able to help so many families through your platform.', 'low', 'resolved')

ON CONFLICT DO NOTHING;

-- Verify the data was inserted
SELECT 'Sample feedback data has been successfully added!' as status;
SELECT COUNT(*) as total_feedback_records FROM public.feedback;

-- Show the inserted feedback records
SELECT 
    name,
    email,
    subject,
    priority,
    status,
    created_at
FROM public.feedback
ORDER BY created_at DESC;

-- Instructions for adding user and donation data
SELECT 
    'To add user and donation sample data:' as instruction,
    '1. First create users through your signup process' as step1,
    '2. This will create entries in auth.users table' as step2,
    '3. Then those users can create food donations' as step3,
    '4. The system will automatically link everything together' as step4;

-- Show table structure for reference
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name IN ('users', 'food_donations', 'feedback')
ORDER BY table_name, ordinal_position;
