-- ====================================================================
-- WORKWAY V2 DATABASE SCHEMA & ROW LEVEL SECURITY POLICIES
-- Hyperlocal On-Demand Skilled Service Marketplace
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('consumer', 'provider', 'admin');
CREATE TYPE verification_level AS ENUM ('level_1_basic', 'level_2_background', 'level_3_master_pro');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected', 'more_info_required');
CREATE TYPE booking_status AS ENUM ('pending', 'accepted', 'on_the_way', 'in_progress', 'completed', 'cancelled', 'disputed');
CREATE TYPE urgency_level AS ENUM ('emergency_asap', 'today', 'this_week', 'flexible');
CREATE TYPE provider_duty_status AS ENUM ('available', 'busy', 'on_the_way', 'offline');
CREATE TYPE payment_status AS ENUM ('pending', 'authorized', 'captured', 'refunded', 'failed');
CREATE TYPE dispute_status AS ENUM ('open', 'under_investigation', 'resolved_refund', 'resolved_provider_payout', 'dismissed');
CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high');

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'consumer',
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    risk_level risk_level NOT NULL DEFAULT 'low',
    referral_code TEXT UNIQUE,
    referred_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CONSUMER PROFILES
CREATE TABLE IF NOT EXISTS public.consumer_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    favorite_categories TEXT[] DEFAULT '{}',
    society_name TEXT,
    society_flat TEXT,
    reward_credits NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CATEGORIES & SERVICES
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id TEXT REFERENCES public.categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    min_price NUMERIC(10, 2),
    max_price NUMERIC(10, 2),
    pricing_type TEXT DEFAULT 'range', -- 'fixed', 'hourly', 'range'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PROVIDER PROFILES
CREATE TABLE IF NOT EXISTS public.provider_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    trade_category TEXT REFERENCES public.categories(id),
    bio TEXT,
    hourly_rate NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
    service_radius_km NUMERIC(5, 2) NOT NULL DEFAULT 5.0,
    duty_status provider_duty_status NOT NULL DEFAULT 'offline',
    verification_level verification_level NOT NULL DEFAULT 'level_1_basic',
    verification_status verification_status NOT NULL DEFAULT 'pending',
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5.00,
    review_count INT NOT NULL DEFAULT 0,
    jobs_completed INT NOT NULL DEFAULT 0,
    response_time_minutes INT NOT NULL DEFAULT 15,
    acceptance_rate_percent INT NOT NULL DEFAULT 98,
    insurance_verified BOOLEAN DEFAULT false,
    subscription_plan TEXT DEFAULT 'pay_per_lead', -- 'pay_per_lead', 'pro_unlimited'
    current_latitude DOUBLE PRECISION,
    current_longitude DOUBLE PRECISION,
    approx_address TEXT,
    languages TEXT[] DEFAULT '{"English", "Hindi"}',
    working_hours TEXT DEFAULT '8:00 AM - 8:00 PM',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. PROVIDER BADGES
CREATE TABLE IF NOT EXISTS public.provider_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    badge_type TEXT NOT NULL, -- 'Basic Verified', 'Background Cleared', 'Master Pro', 'Fast Responder', '100+ Jobs', 'Five-Star Provider'
    awarded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PROVIDER PORTFOLIO ITEMS
CREATE TABLE IF NOT EXISTS public.portfolio_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    before_image_url TEXT,
    after_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SAVED ADDRESSES
CREATE TABLE IF NOT EXISTS public.saved_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    label TEXT NOT NULL, -- 'Home', 'Office', 'Other'
    address_line TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. BOOKINGS
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code TEXT UNIQUE NOT NULL,
    consumer_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT,
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE RESTRICT,
    category_id TEXT REFERENCES public.categories(id),
    service_title TEXT NOT NULL,
    problem_description TEXT,
    problem_photo_url TEXT,
    urgency urgency_level DEFAULT 'today',
    booking_status booking_status NOT NULL DEFAULT 'pending',
    address_line TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TEXT NOT NULL,
    estimated_labour NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    materials_cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    platform_fee NUMERIC(10, 2) NOT NULL DEFAULT 49.00,
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    payment_status payment_status DEFAULT 'pending',
    cancellation_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. BOOKING STATUS HISTORY
CREATE TABLE IF NOT EXISTS public.booking_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    status booking_status NOT NULL,
    note TEXT,
    changed_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. BOOKING MATERIALS APPROVAL
CREATE TABLE IF NOT EXISTS public.booking_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    cost NUMERIC(10, 2) NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    approved_at TIMESTAMPTZ
);

-- 13. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID UNIQUE REFERENCES public.bookings(id) ON DELETE CASCADE,
    consumer_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT,
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE RESTRICT,
    overall_rating INT CHECK (overall_rating BETWEEN 1 AND 5),
    professionalism INT CHECK (professionalism BETWEEN 1 AND 5),
    quality INT CHECK (quality BETWEEN 1 AND 5),
    punctuality INT CHECK (punctuality BETWEEN 1 AND 5),
    value INT CHECK (value BETWEEN 1 AND 5),
    comment TEXT,
    would_hire_again BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. REALTIME MESSAGES
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT,
    receiver_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT,
    text_content TEXT NOT NULL,
    attachment_url TEXT,
    is_system_message BOOLEAN DEFAULT false,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    related_booking_id UUID REFERENCES public.bookings(id),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. FAVORITES
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consumer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (consumer_id, provider_id)
);

-- 17. DISPUTES
CREATE TABLE IF NOT EXISTS public.disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dispute_code TEXT UNIQUE NOT NULL,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE RESTRICT,
    raised_by UUID REFERENCES public.profiles(id) ON DELETE RESTRICT,
    issue_type TEXT NOT NULL, -- 'overcharging', 'poor_quality', 'no_show', 'damage', 'unsafe_behavior', 'other'
    description TEXT NOT NULL,
    status dispute_status DEFAULT 'open',
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. VERIFICATION REQUESTS
CREATE TABLE IF NOT EXISTS public.verification_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    target_level verification_level NOT NULL,
    document_type TEXT NOT NULL, -- 'government_id', 'address_proof', 'skill_certificate', 'police_clearance'
    document_url TEXT NOT NULL,
    status verification_status DEFAULT 'pending',
    admin_notes TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- 19. ADMIN ACTION LOGS
CREATE TABLE IF NOT EXISTS public.admin_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES public.profiles(id),
    action_type TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    target_id UUID NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consumer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;

-- 1. Profiles
CREATE POLICY "Public profile view" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Self insert profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Self update profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Consumer Profiles
CREATE POLICY "Consumer view self" ON public.consumer_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Consumer insert self" ON public.consumer_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Consumer update self" ON public.consumer_profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Categories & Services (Public Read)
CREATE POLICY "Public categories view" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public services view" ON public.services FOR SELECT USING (true);

-- 4. Provider Profiles
CREATE POLICY "Public provider view" ON public.provider_profiles FOR SELECT USING (true);
CREATE POLICY "Provider insert self" ON public.provider_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Self update provider" ON public.provider_profiles FOR UPDATE USING (auth.uid() = id);

-- 5. Provider Badges & Portfolio (Public Read, Provider Manage)
CREATE POLICY "Public badges view" ON public.provider_badges FOR SELECT USING (true);
CREATE POLICY "Public portfolio view" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Provider manage portfolio" ON public.portfolio_items FOR ALL USING (auth.uid() = provider_id);

-- 6. Saved Addresses (Private to user)
CREATE POLICY "User manage addresses" ON public.saved_addresses FOR ALL USING (auth.uid() = user_id);

-- 7. Bookings
CREATE POLICY "Booking participant view" ON public.bookings FOR SELECT USING (auth.uid() = consumer_id OR auth.uid() = provider_id);
CREATE POLICY "Consumer create booking" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = consumer_id);
CREATE POLICY "Participant update booking" ON public.bookings FOR UPDATE USING (auth.uid() = consumer_id OR auth.uid() = provider_id);

-- 8. Booking Status History & Materials
CREATE POLICY "Status history participant view" ON public.booking_status_history FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND (b.consumer_id = auth.uid() OR b.provider_id = auth.uid())));
CREATE POLICY "Materials participant view" ON public.booking_materials FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND (b.consumer_id = auth.uid() OR b.provider_id = auth.uid())));
CREATE POLICY "Materials participant manage" ON public.booking_materials FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND (b.consumer_id = auth.uid() OR b.provider_id = auth.uid())));

-- 9. Reviews (Public Read, Consumer Write)
CREATE POLICY "Public review view" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Consumer insert review" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = consumer_id);

-- 10. Messages (Chat Participants)
CREATE POLICY "Message participant view" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Message participant insert" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- 11. Notifications (Private to Recipient)
CREATE POLICY "User notifications view" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User notifications update" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- 12. Favorites
CREATE POLICY "User favorites manage" ON public.favorites FOR ALL USING (auth.uid() = consumer_id);

-- 13. Disputes
CREATE POLICY "Dispute participant view" ON public.disputes FOR SELECT 
  USING (auth.uid() = raised_by OR EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND (b.consumer_id = auth.uid() OR b.provider_id = auth.uid())));
CREATE POLICY "Consumer raise dispute" ON public.disputes FOR INSERT WITH CHECK (auth.uid() = raised_by);

-- 14. Verification Requests
CREATE POLICY "Provider verification view" ON public.verification_requests FOR SELECT USING (auth.uid() = provider_id);
CREATE POLICY "Provider verification submit" ON public.verification_requests FOR INSERT WITH CHECK (auth.uid() = provider_id);

-- 15. Admin Action Logs (Admin Only)
CREATE POLICY "Admin actions view" ON public.admin_actions FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "Admin actions insert" ON public.admin_actions FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

