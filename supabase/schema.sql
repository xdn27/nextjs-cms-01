-- =========================================================
-- SUPABASE DATABASE SCHEMA FOR COMPANY PROFILE & CMS
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COMPANY SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.company_settings (
    id INT PRIMARY KEY DEFAULT 1,
    company_name TEXT NOT NULL DEFAULT 'CyberTech Computer & Gaming',
    tagline TEXT DEFAULT 'Pusat Rakit PC Gaming, Laptop, Upgrade & Servis Komputer Terpercaya',
    description TEXT DEFAULT 'Pusat belanja kebutuhan komputer, rakit custom PC gaming & workstation bergaransi resmi, upgrade komponen, dan jasa service laptop/komputer oleh teknisi profesional.',
    logo_url TEXT DEFAULT '/images/logo.svg',
    hero_title TEXT DEFAULT 'Rakit PC Impian & Solusi Komputer Terlengkap Bergaransi Resmi',
    hero_subtitle TEXT DEFAULT 'Spesialis rakitan PC gaming custom tanpa bottleneck, laptop bergaransi resmi, upgrade SSD & RAM super cepat, serta service komputer profesional dengan sparepart original.',
    hero_cta_text TEXT DEFAULT 'Konsultasi Rakit PC',
    hero_cta_link TEXT DEFAULT '/contact',
    contact_email TEXT DEFAULT 'sales@cybertechcomputer.co.id',
    contact_phone TEXT DEFAULT '+62 21 6230 1888',
    contact_whatsapp TEXT DEFAULT '+62 813 8899 7722',
    contact_address TEXT DEFAULT 'Harco Mangga Dua Plaza Lt. 2 Blok B No. 12-14, Jl. Mangga Dua Raya, Jakarta Pusat 10730',
    social_facebook TEXT DEFAULT 'https://facebook.com/cybertechcomputer',
    social_instagram TEXT DEFAULT 'https://instagram.com/cybertechcomputer',
    social_linkedin TEXT DEFAULT 'https://linkedin.com/company/cybertechcomputer',
    social_twitter TEXT DEFAULT 'https://x.com/cybertechpc',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT single_row_check CHECK (id = 1)
);

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT,
    icon TEXT DEFAULT 'Briefcase',
    features TEXT[] DEFAULT '{}',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS / PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Web Development',
    client_name TEXT,
    summary TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    project_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BLOG / ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    category TEXT DEFAULT 'Teknologi',
    author_name TEXT DEFAULT 'Tim Redaksi',
    tags TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    photo_url TEXT,
    bio TEXT,
    social_linkedin TEXT,
    social_twitter TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_title TEXT,
    company TEXT,
    avatar_url TEXT,
    quote TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. INQUIRIES / CONTACT LEADS TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Public READ policies
CREATE POLICY "Public can view company settings" ON public.company_settings FOR SELECT USING (true);
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view published posts" ON public.posts FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Public can view active team members" ON public.team_members FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Public can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

-- Public INSERT policy for Inquiries (Contact Form)
CREATE POLICY "Public can submit inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- Authenticated Admin FULL ACCESS policies (CRUD)
CREATE POLICY "Admin full access company settings" ON public.company_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access posts" ON public.posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access team members" ON public.team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access inquiries" ON public.inquiries FOR ALL USING (auth.role() = 'authenticated');

-- =========================================================
-- STORAGE BUCKET CONFIGURATION (cms-media)
-- =========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-media', 'cms-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public read, Authenticated upload & delete
CREATE POLICY "Public Access cms-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'cms-media');

CREATE POLICY "Admin Upload cms-media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'cms-media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Update cms-media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'cms-media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Delete cms-media"
ON storage.objects FOR DELETE
USING (bucket_id = 'cms-media' AND auth.role() = 'authenticated');
