import { createClient, isSupabaseConfigured } from './supabase/client';

export async function uploadMedia(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!file) {
    return { success: false, error: 'File tidak ditemukan' };
  }

  // Jika Supabase terkonfigurasi, upload ke storage bucket 'cms-media'
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('cms-media')
        .upload(filePath, file);

      if (uploadError) {
        return { success: false, error: uploadError.message };
      }

      const { data } = supabase.storage.from('cms-media').getPublicUrl(filePath);
      return { success: true, url: data.publicUrl };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengupload file ke storage';
      return { success: false, error: errorMessage };
    }
  }

  // Fallback untuk mode development/mock (preview): baca sebagai Data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ success: true, url: reader.result as string });
    };
    reader.onerror = () => {
      resolve({ success: false, error: 'Gagal memproses file lokal' });
    };
    reader.readAsDataURL(file);
  });
}
