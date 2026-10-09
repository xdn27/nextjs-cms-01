import { cacheLife, cacheTag } from 'next/cache';
import { createClient, createPublicClient, isSupabaseConfigured } from './supabase/server';

// Tag cache untuk seluruh data publik; di-invalidate oleh server action CMS.
export const CMS_CACHE_TAG = 'cms';
import {
  initialSettings,
  initialServices,
  initialProjects,
  initialPosts,
  initialTestimonials,
  initialInquiries,
  initialHeroSlides,
} from './mock-data';
import { CompanySettings, Service, Project, Post, Testimonial, Inquiry, HeroSlide } from './types';

export async function getCompanySettings(): Promise<CompanySettings> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return initialSettings;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error || !data) {
      return initialSettings;
    }

    return data as CompanySettings;
  } catch {
    return initialSettings;
  }
}

export async function getServices(): Promise<Service[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return initialServices;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return initialServices;
    }

    return data as Service[];
  } catch {
    return initialServices;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return initialServices.find((s) => s.slug === slug) || null;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return initialServices.find((s) => s.slug === slug) || null;
    }

    return data as Service;
  } catch {
    return initialServices.find((s) => s.slug === slug) || null;
  }
}

export async function getProjects(): Promise<Project[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return initialProjects;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return initialProjects;
    }

    return data as Project[];
  } catch {
    return initialProjects;
  }
}

export async function getAdminProjects(): Promise<{ projects: Project[]; isFallback: boolean }> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return { projects: initialProjects, isFallback: true };
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return { projects: initialProjects, isFallback: true };
    }

    return { projects: (data as Project[]) ?? [], isFallback: false };
  } catch {
    return { projects: initialProjects, isFallback: true };
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return initialProjects.find((p) => p.slug === slug) || null;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return initialProjects.find((p) => p.slug === slug) || null;
    }

    return data as Project;
  } catch {
    return initialProjects.find((p) => p.slug === slug) || null;
  }
}

export async function getPosts(): Promise<Post[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return initialPosts.filter((p) => p.status === 'published');
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return initialPosts.filter((p) => p.status === 'published');
    }

    return data as Post[];
  } catch {
    return initialPosts.filter((p) => p.status === 'published');
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return initialPosts.find((p) => p.slug === slug) || null;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return initialPosts.find((p) => p.slug === slug) || null;
    }

    return data as Post;
  } catch {
    return initialPosts.find((p) => p.slug === slug) || null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return initialTestimonials;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return initialTestimonials;
    }

    return data as Testimonial[];
  } catch {
    return initialTestimonials;
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  if (!isSupabaseConfigured()) {
    return initialInquiries;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return initialInquiries;
    }

    return data as Inquiry[];
  } catch {
    return initialInquiries;
  }
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  'use cache';
  cacheTag(CMS_CACHE_TAG);
  cacheLife('hours');

  if (!isSupabaseConfigured()) {
    return initialHeroSlides.filter((s) => s.is_active);
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return initialHeroSlides.filter((s) => s.is_active);
    }

    return data as HeroSlide[];
  } catch {
    return initialHeroSlides.filter((s) => s.is_active);
  }
}

export async function getAllHeroSlides(): Promise<HeroSlide[]> {
  if (!isSupabaseConfigured()) {
    return initialHeroSlides;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return initialHeroSlides;
    }

    return data as HeroSlide[];
  } catch {
    return initialHeroSlides;
  }
}
