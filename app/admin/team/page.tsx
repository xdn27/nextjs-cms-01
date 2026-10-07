'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { saveTeamMemberAction, deleteTeamMemberAction } from '@/lib/actions';
import { initialTeam } from '@/lib/mock-data';
import { TeamMember } from '@/lib/types';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

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
    toast.success('Anggota tim berhasil dihapus');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingMember) return;

    setLoading(true);

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
        toast.success('Data anggota tim berhasil diperbarui');
      } else {
        const newMember: TeamMember = {
          ...(updatedData as TeamMember),
          id: `t-${Date.now()}`,
        };
        setTeam((prev) => [...prev, newMember]);
        toast.success('Anggota tim baru berhasil ditambahkan');
      }
      setIsModalOpen(false);
    } else {
      toast.error(res.error || 'Gagal menyimpan anggota tim.');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kelola Anggota Tim
          </h1>
          <p className="text-xs text-muted-foreground">
            Daftar jajaran kepemimpinan dan insinyur yang tampil di halaman Tentang Kami.
          </p>
        </div>

        <Button onClick={handleOpenCreate} size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Tambah Anggota Tim</span>
        </Button>
      </div>

      {/* Team Table */}
      <Card className="overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Urutan</TableHead>
              <TableHead>Foto & Nama</TableHead>
              <TableHead>Jabatan / Role</TableHead>
              <TableHead>Bio Singkat</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono font-bold text-muted-foreground">
                  {item.display_order}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {item.photo_url ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border shrink-0">
                        <Image src={item.photo_url} alt={item.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-bold text-foreground">
                      {item.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-primary">
                  {item.role}
                </TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">
                  {item.bio || '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={item.is_active ? 'success' : 'secondary'}>
                    {item.is_active ? 'Aktif' : 'Nonaktif'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Anggota"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      title="Hapus Anggota"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Modal Add/Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {editingMember && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingMember.id ? 'Edit Anggota Tim' : 'Tambah Anggota Tim'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nama Lengkap & Gelar</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  required
                  defaultValue={editingMember.name}
                  placeholder="Contoh: Budi Santoso, M.Kom"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role">Jabatan / Peran</Label>
                <Input
                  id="role"
                  type="text"
                  name="role"
                  required
                  defaultValue={editingMember.role}
                  placeholder="Chief Executive Officer"
                />
              </div>

              <MediaUploader
                label="Foto Profil Tim"
                value={photoUrl}
                onChange={(url) => setPhotoUrl(url)}
                helperText="Upload foto formal potret berorientasi persegi."
              />

              <div className="space-y-1.5">
                <Label htmlFor="bio">Bio Singkat</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={2}
                  defaultValue={editingMember.bio || ''}
                  placeholder="Ringkasan pengalaman profesional..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="social_linkedin">LinkedIn URL</Label>
                  <Input
                    id="social_linkedin"
                    type="url"
                    name="social_linkedin"
                    defaultValue={editingMember.social_linkedin || ''}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="display_order">Urutan Tampil</Label>
                  <Input
                    id="display_order"
                    type="number"
                    name="display_order"
                    defaultValue={editingMember.display_order || 1}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="team_is_active"
                  name="is_active"
                  defaultChecked={editingMember.is_active ?? true}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                />
                <label htmlFor="team_is_active" className="text-xs font-medium text-foreground cursor-pointer">
                  Tampilkan di Halaman Tentang Kami
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
                  <span>Simpan Anggota</span>
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
