'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Loader2, Star } from 'lucide-react';
import { saveTestimonialAction, deleteTestimonialAction } from '@/lib/actions';
import { initialTestimonials } from '@/lib/mock-data';
import { Testimonial } from '@/lib/types';
import { MediaUploader } from '@/components/admin/MediaUploader';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleOpenCreate() {
    setEditingItem({
      client_name: '',
      client_title: '',
      company: '',
      quote: '',
      avatar_url: '',
      rating: 5,
      display_order: testimonials.length + 1,
      is_active: true,
    });
    setAvatarUrl('');
    setIsModalOpen(true);
  }

  function handleOpenEdit(item: Testimonial) {
    setEditingItem(item);
    setAvatarUrl(item.avatar_url || '');
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus testimoni ini?')) return;
    setLoading(true);
    await deleteTestimonialAction(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    setFeedback('Testimoni berhasil dihapus.');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingItem) return;

    setLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const client_name = formData.get('client_name') as string;
    const client_title = formData.get('client_title') as string;
    const company = formData.get('company') as string;
    const quote = formData.get('quote') as string;
    const rating = Number(formData.get('rating')) || 5;
    const display_order = Number(formData.get('display_order')) || 1;
    const is_active = formData.get('is_active') === 'on';

    const updatedData: Partial<Testimonial> = {
      ...editingItem,
      client_name,
      client_title,
      company,
      quote,
      rating,
      avatar_url: avatarUrl,
      display_order,
      is_active,
    };

    const res = await saveTestimonialAction(updatedData);

    if (res.success) {
      if (editingItem.id) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === editingItem.id ? ({ ...t, ...updatedData } as Testimonial) : t))
        );
      } else {
        const newItem: Testimonial = {
          ...(updatedData as Testimonial),
          id: `tm-${Date.now()}`,
        };
        setTestimonials((prev) => [...prev, newItem]);
      }
      setIsModalOpen(false);
      setFeedback('Testimoni berhasil disimpan!');
    } else {
      setFeedback(res.error || 'Gagal menyimpan testimoni.');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Kelola Testimoni Klien
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Daftar ulasan dan kepuasan mitra bisnis yang tampil di bagian testimoni.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Testimoni Baru</span>
        </button>
      </div>

      {feedback && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-xs font-medium text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200">
          {feedback}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 uppercase font-semibold dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Klien & Perusahaan</th>
                <th className="px-6 py-3.5">Rating</th>
                <th className="px-6 py-3.5">Ulasan (Quote)</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {testimonials.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-500">
                    {item.display_order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.avatar_url ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-neutral-200 shrink-0">
                          <Image src={item.avatar_url} alt={item.client_name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                          {item.client_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-neutral-900 dark:text-white block">
                          {item.client_name}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          {item.client_title} {item.company && `• ${item.company}`}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-sm truncate text-neutral-600 dark:text-neutral-400 italic">
                    &ldquo;{item.quote}&rdquo;
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        item.is_active
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                      }`}
                    >
                      {item.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-indigo-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
                      title="Edit Testimoni"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-rose-50 hover:text-rose-600 dark:text-neutral-400 dark:hover:bg-rose-950/40"
                      title="Hapus Testimoni"
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
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {editingItem.id ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
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
                  Nama Klien
                </label>
                <input
                  type="text"
                  name="client_name"
                  required
                  defaultValue={editingItem.client_name}
                  placeholder="Contoh: Ir. Hendra Gunawan"
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Jabatan Klien
                  </label>
                  <input
                    type="text"
                    name="client_title"
                    defaultValue={editingItem.client_title || ''}
                    placeholder="Managing Director"
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Perusahaan Klien
                  </label>
                  <input
                    type="text"
                    name="company"
                    defaultValue={editingItem.company || ''}
                    placeholder="PT Samudera Logistik"
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
              </div>

              <MediaUploader
                label="Foto Avatar Klien"
                value={avatarUrl}
                onChange={(url) => setAvatarUrl(url)}
                helperText="Upload foto profil klien untuk membangun rasa percaya."
              />

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Isi Testimoni / Ulasan
                </label>
                <textarea
                  name="quote"
                  rows={3}
                  required
                  defaultValue={editingItem.quote}
                  placeholder="Tuliskan ulasan klien mengenai kerja sama dan kepuasan hasil proyek..."
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Rating Bintang (1 - 5)
                  </label>
                  <select
                    name="rating"
                    defaultValue={editingItem.rating || 5}
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Bintang</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Bintang</option>
                    <option value={3}>⭐⭐⭐ 3 Bintang</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingItem.display_order || 1}
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="testimonial_is_active"
                  name="is_active"
                  defaultChecked={editingItem.is_active ?? true}
                  className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="testimonial_is_active" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Tampilkan di Beranda Publik
                </label>
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
                  <span>Simpan Testimoni</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
