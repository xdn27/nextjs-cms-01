import SettingsManager from '@/components/admin/SettingsManager';
import { getCompanySettings } from '@/lib/data';

export default async function AdminSettingsPage() {
  const settings = await getCompanySettings();

  return <SettingsManager initialSettings={settings} />;
}
