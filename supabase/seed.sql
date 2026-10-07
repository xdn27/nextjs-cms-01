-- =========================================================
-- SEED DATA FOR COMPANY PROFILE & CMS
-- =========================================================

-- 1. COMPANY SETTINGS
INSERT INTO public.company_settings (
    id,
    company_name,
    tagline,
    description,
    logo_url,
    hero_title,
    hero_subtitle,
    hero_cta_text,
    hero_cta_link,
    contact_email,
    contact_phone,
    contact_whatsapp,
    contact_address,
    social_facebook,
    social_instagram,
    social_linkedin,
    social_twitter
) VALUES (
    1,
    'Nusantara Tech Innovasi',
    'Mitra Transformasi Digital & Solusi Perangkat Lunak Terdepan',
    'Kami membantu korporasi dan startup berkembang pesat melalui rekayasa perangkat lunak modern, arsitektur cloud serverless, dan kecerdasan buatan terapan.',
    '/images/logo.svg',
    'Akselerasi Pertumbuhan Bisnis Anda dengan Solusi Digital Andal',
    'Bangun aplikasi web, mobile, dan sistem enterprise berkinerja tinggi bersama tim insinyur berpengalaman yang berfokus pada hasil nyata.',
    'Mulai Konsultasi',
    '/contact',
    'halo@nusantaratech.id',
    '+62 21 5550 9876',
    '+62 812 8899 7700',
    'Sudirman Central Business District (SCBD), Gedung Artha Graha Lt. 24, Jakarta Selatan, 12190',
    'https://facebook.com/nusantaratech',
    'https://instagram.com/nusantaratech',
    'https://linkedin.com/company/nusantaratech',
    'https://x.com/nusantaratech'
) ON CONFLICT (id) DO UPDATE SET
    company_name = EXCLUDED.company_name,
    tagline = EXCLUDED.tagline,
    description = EXCLUDED.description,
    hero_title = EXCLUDED.hero_title,
    hero_subtitle = EXCLUDED.hero_subtitle;

-- 2. SERVICES
INSERT INTO public.services (slug, title, summary, description, icon, features, display_order, is_active) VALUES
(
    'custom-web-development',
    'Pengembangan Web & SaaS',
    'Aplikasi web modern berskala enterprise dengan Next.js, React, dan arsitektur serverless yang cepat serta aman.',
    'Kami merancang dan membangun platform web yang responsif, teroptimasi untuk mesin pencari (SEO), dan siap menangani jutaan pengunjung. Mulai dari sistem portal internal, e-commerce skala besar, hingga aplikasi SaaS modern dengan skalabilitas elastis.',
    'Globe',
    ARRAY['Next.js & React App Router', 'Arsitektur Serverless & Edge Caching', 'Integrasi API & Payment Gateway', 'Keamanan Tingkat Enterprise'],
    1,
    true
),
(
    'mobile-app-development',
    'Aplikasi Mobile iOS & Android',
    'Pengalaman mobile native yang intuitif, responsif, dan stabil untuk pengguna Anda di berbagai perangkat.',
    'Pengembangan aplikasi mobile menggunakan teknologi cross-platform performa tinggi seperti Flutter dan React Native. Dibuat dengan antarmuka yang ramah pengguna (UI/UX modern) dan sinkronisasi real-time yang mulus.',
    'Smartphone',
    ARRAY['Dukungan Penuh iOS & Android', 'Antarmuka Halus 60-120 FPS', 'Offline-First & Sinkronisasi Data', 'Push Notifications & Analitik'],
    2,
    true
),
(
    'cloud-devops-consulting',
    'Cloud Architecture & DevOps',
    'Otomatisasi infrastruktur cloud, pipeline CI/CD, dan pemantauan sistem dengan efisiensi biaya optimal.',
    'Migrasikan infrastruktur Anda ke cloud modern (AWS, Google Cloud, Vercel, Supabase) dengan arsitektur microservices atau serverless. Kami mengotomatiskan deployment dan memperkuat keamanan sistem Anda.',
    'Cloud',
    ARRAY['Infrastruktur Serverless & Kontainer', 'Pipeline CI/CD Otomatis', 'Pemantauan 24/7 & Alerting', 'Optimasi Biaya Cloud hingga 40%'],
    3,
    true
),
(
    'ai-data-intelligence',
    'AI & Solusi Kecerdasan Buatan',
    'Integrasi Large Language Models (LLM), otomasi alur kerja cerdas, dan analitik data prediktif.',
    'Bantu tim Anda bekerja lebih cepat dengan asisten cerdas, ekstraksi dokumen otomatis, chatbot interaktif untuk layanan pelanggan, serta model prediksi berbasis data bisnis Anda.',
    'Sparkles',
    ARRAY['Integrasi LLM & Agen AI Khusus', 'Otomasi Pemrosesan Dokumen', 'Pencarian Semantik Berbasis Vektor', 'Dashboard Analitik Prediktif'],
    4,
    true
),
(
    'ui-ux-design',
    'Desain UI/UX & Riset Pengguna',
    'Perancangan antarmuka pengguna yang estetik, mudah digunakan, dan terbukti meningkatkan konversi bisnis.',
    'Kami memadukan riset pengguna mendalam, wireframing, prototyping interaktif, dan Design System yang konsisten agar produk Anda disukai oleh pengguna sejak hari pertama peluncuran.',
    'Palette',
    ARRAY['Design System & Komponen Siap Pakai', 'Prototyping Figma Beresolusi Tinggi', 'Uji Kegunaan (Usability Testing)', 'Konversi & UX Audit'],
    5,
    true
),
(
    'cyber-security-audit',
    'Keamanan Siber & Audit Sistem',
    'Audit keamanan menyeluruh, penetration testing, dan kepatuhan standar data untuk perlindungan maksimal.',
    'Lindungi aset digital dan data sensitif pelanggan Anda dari ancaman siber dengan audit kode sumber, pengetesan celah keamanan, dan implementasi praktik keamanan terbaik.',
    'ShieldCheck',
    ARRAY['Vulnerability Assessment & Pen-Testing', 'Enkripsi End-to-End & RLS', 'Review Kepatuhan Privasi Data', 'Rencana Penanggulangan Insiden'],
    6,
    true
)
ON CONFLICT (slug) DO NOTHING;

-- 3. PROJECTS / PORTFOLIO
INSERT INTO public.projects (slug, title, category, client_name, summary, description, cover_image, project_url, is_featured, display_order) VALUES
(
    'fintech-dashboard-platform',
    'Platform Analitik & Manajemen Portofolio Fintech',
    'Web Development',
    'FinTech Nusantara',
    'Dashboard analitik real-time untuk memantau performa investasi dan transaksi keuangan dengan latensi di bawah 100ms.',
    'Kami membangun sistem analitik terdistribusi dengan visualisasi data interaktif, integrasi open banking API, dan sistem keamanan otentikasi biometrik multi-faktor.',
    '/images/projects/fintech.svg',
    'https://example.com/project-fintech',
    true,
    1
),
(
    'supply-chain-mobile-app',
    'Aplikasi Mobile Manajemen Logistik & Pelacakan Armada',
    'Mobile App',
    'Logistik Prima Cargo',
    'Aplikasi pelacakan pengiriman kurir dan armada kargo dengan GPS real-time dan tanda tangan digital bukti penerimaan.',
    'Platform terintegrasi yang memudahkan pengemudi menerima pesanan dan memungkinkan kantor pusat memantau rute pengiriman secara langsung dengan algoritma efisiensi bahan bakar.',
    '/images/projects/logistics.svg',
    'https://example.com/project-logistics',
    true,
    2
),
(
    'healthcare-telemedicine-portal',
    'Portal Telemedisin & Rekam Medis Elektronik',
    'Web Development',
    'Klinik Sehat Terpadu',
    'Sistem konsultasi dokter online, resep elektronik, dan integrasi rekam medis terenkripsi sesuai standar kesehatan.',
    'Mendukung ribuan pasien berkonsultasi secara aman melalui video call WebRTC terenkripsi, pembayaran instan, dan pengiriman obat otomatis ke alamat pasien.',
    '/images/projects/healthcare.svg',
    'https://example.com/project-healthcare',
    true,
    3
),
(
    'ai-powered-ecommerce-recommendation',
    'Mesin Rekomendasi Cerdas untuk E-Commerce Fashion',
    'AI & Data',
    'ModaStyle Retail',
    'Penerapan AI untuk personalisasi katalog pakaian yang meningkatkan tingkat konversi transaksi sebesar 38%.',
    'Model machine learning yang menganalisis tren belanja pengguna secara real-time dan memberikan saran padu-padan busana yang relevan secara otomatis.',
    '/images/projects/ecommerce.svg',
    'https://example.com/project-ecommerce',
    false,
    4
)
ON CONFLICT (slug) DO NOTHING;

-- 4. BLOG / POSTS
INSERT INTO public.posts (slug, title, excerpt, content, cover_image, category, author_name, tags, status, published_at) VALUES
(
    'tren-arsitektur-serverless-2026',
    'Mengapa Arsitektur Serverless Menjadi Pilihan Utama Startup & Enterprise',
    'Panduan lengkap mengenai efisiensi biaya, kemudahan skalabilitas, dan keandalan sistem serverless modern berbasis Next.js dan Supabase.',
    '<h2>Pengantar Arsitektur Modern</h2><p>Dunia pengembangan aplikasi web telah berkembang pesat. Pola pengelolaan server konvensional yang membutuhkan tim khusus untuk memantau kapasitas CPU dan RAM kini digantikan oleh paradigma <strong>Serverless</strong> dan <strong>Edge Computing</strong>.</p><h3>1. Efisiensi Biaya (Zero Cost at Idle)</h3><p>Dengan serverless, Anda hanya membayar untuk komputasi yang benar-benar digunakan saat ada request masuk. Jika di malam hari lalu lintas pengunjung rendah, biaya operasional pun mendekati nol.</p><h3>2. Skalabilitas Instan</h3><p>Ketika kampanye pemasaran diluncurkan dan terjadi lonjakan pengunjung ribuan kali lipat dalam hitungan menit, platform serverless secara otomatis menggandakan instance fungsi komputasi tanpa downtime.</p><h3>3. Fokus pada Logika Bisnis</h3><p>Para pengembang tidak perlu lagi menghabiskan waktu berjam-jam untuk update kernel sistem operasi, sertifikat SSL manual, atau patch keamanan server. Semua ditangani secara transparan oleh platform seperti Vercel dan Supabase.</p>',
    '/images/blog/serverless.svg',
    'Teknologi',
    'Budi Santoso',
    ARRAY['Serverless', 'Cloud', 'Next.js', 'Vercel', 'Supabase'],
    'published',
    NOW() - INTERVAL '2 days'
),
(
    'strategi-keamanan-data-postgresql-rls',
    'Menerapkan Row-Level Security (RLS) di PostgreSQL untuk Keamanan Maksimal',
    'Bagaimana melindungi data multi-tenant dan data sensitif langsung dari level database dengan Row Level Security Supabase.',
    '<h2>Keamanan Berlapis di Level Basis Data</h2><p>Banyak celah keamanan terjadi karena pengembang hanya mengandalkan pengecekan otorisasi di level kode aplikasi (backend route). Jika satu baris logika terlewat, data pengguna lain dapat terekspos.</p><h3>Kekuatan Row Level Security (RLS)</h3><p>Row-Level Security pada PostgreSQL memastikan bahwa setiap kueri—baik SELECT, UPDATE, maupun DELETE—hanya dapat mengakses baris data yang memenuhi kondisi kebijakan keamanan yang telah ditentukan di level engine database.</p><blockquote>"Keamanan terbaik adalah keamanan yang tidak bergantung pada asumsi aplikasi."</blockquote><p>Dengan mengombinasikan Supabase Auth dan RLS policies, kita dapat membuat aturan deklaratif yang sangat ketat namun mudah dirawat.</p>',
    '/images/blog/security.svg',
    'Keamanan',
    'Dewi Anggraini',
    ARRAY['PostgreSQL', 'Database', 'Security', 'RLS', 'Supabase'],
    'published',
    NOW() - INTERVAL '5 days'
),
(
    'meningkatkan-konversi-website-lewat-core-web-vitals',
    'Rahasia Memaksimalkan Core Web Vitals untuk SEO dan Konversi Penjualan',
    'Pelajari cara mengoptimalkan Largest Contentful Paint (LCP), Interaction to Next Paint (INP), dan Cumulative Layout Shift (CLS).',
    '<h2>Kecepatan Adalah Kunci Penjualan</h2><p>Studi Google menunjukkan bahwa setiap penundaan 1 detik dalam waktu muat halaman seluler dapat menurunkan tingkat konversi hingga 20%. Di era sekarang, kecepatan bukan lagi nilai tambah opsional, melainkan kebutuhan primer.</p><h3>Tips Praktis Optimasi</h3><ul><li>Gunakan format gambar modern seperti AVIF dan WebP dengan ukuran responsif.</li><li>Terapkan strategi font streaming dan preconnect ke domain penting.</li><li>Gunakan Server Components untuk mengurangi ukuran bundel JavaScript di browser pengunjung.</li></ul>',
    '/images/blog/vitals.svg',
    'Bisnis & Desain',
    'Rian Prasetyo',
    ARRAY['SEO', 'Web Vitals', 'Performance', 'React'],
    'published',
    NOW() - INTERVAL '10 days'
)
ON CONFLICT (slug) DO NOTHING;

-- 5. TEAM MEMBERS
INSERT INTO public.team_members (name, role, photo_url, bio, social_linkedin, social_twitter, display_order, is_active) VALUES
(
    'Budi Santoso, M.Kom',
    'Chief Executive Officer & Founder',
    '/images/team/budi.svg',
    'Praktisi teknologi dengan pengalaman 15+ tahun memimpin transformasi digital di berbagai korporasi multinasional dan startup unicorn.',
    'https://linkedin.com',
    'https://x.com',
    1,
    true
),
(
    'Dewi Anggraini, S.T.',
    'Chief Technology Officer',
    '/images/team/dewi.svg',
    'Pakar arsitektur cloud serverless, keamanan data terdistribusi, dan kecerdasan buatan terapan.',
    'https://linkedin.com',
    'https://x.com',
    2,
    true
),
(
    'Rian Prasetyo, B.Des',
    'Head of Product & Design',
    '/images/team/rian.svg',
    'Desainer produk digital peraih penghargaan yang berfokus pada pengalaman pengguna yang intuitif, elegan, dan berdampak nyata.',
    'https://linkedin.com',
    'https://x.com',
    3,
    true
),
(
    'Siti Rahmawati',
    'Head of Client Success & Delivery',
    '/images/team/siti.svg',
    'Menjaga hubungan erat dengan mitra bisnis dan memastikan setiap proyek diselesaikan tepat waktu sesuai standar kualitas tinggi.',
    'https://linkedin.com',
    'https://x.com',
    4,
    true
)
ON CONFLICT DO NOTHING;

-- 6. TESTIMONIALS
INSERT INTO public.testimonials (client_name, client_title, company, avatar_url, quote, rating, display_order, is_active) VALUES
(
    'Ir. Hendra Gunawan',
    'Managing Director',
    'PT Samudera Logistik Makmur',
    '/images/testimonials/hendra.svg',
    'Kolaborasi dengan tim Nusantara Tech Innovasi melampaui ekspektasi kami. Sistem armada logistik yang mereka bangun memangkas waktu operasional hingga 35% dan sangat stabil saat lonjakan pengiriman akhir tahun.',
    5,
    1,
    true
),
(
    'Clara Wijaya',
    'Chief Operating Officer',
    'FinTech Nusa Investa',
    '/images/testimonials/clara.svg',
    'Platform analitik investasi yang dibangun berjalan dengan sangat cepat dan aman. Kemudahan tim kami mengelola konten dan berita lewat panel CMS-nya sangat membantu produktivitas harian.',
    5,
    2,
    true
),
(
    'Dr. Michael Salim',
    'Direktur Medis',
    'Klinik Sehat Terpadu',
    '/images/testimonials/michael.svg',
    'Sangat profesional dalam merancang aplikasi telemedisin dengan enkripsi data medis tingkat tinggi. Pasien kami memberikan ulasan sangat positif terhadap kemudahan penggunaannya.',
    5,
    3,
    true
)
ON CONFLICT DO NOTHING;

-- 7. INQUIRIES (SAMPLE DATA)
INSERT INTO public.inquiries (name, email, phone, subject, message, status, created_at) VALUES
(
    'Ahmad Fauzi',
    'fauzi@perusahaanmitra.co.id',
    '+62 811 2233 4455',
    'Rencana Pembuatan Sistem ERP Internal',
    'Halo, perusahaan kami berencana mengembangkan portal web internal untuk manajemen inventaris di 5 cabang. Bisakah kami menjadwalkan diskusi konsultasi minggu ini?',
    'unread',
    NOW() - INTERVAL '1 day'
),
(
    'Maya Putri',
    'maya.putri@brandretail.com',
    '+62 817 9988 1122',
    'Pengembangan Aplikasi Mobile E-Commerce',
    'Kami ingin membuat aplikasi mobile berbasis Flutter untuk toko retail fashion kami yang terhubung dengan payment gateway dan sistem kurir otomatis.',
    'read',
    NOW() - INTERVAL '3 days'
)
ON CONFLICT DO NOTHING;
