-- Jam operasional toko yang bisa diatur dari CMS (satu baris = satu jadwal)
ALTER TABLE public.company_settings
    ADD COLUMN IF NOT EXISTS business_hours TEXT
    DEFAULT E'Senin - Sabtu: 09:00 - 20:00 WIB\nMinggu: 10:00 - 18:00 WIB';

UPDATE public.company_settings
SET business_hours = E'Senin - Sabtu: 09:00 - 20:00 WIB\nMinggu: 10:00 - 18:00 WIB'
WHERE business_hours IS NULL;
