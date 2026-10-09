import type { User } from '@supabase/supabase-js';

// Admin = user dengan app_metadata.role === 'admin'.
// app_metadata hanya bisa diubah lewat service role/dashboard, tidak oleh user sendiri.
export function isAdminUser(user: Pick<User, 'app_metadata'> | null | undefined): boolean {
  return user?.app_metadata?.role === 'admin';
}
