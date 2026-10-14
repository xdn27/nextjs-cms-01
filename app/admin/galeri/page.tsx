import React from 'react';
import { getAllGalleryItems } from '@/lib/data';
import { GalleryManager } from '@/components/admin/GalleryManager';

export default async function AdminGalleryPage() {
  const items = await getAllGalleryItems();

  return <GalleryManager initialItems={items} />;
}
