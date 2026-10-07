'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { saveServiceAction, deleteServiceAction } from '@/lib/actions';
import { initialServices } from '@/lib/mock-data';
import { Service } from '@/lib/types';
import { DynamicIcon } from '@/components/public/DynamicIcon';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [loading, setLoading] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleOpenCreate() {
    setEditingService({
      title: '',
      slug: '',
      summary: '',
      description: '',
      icon: 'Briefcase',
      display_order: services.length + 1,
      is_active: true,
      features: [],
    });
    setFeaturesInput('');
    setIsModalOpen(true);
  }

  function handleOpenEdit(service: Service) {
    setEditingService(service);
    setFeaturesInput(service.features ? service.features.join('\n') : '');
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus layanan ini?')) return;
    setLoading(true);
    await deleteServiceAction(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    setFeedback('Layanan berhasil dihapus.');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingService) return;

    setLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = (formData.get('slug') as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const summary = formData.get('summary') as string;
    const description = formData.get('description') as string;
    const icon = formData.get('icon') as string;
    const display_order = Number(formData.get('display_order')) || 1;
    const is_active = formData.get('is_active') === 'on';

    const features = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const updatedData: Partial<Service> = {
      ...editingService,
      title,
      slug,
      summary,
      description,
      icon,
      features,
      display_order,
      is_active,
    };

    const res = await saveServiceAction(updatedData);

    if (res.success) {
      if (editingService.id) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? ({ ...s, ...updatedData } as Service) : s))
        );
      } else {
        const newService: Service = {
          ...(updatedData as Service),
          id: `s-${Date.now()}`,
        };
        setServices((prev) => [...prev, newService]);
      }
      setIsModalOpen(false);
      setFeedback('Layanan berhasil disimpan!');
    } else {
      setFeedback(res.error || 'Gagal menyimpan data.');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Kelola Layanan
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Daftar layanan yang ditawarkan di website Company Profile publik.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Layanan Baru</span>
        </button>
      </div>

      {feedback && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-xs font-medium text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200">
          {feedback}
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 uppercase font-semibold dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Icon & Judul</th>
                <th className="px-6 py-3.5">Ringkasan</th>
                <th className="px-6 py-3.5">Fitur Poin</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {services.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-500">
                    {item.display_order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-neutral-800 dark:text-indigo-400">
                        <DynamicIcon name={item.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-bold text-neutral-900 dark:text-white block">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          /{item.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-neutral-600 dark:text-neutral-400">
                    {item.summary}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                      {item.features?.length || 0} fitur
                    </span>
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
                      title="Edit Layanan"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-rose-50 hover:text-rose-600 dark:text-neutral-400 dark:hover:bg-rose-950/40"
                      title="Hapus Layanan"
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
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {editingService.id ? 'Edit Layanan' : 'Tambah Layanan Baru'}
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
                  Judul Layanan
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingService.title}
                  placeholder="Contoh: Pengembangan Web & SaaS"
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingService.slug}
                    placeholder="custom-web-development"
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Nama Icon Lucide
                  </label>
                  <input
                    type="text"
                    name="icon"
                    defaultValue={editingService.icon || 'Globe'}
                    placeholder="Globe / Cloud / Smartphone"
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Ringkasan Singkat (Muncul di Kartu)
                </label>
                <textarea
                  name="summary"
                  rows={2}
                  required
                  defaultValue={editingService.summary}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu layanan..."
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Deskripsi Lengkap
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingService.description || ''}
                  placeholder="Penjelasan detail teknis dan ruang lingkup layanan..."
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Poin Fitur Utama (Pisahkan dengan baris baru / Enter)
                </label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Next.js App Router&#10;Arsitektur Serverless&#10;Keamanan RLS"
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingService.display_order || 1}
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    defaultChecked={editingService.is_active ?? true}
                    className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="is_active" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Aktif & Ditampilkan
                  </label>
                </div>
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
                  <span>Simpan Layanan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
