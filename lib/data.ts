import { cacheLife, cacheTag } from 'next/cache';
import { createClient, createPublicClient, isSupabaseConfigured } from './supabase/server';

// Tag cache untuk seluruh data publik; di-invalidate oleh server action CMS.
export const CMS_CACHE_TAG = 'cms';
import { CompanySettings, Service, Project, Post, Testimonial, Inquiry, HeroSlide } from './types';

export const emptyCompanySettings: CompanySettings = {
  id: 1,
  company_name: '',
  description: '',
  logo_url: null,
  contact_email: '',
  contact_phone: '',
  contact_whatsapp: '',
  contact_address: '',
  social_facebook: null,
  social_instagram: null,
};

export async function getCompanySettings(): Promise<CompanySettings> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return emptyCompanySettings;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error || !data) {
      return emptyCompanySettings;
    }

    return data as CompanySettings;
  } catch {
    return emptyCompanySettings;
  }
}

export async function getServices(): Promise<Service[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as Service[];
  } catch {
    return [];
  }
}

export async function getAdminServices(): Promise<Service[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as Service[];
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Service;
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as Project[];
  } catch {
    return [];
  }
}

export async function getAdminProjects(): Promise<Project[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as Project[];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Project;
  } catch {
    return null;
  }
}

export async function getPosts(): Promise<Post[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as Post[];
  } catch {
    return [];
  }
}

export async function getAdminPosts(): Promise<Post[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as Post[];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Post;
  } catch {
    return null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as Testimonial[];
  } catch {
    return [];
  }
}

export async function getAdminTestimonials(): Promise<Testimonial[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as Testimonial[];
  } catch {
    return [];
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as Inquiry[];
  } catch {
    return [];
  }
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as HeroSlide[];
  } catch {
    return [];
  }
}

export async function getAllHeroSlides(): Promise<HeroSlide[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as HeroSlide[];
  } catch {
    return [];
  }
}
