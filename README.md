# CyberTech Computer & Gaming - Company Profile & Serverless CMS

Website **Company Profile** untuk toko komputer & gaming, dilengkapi **Content Management System (CMS)** internal yang dapat dideploy secara serverless di **Vercel** dengan database dan autentikasi menggunakan **Supabase**.

---

## 🚀 Fitur Utama

### 1. Sisi Publik (Company Profile)
- **Beranda (Home)**: Hero slider dinamis dengan badge, highlight, dan CTA ganda; layanan unggulan; katalog produk pilihan; testimoni klien; artikel blog terbaru; dan CTA kontak.
- **Tentang Kami (About Us)**: Sejarah perusahaan, visi & misi, dan nilai inti.
- **Layanan (Services)**: Katalog layanan (rakit PC gaming, servis laptop/PC, cleaning & repaste, upgrade RAM/SSD/GPU) lengkap dengan anchor per layanan, ringkasan, dan cakupan fitur.
- **Katalog Produk (`/katalog`)**: Galeri produk PC Gaming, Laptop, Workstation, Komputer Kasir, dan Monitor dengan kategori, serta halaman detail produk (`/katalog/[slug]`).
- **Blog & Artikel**: Daftar artikel (`/blog`), detail artikel berformat tipografi rapi (`/blog/[slug]`), kategori, tags, dan status draft/published.
- **Kontak (Contact Us)**: Formulir pengiriman pesan/lead langsung tersimpan ke database CMS, plus tombol WhatsApp mengambang (Floating WhatsApp).
- **SEO & Performa**: Sitemap dinamis (`/sitemap.xml`), `robots.txt` (`/robots.txt`), OpenGraph meta, dan on-demand ISR revalidation.

### 2. Sisi CMS (Panel Admin di `/admin`)
- **Autentikasi Aman**: Terproteksi session cookies dengan middleware Supabase SSR (`proxy.ts`).
- **Dashboard Metrik**: Ringkasan jumlah artikel, produk/proyek, layanan, dan pesan masuk baru.
- **Pengaturan Situs**: Ganti nama perusahaan, logo, deskripsi profil, nomor telepon/WhatsApp, email, alamat kantor, dan akun media sosial.
- **Kelola Layanan**: Tambah, ubah, urutkan, dan aktifkan/nonaktifkan layanan bisnis.
- **Kelola Portofolio/Produk**: Upload cover gambar, kelola detail produk (kategori, klien, URL), dan tentukan produk unggulan di beranda.
- **Kelola Blog & Artikel**: Tulis artikel baru dengan status Draft/Published, upload cover image, kategori, dan tags.
- **Kelola Ulasan Pelanggan**: Input ulasan klien dan rating bintang 1-5.
- **Kelola Hero Slider**: Atur slide hero beranda (judul, subtitle, badge, gambar, CTA, highlight dengan icon & warna, urutan, aktif/nonaktif).
- **Kotak Masuk Pesan (Inquiries)**: Baca pesan calon klien, tandai status sudah dibaca/dibalas, dan balas langsung via email / WhatsApp.
- **Media Storage**: Upload gambar langsung ke Supabase Storage bucket `cms-media`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Server Actions, React 19, Turbopack)
- **Database & Auth**: Supabase (PostgreSQL, Supabase Auth, Storage)
- **Styling**: Tailwind CSS 4, Lucide React, Radix UI, shadcn/ui components
- **Deployment**: Vercel (Edge & Serverless Functions)

---

## 📦 Panduan Menghubungkan ke Supabase

### Langkah 1: Buat Proyek Supabase
1. Buka [database.new](https://database.new) dan buat proyek Supabase baru (gratis).
2. Di dashboard Supabase, buka menu **SQL Editor**.

### Langkah 2: Jalankan Skema & Seed
1. Salin seluruh isi file [`supabase/schema.sql`](supabase/schema.sql) dan jalankan di SQL Editor Supabase.
   *(Ini akan membuat tabel `company_settings`, `services`, `projects`, `posts`, `team_members`, `testimonials`, `inquiries`, `hero_slides`, storage bucket `cms-media`, serta kebijakan Row-Level Security).*
2. Salin seluruh isi file [`supabase/seed.sql`](supabase/seed.sql) dan jalankan di SQL Editor Supabase untuk mengisi konten awal yang siap pakai.

### Langkah 3: Konfigurasi Environment Variable
Buka file `.env.local` di proyek ini dan masukkan kredensial dari **Supabase Dashboard > Project Settings > API**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh......
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Opsional: Service role key untuk bypass RLS pada task server-side tertentu
SUPABASE_SERVICE_ROLE_KEY=...
```

### Langkah 4: Buat Akun Admin Pertama
Di dashboard Supabase:
1. Buka menu **Authentication > Users**.
2. Klik **Add User** > **Create User**.
3. Masukkan Email dan Password untuk login admin Anda.

> **Catatan Mode Offline / Demo:**  
> Jika variabel Supabase belum diisi, website secara otomatis berjalan dalam mode demo dengan data awal lengkap (`lib/mock-data.ts`). Anda dapat mencoba login ke panel admin menggunakan email: `admin@example.com` dan kata sandi: `admin123`.

---

## 🚢 Panduan Deploy ke Vercel

1. Buat repository baru di GitHub dan push kode ini:
   ```bash
   git add .
   git commit -m "feat: initial company profile and cms"
   git push origin main
   ```
2. Buka [vercel.com](https://vercel.com) dan klik **Add New... > Project**.
3. Pilih repository GitHub Anda.
4. Pada bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`: URL project Supabase Anda
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon Public Key Supabase Anda
   - `NEXT_PUBLIC_SITE_URL`: Domain Vercel Anda (misal `https://your-company.vercel.app`)
5. Klik **Deploy**! Website Anda akan aktif secara global dalam hitungan detik.

---

## 💻 Menjalankan di Lokal (Development)

```bash
# Instal dependensi
npm install

# Jalankan server development
npm run dev

# Buka browser
http://localhost:3000
# Panel CMS Admin
http://localhost:3000/admin
```

### Skrip Lainnya
```bash
npm run build   # Build production
npm run start   # Jalankan hasil build
npm run lint    # ESLint
```
