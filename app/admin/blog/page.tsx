import PostManager from '@/components/admin/PostManager';
import { getAdminPosts } from '@/lib/data';

export default async function AdminBlogPage() {
  const posts = await getAdminPosts();

  return <PostManager initialPosts={posts} />;
}
