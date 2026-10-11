import TestimonialManager from '@/components/admin/TestimonialManager';
import { getAdminTestimonials } from '@/lib/data';

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminTestimonials();

  return <TestimonialManager initialTestimonials={testimonials} />;
}
