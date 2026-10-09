-- =========================================================
-- MIGRASI: batasi akses tulis hanya untuk admin (app_metadata.role = 'admin')
-- Jalankan di Supabase SQL Editor. Aman diulang (idempoten).
-- LANGKAH 1: ganti email di bagian paling bawah dengan email admin Anda,
--            lalu jalankan seluruh skrip. Admin harus LOGIN ULANG setelahnya.
-- =========================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

-- Public READ (draft/nonaktif hanya terlihat oleh admin)
DROP POLICY IF EXISTS "Public can view active services" ON public.services;
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (is_active = true OR public.is_admin());
DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
CREATE POLICY "Public can view published posts" ON public.posts FOR SELECT USING (status = 'published' OR public.is_admin());
DROP POLICY IF EXISTS "Public can view active testimonials" ON public.testimonials;
CREATE POLICY "Public can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true OR public.is_admin());
DROP POLICY IF EXISTS "Public can view active hero slides" ON public.hero_slides;
CREATE POLICY "Public can view active hero slides" ON public.hero_slides FOR SELECT USING (is_active = true OR public.is_admin());

-- Admin FULL ACCESS
DROP POLICY IF EXISTS "Admin full access company settings" ON public.company_settings;
CREATE POLICY "Admin full access company settings" ON public.company_settings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin full access services" ON public.services;
CREATE POLICY "Admin full access services" ON public.services FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin full access projects" ON public.projects;
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin full access posts" ON public.posts;
CREATE POLICY "Admin full access posts" ON public.posts FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin full access testimonials" ON public.testimonials;
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin full access inquiries" ON public.inquiries;
CREATE POLICY "Admin full access inquiries" ON public.inquiries FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "Admin full access hero slides" ON public.hero_slides;
CREATE POLICY "Admin full access hero slides" ON public.hero_slides FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Storage cms-media
DROP POLICY IF EXISTS "Admin Upload cms-media" ON storage.objects;
CREATE POLICY "Admin Upload cms-media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cms-media' AND public.is_admin());
DROP POLICY IF EXISTS "Admin Update cms-media" ON storage.objects;
CREATE POLICY "Admin Update cms-media" ON storage.objects FOR UPDATE USING (bucket_id = 'cms-media' AND public.is_admin());
DROP POLICY IF EXISTS "Admin Delete cms-media" ON storage.objects;
CREATE POLICY "Admin Delete cms-media" ON storage.objects FOR DELETE USING (bucket_id = 'cms-media' AND public.is_admin());

-- Beri peran admin ke user Anda (GANTI EMAIL). raw_app_meta_data tidak bisa diubah oleh user sendiri.
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
WHERE email = 'GANTI_DENGAN_EMAIL_ADMIN@contoh.com';
