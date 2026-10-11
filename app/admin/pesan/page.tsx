import React from 'react';
import { getInquiries } from '@/lib/data';
import { InquiryManager } from '@/components/admin/InquiryManager';

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return <InquiryManager initialInquiries={inquiries} />;
}
