# GivingHand Supabase Setup Guide

## 🚀 Complete Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: GivingHand
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to Egypt (Europe West recommended)
6. Click "Create new project"
7. Wait for project to be ready (2-3 minutes)

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **service_role secret key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Update Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire content from `supabase/schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the schema
6. You should see "Success. No rows returned" message

### 5. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Under **Site URL**, add: `http://localhost:3000`
3. Under **Redirect URLs**, add: `http://localhost:3000/auth/callback`
4. Enable **Email confirmations** if desired
5. Save settings

### 6. Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Test user registration:
   - Go to `http://localhost:3000/signup`
   - Fill out the form and submit
   - Check Supabase dashboard → **Authentication** → **Users** to see the new user
   - Check **Table Editor** → **users** to see the profile data

3. Test admin dashboard:
   - Go to `http://localhost:3000/admin`
   - Login with: `Eui@admin.com` / `Eui1234`
   - Check **User Management** tab to see registered users

## 🗄️ Database Tables Created

### `users`
- User profiles with organization details
- Links to Supabase Auth users
- Status tracking (pending/approved/rejected)

### `food_donations`
- Food donation submissions
- Links to users table
- Admin approval workflow

### `feedback`
- User feedback and support tickets
- Priority and status tracking

### `admin_users`
- Admin authentication
- Default admin: `Eui@admin.com` / `Eui1234`

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Users can only see their own data**
- **Admins have full access** to manage users and donations
- **Secure API routes** with proper error handling

## 🎯 What's Working Now

✅ **User Registration** → Saves to Supabase
✅ **Admin Dashboard** → Loads users from Supabase  
✅ **User Approval** → Updates status in database
✅ **Food Donations** → Saves to Supabase
✅ **Real-time Updates** → Admin sees new registrations
✅ **Data Persistence** → No more localStorage dependency

## 🚀 Next Steps

1. **Set up your Supabase project** using steps above
2. **Update environment variables** with your credentials
3. **Run the database schema** to create tables
4. **Test the complete flow** from signup to admin approval
5. **Deploy to production** when ready

## 🆘 Troubleshooting

### Common Issues:

1. **"Failed to create user"**
   - Check your environment variables
   - Verify Supabase project is active
   - Check API keys are correct

2. **"Database error"**
   - Ensure schema.sql was run successfully
   - Check table permissions in Supabase dashboard

3. **"Authentication failed"**
   - Verify Site URL and Redirect URLs in Supabase Auth settings
   - Check if email confirmation is required

### Need Help?
- Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Verify your project status in Supabase dashboard
- Check browser console for detailed error messages
