-- Step 5: Create Admin Users Table
-- Run this after step4_create_feedback_table.sql

-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service role can do everything on admin_users" ON public.admin_users;

-- Create policies for admin_users table
CREATE POLICY "Service role can do everything on admin_users" ON public.admin_users
    FOR ALL USING (
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON public.admin_users TO service_role;

-- Insert default admin user (email: Eui@admin.com, password: Eui1234)
-- Note: This is a simple hash for demo purposes. In production, use proper bcrypt hashing.
INSERT INTO public.admin_users (email, password_hash, full_name) 
VALUES ('Eui@admin.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User')
ON CONFLICT (email) DO NOTHING;

SELECT 'Admin users table created successfully!' as status;
SELECT 'Default admin created: Eui@admin.com / Eui1234' as admin_info;
