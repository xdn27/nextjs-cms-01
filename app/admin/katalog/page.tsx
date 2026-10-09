import ProjectManager from '@/components/admin/ProjectManager';
import { getAdminProjects } from '@/lib/data';

export default async function AdminPortfolioPage() {
  const projects = await getAdminProjects();

  return <ProjectManager serverProjects={projects} />;
}
