# Giving Hand — Mobile App

React Native mobile client for the **Giving Hand** food donation platform, built with [Expo](https://expo.dev). It lets food donors (restaurants, supermarkets, hotels, factories…) create and manage food donation tickets, and lets charities / shelters discover and accept them.

> The web platform lives at the repository root ([main README](../README.md)). This folder contains only the mobile application.

## Tech Stack

| Layer            | Technology                                        |
| ---------------- | ------------------------------------------------- |
| Framework        | React Native 0.79 + Expo SDK 53                   |
| Routing          | Expo Router v5 (file-based)                       |
| Language         | TypeScript (strict)                               |
| State management | Zustand 5 (+ AsyncStorage persistence)            |
| Backend          | Supabase (PostgreSQL + Auth)                      |
| Icons            | lucide-react-native, @expo/vector-icons           |
| Extras           | expo-image-picker, expo-location, expo-local-authentication (biometric login) |

## Prerequisites

- **Node.js 18+** and npm
- **Expo Go** app on your phone ([App Store](https://apps.apple.com/app/expo-go/id982107779) / [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)) — easiest way to run the app
- Optionally: Xcode (iOS simulator) or Android Studio (Android emulator)

## Running the App

```bash
cd app
npm install
npm start
```

This starts the Metro dev server and prints a QR code:

- **Physical device** — scan the QR code with the Expo Go app (Android) or the Camera app (iOS).
- **iOS Simulator** — press `i` in the terminal (requires macOS + Xcode).
- **Android Emulator** — press `a` in the terminal (requires Android Studio).
- **Web browser** — press `w`, or run `npm run web`.

If your phone and computer are on different networks, use tunnel mode:

```bash
npm run tunnel   # expo start --tunnel
```

### Production Builds (EAS)

To create installable binaries for TestFlight / Play Store:

```bash
npm install -g eas-cli
eas login
eas build --platform all
```

See the [EAS Build docs](https://docs.expo.dev/build/introduction/) for details.

## Project Structure

```text
app/
├── app/                    # Expo Router file-based routes
│   ├── _layout.tsx         # Root layout (fonts, theme, auth bootstrap)
│   ├── index.tsx           # Entry / redirect logic
│   ├── modal.tsx
│   ├── +not-found.tsx      # 404 screen
│   ├── tabs/               # Main tab navigation
│   │   ├── home.tsx        # Donor home
│   │   ├── explore.tsx     # Browse organizations
│   │   ├── donations.tsx   # Donation tickets list
│   │   ├── donate.tsx      # Create a donation ticket
│   │   ├── activity.tsx    # Activity history
│   │   └── profile.tsx     # User profile
│   ├── auth/               # Login / signup / org signup flows
│   ├── donate/[id].tsx     # Donation detail
│   ├── donation-ticket/[id].tsx
│   ├── organization/[id].tsx
│   ├── select-organization.tsx
│   └── settings.tsx
├── Components/             # Reusable UI components (Card, Input, DonationCard…)
├── Constants/              # Color palette & theme definitions
├── Store/                  # Zustand stores (auth, donations, tickets, orgs, theme, biometrics)
├── Types/                  # Shared TypeScript types (User, DonationTicket…)
├── lib/
│   ├── supabase.ts         # Supabase client + database types
│   └── adminFunctions.ts   # Admin-related helpers
├── Assets/Images/          # App icon, adaptive icon, favicon
├── app.json                # Expo configuration
└── metro.config.js         # Metro bundler config (@ path alias)
```

## User Roles & Navigation

The tab bar adapts to the signed-in user's role (`Types/index.ts`):

- **Donor roles** (`donor`, `supermarket`, `hotel`, `restaurant`) — Home feed, donate flow, activity.
- **Receiving organizations** (`charity`, `shelter`, `factory`) — browse incoming donation tickets, review details, accept/coordinate pickup or delivery.

Roles are stored on the `users` table in Supabase and hydrated into `Store/authStore.ts` at login.

## Supabase Configuration

The Supabase URL and anon key currently live directly in [`lib/supabase.ts`](./lib/supabase.ts):

```ts
const supabaseUrl = 'https://<project>.supabase.co';
const supabaseAnonKey = '<anon-key>';
```

Notes:

- The **anon key is a publishable key** — it is safe to ship in client code as long as Row Level Security (RLS) policies are enabled on your Supabase project.
- To point the app at a different Supabase project, edit those two values.
- The expected tables (`users`, `money_donations`, `donation_tickets`) and the approval workflow are documented in [`SUPABASE_INTEGRATION_SUMMARY.md`](./SUPABASE_INTEGRATION_SUMMARY.md).

## Known Notes

- The codebase was developed against an older dependency set; running `npx tsc --noEmit` reports some pre-existing strict-mode type warnings. They do not affect running the app through Metro/Expo (types are stripped at build time).
- `app.json` keeps the original `expo-router` plugin `origin` value from the initial scaffold; it can be removed or updated when preparing store releases.
