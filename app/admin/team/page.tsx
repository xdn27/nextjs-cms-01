'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { saveTeamMemberAction, deleteTeamMemberAction } from '@/lib/actions';
import { initialTeam } from '@/lib/mock-data';
import { TeamMember } from '@/lib/types';
import { MediaUploader } from '@/components/admin/MediaUploader';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleOpenCreate() {
    setEditingMember({
      name: '',
      role: '',
      photo_url: '',
      bio: '',
      social_linkedin: '',
      social_twitter: '',
      display_order: team.length + 1,
      is_active: true,
    });
    setPhotoUrl('');
    setIsModalOpen(true);
  }

  function handleOpenEdit(member: TeamMember) {
    setEditingMember(member);
    setPhotoUrl(member.photo_url || '');
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus anggota tim ini?')) return;
    setLoading(true);
    await deleteTeamMemberAction(id);
    setTeam((prev) => prev.filter((t) => t.id !== id));
    setFeedback('Anggota tim berhasil dihapus.');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingMember) return;

    setLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const bio = formData.get('bio') as string;
    const social_linkedin = formData.get('social_linkedin') as string;
    const social_twitter = formData.get('social_twitter') as string;
    const display_order = Number(formData.get('display_order')) || 1;
    const is_active = formData.get('is_active') === 'on';

    const updatedData: Partial<TeamMember> = {
      ...editingMember,
      name,
      role,
      bio,
      photo_url: photoUrl,
      social_linkedin,
      social_twitter,
      display_order,
      is_active,
    };

    const res = await saveTeamMemberAction(updatedData);

    if (res.success) {
      if (editingMember.id) {
        setTeam((prev) =>
          prev.map((t) => (t.id === editingMember.id ? ({ ...t, ...updatedData } as TeamMember) : t))
        );
      } else {
        const newMember: TeamMember = {
          ...(updatedData as TeamMember),
          id: `t-${Date.now()}`,
        };
        setTeam((prev) => [...prev, newMember]);
      }
      setIsModalOpen(false);
      setFeedback('Anggota tim berhasil disimpan!');
    } else {
      setFeedback(res.error || 'Gagal menyimpan anggota tim.');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Kelola Anggota Tim
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Daftar jajaran kepemimpinan dan insinyur yang tampil di halaman Tentang Kami.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Anggota Tim</span>
        </button>
      </div>

      {feedback && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-xs font-medium text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200">
          {feedback}
        </div>
      )}

      {/* Team Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 uppercase font-semibold dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
              <tr>
                <th className="px-6 py-3.5">Urutan</th>
                <th className="px-6 py-3.5">Foto & Nama</th>
                <th className="px-6 py-3.5">Jabatan / Role</th>
                <th className="px-6 py-3.5">Bio Singkat</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {team.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-500">
                    {item.display_order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.photo_url ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700 shrink-0">
                          <Image src={item.photo_url} alt={item.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <span className="font-bold text-neutral-900 dark:text-white">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-indigo-600 dark:text-indigo-400">
                    {item.role}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-neutral-500">
                    {item.bio || '-'}
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
                      title="Edit Anggota"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-1.5 text-neutral-500 hover:bg-rose-50 hover:text-rose-600 dark:text-neutral-400 dark:hover:bg-rose-950/40"
                      title="Hapus Anggota"
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
      {isModalOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {editingMember.id ? 'Edit Anggota Tim' : 'Tambah Anggota Tim'}
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
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editingMember.name}
                  placeholder="Contoh: Budi Santoso, M.Kom"
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Jabatan / Peran
                </label>
                <input
                  type="text"
                  name="role"
                  required
                  defaultValue={editingMember.role}
                  placeholder="Chief Executive Officer"
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
              </div>

              <MediaUploader
                label="Foto Profil Tim"
                value={photoUrl}
                onChange={(url) => setPhotoUrl(url)}
                helperText="Upload foto formal potret berorientasi persegi."
              />

              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                  Bio Singkat
                </label>
                <textarea
                  name="bio"
                  rows={2}
                  defaultValue={editingMember.bio || ''}
                  placeholder="Ringkasan pengalaman profesional..."
                  className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="social_linkedin"
                    defaultValue={editingMember.social_linkedin || ''}
                    placeholder="https://linkedin.com/in/..."
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-neutral-700 dark:text-neutral-300">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingMember.display_order || 1}
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2 text-xs text-neutral-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="team_is_active"
                  name="is_active"
                  defaultChecked={editingMember.is_active ?? true}
                  className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="team_is_active" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Tampilkan di Halaman Tentang Kami
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
                  <span>Simpan Anggota</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
