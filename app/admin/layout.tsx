import AdminShell from '@/components/admin/AdminShell';
import { getCompanySettings } from '@/lib/data';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const settings = await getCompanySettings();

  return <AdminShell companyName={settings.company_name}>{children}</AdminShell>;
}