'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { savePostAction, deletePostAction } from '@/lib/actions';
import { initialPosts } from '@/lib/mock-data';
import { Post } from '@/lib/types';
import { MediaUploader } from '@/components/admin/MediaUploader';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [contentInput, setContentInput] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleOpenCreate() {
    setEditingPost({
      title: '',
      slug: '',
      category: 'Teknologi',
      author_name: 'Tim Redaksi',
      excerpt: '',
      content: '',
      cover_image: '',
      status: 'published',
      tags: [],
    });
    setCoverImageUrl('');
    setContentInput('<p>Tuliskan paragraf pertama artikel Anda di sini...</p>');
    setTagsInput('Teknologi, Cloud, Next.js');
    setIsModalOpen(true);
  }

  function handleOpenEdit(post: Post) {
    setEditingPost(post);
    setCoverImageUrl(post.cover_image || '');
    setContentInput(post.content || '');
    setTagsInput(post.tags ? post.tags.join(', ') : '');
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    setLoading(true);
    await deletePostAction(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setFeedback('Artikel berhasil dihapus.');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingPost) return;

    setLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = (formData.get('slug') as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = formData.get('category') as string;
    const author_name = formData.get('author_name') as string;
    const excerpt = formData.get('excerpt') as string;
    const status = formData.get('status') as 'draft' | 'published';

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedData: Partial<Post> = {
      ...editingPost,
      title,
      slug,
      category,
      author_name,
      excerpt,
      content: contentInput,
      cover_image: coverImageUrl,
      tags,
      status,
    };

    const res = await savePostAction(updatedData);

    if (res.success) {
      if (editingPost.id) {
        setPosts((prev) =>
          prev.map((p) => (p.id === editingPost.id ? ({ ...p, ...updatedData } as Post) : p))
        );
      } else {
        const newPost: Post = {
          ...(updatedData as Post),
          id: `b-${Date.now()}`,
          published_at: new Date().toISOString(),
        };
        setPosts((prev) => [newPost, ...prev]);
      }
      setIsModalOpen(false);
      setFeedback('Artikel berhasil disimpan!');
    } else {
      setFeedback(res.error || 'Gagal menyimpan artikel.');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Kelola Blog & Artikel
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Publikasikan wawasan teknologi, tutorial, dan siaran pers perusahaan.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {feedback && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-xs font-medium text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200">
          {feedback}
        </div>
      )}

      {/* Posts Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 uppercase font-semibold dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
              <tr>
                <th className="px-6 py-3.5">Foto & Judul Artikel</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Penulis</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Tanggal</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {posts.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.cover_image ? (
                        <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 shrink-0">
                          <Image src={item.cover_image} alt={item.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-12 w-16 rounded-lg bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-400">
                          No Pic
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-neutral-900 dark:text-white block line-clamp-1">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          /{item.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                    {item.author_name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        item.status === 'published'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {item.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 font-mono text-[11px]">
                    {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-indigo-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
                      title="Edit Artikel"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-rose-50 hover:text-rose-600 dark:text-neutral-400 dark:hover:bg-rose-950/40"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {editingPost.id ? 'Edit Artikel Blog' : 'Tulis Artikel Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingPost.title}
                  placeholder="Contoh: Mengapa Arsitektur Serverless Menjadi Pilihan Utama"
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Kategori
                  </label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingPost.category || 'Teknologi'}
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Nama Penulis
                  </label>
                  <input
                    type="text"
                    name="author_name"
                    defaultValue={editingPost.author_name || 'Tim Redaksi'}
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Status Publikasi
                  </label>
                  <select
                    name="status"
                    defaultValue={editingPost.status || 'published'}
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  >
                    <option value="published">Published (Tayang)</option>
                    <option value="draft">Draft (Konsep)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Ringkasan Artikel (Excerpt)
                </label>
                <textarea
                  name="excerpt"
                  rows={2}
                  defaultValue={editingPost.excerpt || ''}
                  placeholder="Ringkasan singkat untuk kartu preview dan meta deskripsi SEO..."
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              {/* Cover Image */}
              <MediaUploader
                label="Foto Sampul Artikel (Cover Image)"
                value={coverImageUrl}
                onChange={(url) => setCoverImageUrl(url)}
                helperText="Upload gambar berkualitas tinggi untuk header artikel."
              />

              {/* Content Editor */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Isi Konten Artikel (HTML / Teks Kaya)
                  </label>
                  <span className="text-[11px] text-neutral-400">
                    Mendukung tag HTML &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;blockquote&gt;
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 p-4 font-mono text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Tag / Label (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Next.js, Serverless, Supabase, Cloud"
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-500 disabled:opacity-50"
                >
                  {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Simpan Artikel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
