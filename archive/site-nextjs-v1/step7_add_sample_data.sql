-- Step 7: Add Sample Data (Optional)
-- Run this after all previous steps to add test data

-- Add sample feedback (these don't require user authentication)
INSERT INTO public.feedback (name, email, subject, message, priority, status) VALUES
('Ahmed Hassan', 'ahmed@example.com', 'Great Platform!', 'Thank you for creating this amazing platform to reduce food waste.', 'low', 'resolved'),
('Fatma Ali', 'fatma@example.com', 'Delivery Issue', 'I had trouble with the delivery timing for my donation.', 'medium', 'in_progress'),
('Omar Mohamed', 'omar@example.com', 'Feature Request', 'It would be great to have a mobile app for easier access.', 'low', 'unresolved'),
('Sara Ibrahim', 'sara@example.com', 'Account Help', 'I need help with my account approval status.', 'high', 'unresolved'),
('Khaled Mahmoud', 'khaled@example.com', 'Partnership Inquiry', 'We are interested in partnering with GivingHand for our charity work.', 'high', 'in_progress')
ON CONFLICT DO NOTHING;

-- Verify sample data was inserted
SELECT 'Sample feedback data inserted successfully!' as status;
SELECT COUNT(*) as "Total Feedback Records" FROM public.feedback;

-- Show the feedback records
SELECT 
    name,
    email,
    subject,
    priority,
    status,
    created_at
FROM public.feedback
ORDER BY created_at DESC
LIMIT 10;

-- Note about user data
SELECT 
    'To add user and donation data, you need to:' as note,
    '1. Create users through your signup process first' as step1,
    '2. Then use their auth.users IDs to create sample donations' as step2,
    '3. The users table requires valid auth.users references' as step3;
