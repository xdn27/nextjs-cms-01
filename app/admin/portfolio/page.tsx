'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Loader2, Star } from 'lucide-react';
import { saveProjectAction, deleteProjectAction } from '@/lib/actions';
import { initialProjects } from '@/lib/mock-data';
import { Project } from '@/lib/types';
import { MediaUploader } from '@/components/admin/MediaUploader';

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleOpenCreate() {
    setEditingProject({
      title: '',
      slug: '',
      category: 'Web Development',
      client_name: '',
      summary: '',
      description: '',
      cover_image: '',
      project_url: '',
      is_featured: false,
      display_order: projects.length + 1,
    });
    setCoverImageUrl('');
    setIsModalOpen(true);
  }

  function handleOpenEdit(project: Project) {
    setEditingProject(project);
    setCoverImageUrl(project.cover_image || '');
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus proyek ini dari portofolio?')) return;
    setLoading(true);
    await deleteProjectAction(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setFeedback('Proyek berhasil dihapus.');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingProject) return;

    setLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = (formData.get('slug') as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = formData.get('category') as string;
    const client_name = formData.get('client_name') as string;
    const summary = formData.get('summary') as string;
    const description = formData.get('description') as string;
    const project_url = formData.get('project_url') as string;
    const is_featured = formData.get('is_featured') === 'on';
    const display_order = Number(formData.get('display_order')) || 1;

    const updatedData: Partial<Project> = {
      ...editingProject,
      title,
      slug,
      category,
      client_name,
      summary,
      description,
      cover_image: coverImageUrl,
      project_url,
      is_featured,
      display_order,
    };

    const res = await saveProjectAction(updatedData);

    if (res.success) {
      if (editingProject.id) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? ({ ...p, ...updatedData } as Project) : p))
        );
      } else {
        const newProject: Project = {
          ...(updatedData as Project),
          id: `p-${Date.now()}`,
        };
        setProjects((prev) => [...prev, newProject]);
      }
      setIsModalOpen(false);
      setFeedback('Proyek portofolio berhasil disimpan!');
    } else {
      setFeedback(res.error || 'Gagal menyimpan proyek.');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Kelola Portofolio & Proyek
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Daftar karya dan studi kasus yang ditampilkan di galeri portofolio.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {feedback && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-xs font-medium text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200">
          {feedback}
        </div>
      )}

      {/* Projects Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 uppercase font-semibold dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Foto & Judul Proyek</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Klien</th>
                <th className="px-6 py-3.5">Unggulan</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {projects.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-500">
                    {item.display_order}
                  </td>
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
                        <span className="font-bold text-neutral-900 dark:text-white block">
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
                    {item.client_name || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {item.is_featured ? (
                      <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-[11px]">
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        <span>Ya</span>
                      </span>
                    ) : (
                      <span className="text-neutral-400">Tidak</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-indigo-600 dark:text-neutral-400 dark:hover:bg-neutral-800"
                      title="Edit Proyek"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-rose-50 hover:text-rose-600 dark:text-neutral-400 dark:hover:bg-rose-950/40"
                      title="Hapus Proyek"
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
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {editingProject.id ? 'Edit Proyek' : 'Tambah Proyek Baru'}
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
                  Judul Proyek
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingProject.title}
                  placeholder="Contoh: Platform Analitik FinTech"
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Kategori
                  </label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingProject.category || 'Web Development'}
                    placeholder="Web Development / Mobile App"
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Nama Klien
                  </label>
                  <input
                    type="text"
                    name="client_name"
                    defaultValue={editingProject.client_name || ''}
                    placeholder="Contoh: FinTech Nusantara"
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Ringkasan Singkat (Summary)
                </label>
                <textarea
                  name="summary"
                  rows={2}
                  required
                  defaultValue={editingProject.summary}
                  placeholder="Ringkasan 1-2 kalimat untuk preview kartu portofolio..."
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Deskripsi Studi Kasus Lengkap
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingProject.description || ''}
                  placeholder="Penjelasan tantangan, arsitektur, dan solusi yang diimplementasikan..."
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                />
              </div>

              {/* Cover Image Upload */}
              <MediaUploader
                label="Foto Sampul Proyek"
                value={coverImageUrl}
                onChange={(url) => setCoverImageUrl(url)}
                helperText="Upload gambar beresolusi minimal 1200x800px untuk hasil tajam."
              />

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    URL Demo Proyek (Opsional)
                  </label>
                  <input
                    type="url"
                    name="project_url"
                    defaultValue={editingProject.project_url || ''}
                    placeholder="https://..."
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingProject.display_order || 1}
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:bg-neutral-800 dark:focus:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  name="is_featured"
                  defaultChecked={editingProject.is_featured ?? false}
                  className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="is_featured" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Tampilkan di Beranda sebagai Proyek Unggulan
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
                  <span>Simpan Proyek</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
