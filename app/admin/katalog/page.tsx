import ProjectManager from '@/components/admin/ProjectManager';
import { getAdminProjects } from '@/lib/data';

export default async function AdminPortfolioPage() {
  const { projects, isFallback } = await getAdminProjects();

  return <ProjectManager initialProjects={projects} isFallback={isFallback} />;
}
