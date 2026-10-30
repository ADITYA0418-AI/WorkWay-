# WORKWAY V2 — Hyperlocal On-Demand Skilled Service Marketplace

> *"To GET WORK & TO GET WORK DONE"*

WORKWAY V2 is a production-ready hyperlocal on-demand marketplace connecting homeowners, renters, local businesses, and customers with trusted nearby skilled service providers (Electricians, Plumbers, Carpenters, Housemaids, and Handymen).

---

## 🌟 Core Features & Architecture

### 1. Dual Backend Engine (Supabase + Local Demo Fallback)
- **Supabase Backend**: Native Supabase Auth, PostgreSQL DB schema, PostGIS spatial queries, Row Level Security (RLS) policies, Storage buckets, and Realtime WebSocket subscriptions.
- **Graceful Local Demo Mode**: Automatic fallback to local state and seed dataset when Supabase environment variables are missing or unconfigured.

### 2. Hyperlocal Geolocation & WorkWay Match Algorithm
- Browser Geolocation API (`navigator.geolocation`) with manual address search & radius slider (1 km, 2 km, 3 km, 5 km, 10 km).
- **WorkWay Match Score**: Multi-factor algorithm evaluating:
  - Distance (30%)
  - Availability (25%)
  - Customer Rating (20%)
  - Jobs Completed (10%)
  - Category Match (10%)
  - Response Speed (5%)

### 3. AI Job Diagnosis
- Powered by Google Gemini API (`VITE_GEMINI_API_KEY`) for multi-modal text and photo analysis.
- Generates labor estimates (₹400–₹700), urgency level, and recommended trade service.

### 4. 3-Level Provider Verification Standard
- **Level 1 — Basic Verified**: Mobile OTP + Aadhaar Government ID + Profile Selfie match.
- **Level 2 — Background Cleared**: Local address verification + Police Clearance Certificate + Skill test.
- **Level 3 — Master Pro**: 100+ Jobs completed + 4.8+ rating + Liability Insurance proof.

### 5. Multi-Role Ecosystem
- **Consumer View**: Search, radius slider, AI job diagnosis, Emergency service mode, digital invoices, material cost approvals, real-time chat, and society apartment mode.
- **Provider View**: On/Off duty status toggle, hyperlocal lead acceptance/rejection, active job milestone tracking, earnings payouts, and subscription management (Pro Unlimited ₹1,650/mo vs Pay-Per-Lead).
- **Admin Suite**: Operational dashboard, provider verification queue audit, dispute resolution center, rule-based fraud/risk engine, and marketplace analytics.

---

## 🔐 Quick Demo Credentials

| Role | Email | Password | Access Path |
| :--- | :--- | :--- | :--- |
| **Consumer** | `consumer@workway.app` | `password123` | `/consumer` |
| **Provider** | `provider@workway.app` | `password123` | `/provider` |
| **Admin** | `admin@workway.app` | `password123` | `/admin` |

---

## 🚀 Setup & Local Development Instructions

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation
```bash
# 1. Clone repository & install dependencies
npm install

# 2. Environment variables configuration
cp .env.example .env

# 3. Start Vite development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 🗄️ Database Setup & Supabase Migration

The complete PostgreSQL database migration script is included in `supabase/migrations/20260811_workway_v2.sql`.

To apply to your Supabase instance:
1. Open your Supabase Project Dashboard -> **SQL Editor**.
2. Run the script in `supabase/migrations/20260811_workway_v2.sql`.
3. Enable Row Level Security (RLS) policies included in the script.
