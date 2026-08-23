# Giving Hand

**Giving Hand** is a food waste reduction and donation platform designed to connect organizations with surplus food to charities and communities in need.

Developed as a **graduation project**, the platform provides a digital workflow for creating, managing, accepting, and coordinating food donations, helping reduce food waste while making surplus food easier to redistribute.

> 🌐 **Live Demo:** [giving-hand.vercel.app](https://giving-hand.vercel.app/)

## Overview

Food waste and food insecurity exist simultaneously: large quantities of edible food can go to waste while organizations and communities still need access to food resources.

Giving Hand addresses this gap by providing a centralized platform where food-producing organizations can list available surplus food and charities can discover and accept donations.

The project consists of a **web platform** and a companion **mobile application**, both included in this repository (mobile app under [`app/`](./app)).

## Key Features

- **Food donation management** — Organizations can create food donation tickets with details such as food type, category, quantity, expiry date, pickup location, and availability.
- **Charity discovery and acceptance** — Charities can browse available organizations and review incoming food donation opportunities.
- **Donation workflow** — Food tickets move through a structured lifecycle from creation to acceptance, rejection, expiration, or conversion.
- **Delivery coordination** — Supports delivery capabilities and pickup preferences between organizations and charities.
- **Multiple user roles** — Dedicated workflows for organizations, charities, factories, administrators, and general users.
- **Database-backed operations** — Donation and user data are stored and managed through Supabase.
- **Validation and error handling** — Forms, authentication checks, loading states, database errors, and user feedback are handled throughout the application.
- **Responsive interface** — Designed to provide a consistent experience across different screen sizes.
- **Maps and data visualization** — Uses Leaflet for location-based functionality and Recharts for data visualization.

## Donation Workflow

```text
Organization
     │
     ▼
Create Food Ticket
     │
     ▼
Supabase Database
     │
     ▼
Charity Reviews Donation
     │
     ├── Accept ──► Delivery / Pickup Coordination
     │
     └── Decline
```

The implemented workflow supports database-backed food tickets, charity approval or rejection, status updates, and delivery coordination.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- shadcn/ui / Radix UI
- React Hook Form
- Zod
- Framer Motion

### Backend & Data
- Supabase
- PostgreSQL

### Maps & Visualization
- Leaflet
- React Leaflet
- Recharts

### Development
- ESLint
- TypeScript
- npm

## Project Structure

```text
giving-hand/
├── public/
├── src/
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── charity/
│   │   ├── factory/
│   │   ├── organization/
│   │   └── user/
│   ├── components/
│   └── utils/
├── app/                  # Mobile application (React Native / Expo)
│   ├── app/              # Expo Router routes
│   ├── Components/
│   ├── Store/
│   ├── lib/
│   └── ...
├── archive/              # Project archive: documents, posters, media, prototypes
│   ├── documents/
│   ├── ShareBite/
│   └── site-nextjs-v1/
├── database-schema.sql
├── FOOD_TICKET_WORKFLOW.md
├── package.json
└── vite.config.ts
```

## Database

The application uses Supabase for persistent data storage.

The database schema includes tables for:

- Users
- Food tickets
- Delivery requests
- Monetary donations

Food tickets contain information including:

- Organization
- Food type and category
- Weight and number of pieces
- Expiry date
- Pickup location
- Preferred pickup times
- Delivery capability
- Donation status
- Accepting charity
- Creation and update timestamps

The repository also includes `database-schema.sql` and detailed documentation for the food-ticket workflow.

## Running Locally

### Prerequisites

- Node.js
- npm
- A Supabase project

### Installation

```bash
git clone https://github.com/Zeyadistired/Giving-Hand-Food-Donation-Platform.git
cd Giving-Hand-Food-Donation-Platform
npm install
```

### Environment Variables

A ready-to-fill template is provided at [`.env.example`](./.env.example) — copy it to `.env` and configure the required Supabase credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Note: as shipped, most pages read their Supabase URL/key directly from `src/utils/supabaseClient.ts`; paste your own project's values there if you don't want to rewire imports through env vars.

### Database Setup

Run the SQL contained in:

```text
database-schema.sql
```

in your Supabase SQL editor.

### Start Development Server

```bash
npm run dev
```

The application will then be available through the local Vite development server.

### Production Build

```bash
npm run build
```

## Mobile Application

The Giving Hand mobile app (React Native / Expo) lives in the [`app/`](./app) folder with its own documentation.

Quick start:

```bash
cd app
npm install
npm start
```

Then scan the QR code with the **Expo Go** app, or press `i` / `a` for the iOS simulator / Android emulator. Full setup, configuration, and build instructions: [`app/README.md`](./app/README.md).

## Project Archive

The [`archive/`](./archive) folder preserves everything produced during the graduation project: reports, presentations, posters, marketing assets, database design spreadsheets, ERDs, planning screenshots, an early iOS prototype (`ShareBite/`), and the earlier Next.js iteration of the website (`site-nextjs-v1/`).

See [`archive/README.md`](./archive/README.md) for a full inventory. Oversized backups (version-history zips too large for the repository) are preserved as assets of the [project-backup-archive release](https://github.com/Zeyadistired/Giving-Hand-Food-Donation-Platform/releases/tag/project-backup-archive).

## Project Documentation

Additional implementation details for the food donation workflow can be found in:

[`FOOD_TICKET_WORKFLOW.md`](./FOOD_TICKET_WORKFLOW.md)

## Project Status

This repository contains both the **web application** and the **mobile application** (`app/`) developed as part of the Giving Hand graduation project.

## License

This project was developed as an academic graduation project.
