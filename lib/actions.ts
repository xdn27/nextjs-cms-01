'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient, isSupabaseConfigured } from './supabase/server';
import { Service, Project, Post, Testimonial, HeroSlide } from './types';

// =========================================================
// 1. PUBLIC ACTIONS
// =========================================================

export async function submitContactInquiry(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = (formData.get('phone') as string) || null;
  const subject = (formData.get('subject') as string) || 'Inquiry dari Website';
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'Nama, email, dan pesan wajib diisi.' };
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from('inquiries').insert({
        name,
        email,
        phone,
        subject,
        message,
        status: 'unread',
      });

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
      return { success: false, error: errorMessage };
    }
  }

  revalidatePath('/admin/pesan');
  return { success: true, message: 'Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.' };
}

// =========================================================
// 2. AUTH ACTIONS
// =========================================================

export async function adminLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  // Hanya izinkan redirect ke path internal /admin (cegah open redirect, mis. //evil.com)
  const requestedRedirect = (formData.get('redirect') as string) || '';
  const redirectTo =
    requestedRedirect === '/admin' || /^\/admin\/[A-Za-z0-9_\-/]*$/.test(requestedRedirect)
      ? requestedRedirect
      : '/admin';

  if (!email || !password) {
    return { success: false, error: 'Email dan kata sandi wajib diisi.' };
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal melakukan autentikasi';
      return { success: false, error: errorMessage };
    }
  } else {
    // Mode offline/mock: demo login (email: admin@example.com, pass: admin123)
    if (email === 'admin@example.com' && password === 'admin123') {
      const cookieStore = await cookies();
      cookieStore.set('cms_mock_auth', 'true', { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 });
    } else {
      return {
        success: false,
        error: 'Kredensial demo salah. Gunakan admin@example.com / admin123 saat mode offline.',
      };
    }
  }

  redirect(redirectTo);
}

export async function adminLogout() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // Abaikan error saat sign out
    }
  }

  const cookieStore = await cookies();
  cookieStore.delete('cms_mock_auth');

  redirect('/login');
}

// Memastikan pemanggil adalah admin yang sudah login. Mode offline (tanpa Supabase) dilewati.
async function requireAdmin(): Promise<{ success: false; error: string } | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return { success: false, error: 'Tidak diizinkan. Silakan login sebagai admin.' };
  }
  return null;
}

// =========================================================
// 3. CMS ADMIN ACTIONS (SETTINGS & CONTENT)
// =========================================================

export async function updateCompanySettingsAction(formData: FormData) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const data = {
    company_name: formData.get('company_name') as string,
    description: formData.get('description') as string,
    logo_url: formData.get('logo_url') as string,
    contact_email: formData.get('contact_email') as string,
    contact_phone: formData.get('contact_phone') as string,
    contact_whatsapp: formData.get('contact_whatsapp') as string,
    contact_address: formData.get('contact_address') as string,
    social_facebook: formData.get('social_facebook') as string,
    social_instagram: formData.get('social_instagram') as string,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase
      .from('company_settings')
      .update(data)
      .eq('id', 1);

    if (error) {
      return { success: false, error: error.message };
    }
  }

  updateTag('content');
  revalidatePath('/');
  revalidatePath('/tentang');
  revalidatePath('/kontak');
  revalidatePath('/admin/pengaturan');

  return { success: true, message: 'Pengaturan perusahaan berhasil diperbarui!' };
}

// SERVICE ACTIONS
export async function saveServiceAction(service: Partial<Service>) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (service.id && !service.id.startsWith('s')) {
      const { error } = await supabase
        .from('services')
        .update(service)
        .eq('id', service.id);
      if (error) return { success: false, error: error.message };
    } else {
      const insertData = { ...service };
      delete insertData.id;
      const { error } = await supabase.from('services').insert(insertData);
      if (error) return { success: false, error: error.message };
    }
  }

  updateTag('content');
  revalidatePath('/layanan');
  revalidatePath('/');
  revalidatePath('/admin/layanan');
  return { success: true, message: 'Layanan berhasil disimpan!' };
}

export async function deleteServiceAction(id: string) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
  }

  updateTag('content');
  revalidatePath('/layanan');
  revalidatePath('/admin/layanan');
  return { success: true, message: 'Layanan berhasil dihapus!' };
}

// PROJECT ACTIONS
export async function saveProjectAction(project: Partial<Project>) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (project.id && !project.id.startsWith('p')) {
      const { error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', project.id);
      if (error) return { success: false, error: error.message };
    } else {
      const insertData = { ...project };
      delete insertData.id;
      const { error } = await supabase.from('projects').insert(insertData);
      if (error) return { success: false, error: error.message };
    }
  }

  updateTag('content');
  revalidatePath('/katalog');
  revalidatePath('/');
  revalidatePath('/admin/katalog');
  return { success: true, message: 'Proyek portofolio berhasil disimpan!' };
}

export async function deleteProjectAction(id: string) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
  }

  updateTag('content');
  revalidatePath('/katalog');
  revalidatePath('/admin/katalog');
  return { success: true, message: 'Proyek berhasil dihapus!' };
}

// POST ACTIONS
export async function savePostAction(post: Partial<Post>) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (post.id && !post.id.startsWith('b')) {
      const { error } = await supabase
        .from('posts')
        .update(post)
        .eq('id', post.id);
      if (error) return { success: false, error: error.message };
    } else {
      const insertData = { ...post };
      delete insertData.id;
      const { error } = await supabase.from('posts').insert(insertData);
      if (error) return { success: false, error: error.message };
    }
  }

  updateTag('content');
  revalidatePath('/blog');
  revalidatePath('/');
  revalidatePath('/admin/blog');
  return { success: true, message: 'Artikel blog berhasil disimpan!' };
}

export async function deletePostAction(id: string) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
  }

  updateTag('content');
  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  return { success: true, message: 'Artikel berhasil dihapus!' };
}

// TESTIMONIAL ACTIONS
export async function saveTestimonialAction(testimonial: Partial<Testimonial>) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (testimonial.id && !testimonial.id.startsWith('tm')) {
      const { error } = await supabase
        .from('testimonials')
        .update(testimonial)
        .eq('id', testimonial.id);
      if (error) return { success: false, error: error.message };
    } else {
      const insertData = { ...testimonial };
      delete insertData.id;
      const { error } = await supabase.from('testimonials').insert(insertData);
      if (error) return { success: false, error: error.message };
    }
  }

  updateTag('content');
  revalidatePath('/');
  revalidatePath('/admin/testimoni');
  return { success: true, message: 'Testimoni berhasil disimpan!' };
}

export async function deleteTestimonialAction(id: string) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
  }

  updateTag('content');
  revalidatePath('/');
  revalidatePath('/admin/testimoni');
  return { success: true, message: 'Testimoni berhasil dihapus!' };
}

// INQUIRY STATUS ACTION
export async function updateInquiryStatusAction(id: string, status: 'unread' | 'read' | 'replied') {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id);
    if (error) return { success: false, error: error.message };
  }

  revalidatePath('/admin/pesan');
  return { success: true, message: 'Status pesan berhasil diperbarui!' };
}

// =========================================================
// HERO SLIDE ACTIONS
// =========================================================

export async function saveHeroSlideAction(slide: Partial<HeroSlide>) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (slide.id && !slide.id.startsWith('slide-')) {
      const { error } = await supabase
        .from('hero_slides')
        .update(slide)
        .eq('id', slide.id);
      if (error) return { success: false, error: error.message };
    } else {
      const insertData = { ...slide };
      delete insertData.id;
      const { error } = await supabase.from('hero_slides').insert(insertData);
      if (error) return { success: false, error: error.message };
    }
  }

  updateTag('content');
  revalidatePath('/');
  revalidatePath('/admin/slider');
  return { success: true, message: 'Slide hero berhasil disimpan!' };
}

export async function deleteHeroSlideAction(id: string) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.from('hero_slides').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
  }

  updateTag('content');
  revalidatePath('/');
  revalidatePath('/admin/slider');
  return { success: true, message: 'Slide hero berhasil dihapus!' };
}

export async function toggleHeroSlideStatusAction(id: string, is_active: boolean) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase
      .from('hero_slides')
      .update({ is_active })
      .eq('id', id);
    if (error) return { success: false, error: error.message };
  }

  updateTag('content');
  revalidatePath('/');
  revalidatePath('/admin/slider');
  return { success: true, message: `Status slide berhasil ${is_active ? 'diaktifkan' : 'dinonaktifkan'}!` };
}
