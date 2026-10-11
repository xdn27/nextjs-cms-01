import ServiceManager from '@/components/admin/ServiceManager';
import { getAdminServices } from '@/lib/data';

export default async function AdminServicesPage() {
  const services = await getAdminServices();

  return <ServiceManager initialServices={services} />;
}
