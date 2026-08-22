# GivingHand - Food Donation Platform

A comprehensive web application that connects food donors with recipients to reduce food waste and help communities in need.

## 🌟 Features

### For Donors
- **Easy Registration**: Simple signup process for restaurants, supermarkets, and hotels
- **Food Donation Form**: Detailed form to submit food donations with expiry dates, quantities, and storage requirements
- **Real-time Tracking**: Track donation status from submission to delivery
- **Analytics Dashboard**: View donation history and impact metrics

### For Recipients
- **Browse Donations**: View available food donations in real-time
- **Request System**: Request specific food items based on needs
- **Delivery Coordination**: Coordinate pickup or delivery of donated food

### For Administrators
- **User Management**: Approve/reject user registrations
- **Donation Oversight**: Review and approve food donations
- **Analytics**: Comprehensive reporting on platform usage and impact
- **Content Management**: Manage platform content and settings

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Nodemailer integration
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zeyadistired/givinghand-food-donation-platform.git
   cd givinghand-food-donation-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Database Setup**
   Run the SQL scripts in the `supabase/` directory to set up your database schema.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   └── ...                # Other pages
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── public/                # Static assets
├── supabase/              # Database schema and setup scripts
└── ...
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the SQL scripts in order:
   - `step1_create_types.sql`
   - `step2_create_users_table.sql`
   - `step3_create_food_donations_table.sql`
   - `step4_create_feedback_table.sql`
   - `step5_create_admin_table.sql`
   - `step6_verify_setup.sql`
   - `step7_add_sample_data.sql`

### Email Configuration
Configure email settings in `lib/email.ts` for notification functionality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Ziad Mohamed** - *Initial work* - [Zeyadistired](https://github.com/Zeyadistired)

## 🙏 Acknowledgments

- Supabase for the excellent backend-as-a-service platform
- Next.js team for the amazing React framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who help make this project better

## 📞 Support

If you have any questions or need help, please open an issue or contact [ziadm4772@gmail.com](mailto:ziadm4772@gmail.com).

---

**Made with ❤️ to help reduce food waste and support communities in need.**
