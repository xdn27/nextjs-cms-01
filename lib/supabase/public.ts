import { createServerClient } from '@supabase/ssr';

// Klien Supabase tanpa cookie untuk membaca data publik (RLS role anon).
// Tidak memakai cookies()/headers(), sehingga aman dipanggil dari fungsi
// 'use cache' dan saat prerender (generateStaticParams, sitemap, dsb).
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {},
    },
  });
}
