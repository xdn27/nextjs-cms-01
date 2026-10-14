-- URL embed Google Maps untuk halaman Kontak (diatur dari CMS)
ALTER TABLE public.company_settings
    ADD COLUMN IF NOT EXISTS maps_embed_url TEXT;
