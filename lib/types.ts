export interface CompanySettings {
  id: number;
  company_name: string;
  description: string;
  logo_url?: string | null;
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_address: string;
  social_facebook?: string | null;
  social_instagram?: string | null;
  updated_at?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description?: string | null;
  icon?: string | null;
  features: string[];
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  client_name?: string | null;
  summary: string;
  description?: string | null;
  cover_image?: string | null;
  project_url?: string | null;
  is_featured: boolean;
  display_order: number;
  created_at?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string;
  cover_image?: string | null;
  category: string;
  author_name: string;
  tags: string[];
  status: 'draft' | 'published';
  published_at?: string;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title?: string | null;
  company?: string | null;
  avatar_url?: string | null;
  quote: string;
  rating: number;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at?: string;
}

export interface HeroSlideHighlight {
  text: string;
  icon?: string;
  iconColor?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge_text: string;
  badge_color?: string | null;
  badge_icon?: string | null;
  image_url: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  highlights?: HeroSlideHighlight[] | string[] | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}
