-- Galeri foto yang dikelola dari CMS
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    caption TEXT,
    image_url TEXT NOT NULL,
    category TEXT,
    is_featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active gallery items" ON public.gallery_items;
CREATE POLICY "Public can view active gallery items" ON public.gallery_items
    FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin full access gallery items" ON public.gallery_items;
CREATE POLICY "Admin full access gallery items" ON public.gallery_items
    FOR ALL USING (public.is_admin());
