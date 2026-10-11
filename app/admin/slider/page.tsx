import React from 'react';
import { getAllHeroSlides } from '@/lib/data';
import { SliderManager } from '@/components/admin/SliderManager';

export default async function AdminSlidersPage() {
  const slides = await getAllHeroSlides();

  return <SliderManager initialSlides={slides} />;
}
