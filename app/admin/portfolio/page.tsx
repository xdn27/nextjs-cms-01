'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Loader2, Star } from 'lucide-react';
import { saveProjectAction, deleteProjectAction } from '@/lib/actions';
import { initialProjects } from '@/lib/mock-data';
import { Project } from '@/lib/types';
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

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

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
    toast.success('Proyek berhasil dihapus');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingProject) return;

    setLoading(true);

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
        toast.success('Proyek portofolio berhasil diperbarui');
      } else {
        const newProject: Project = {
          ...(updatedData as Project),
          id: `p-${Date.now()}`,
        };
        setProjects((prev) => [...prev, newProject]);
        toast.success('Proyek portofolio berhasil ditambahkan');
      }
      setIsModalOpen(false);
    } else {
      toast.error(res.error || 'Gagal menyimpan proyek.');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kelola Portofolio & Proyek
          </h1>
          <p className="text-xs text-muted-foreground">
            Daftar karya dan studi kasus yang ditampilkan di galeri portofolio.
          </p>
        </div>

        <Button onClick={handleOpenCreate} size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Tambah Proyek Baru</span>
        </Button>
      </div>

      {/* Projects Table */}
      <Card className="overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Urutan</TableHead>
              <TableHead>Foto & Judul Proyek</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Klien</TableHead>
              <TableHead>Unggulan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono font-bold text-muted-foreground">
                  {item.display_order}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {item.cover_image ? (
                      <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-border shrink-0">
                        <Image src={item.cover_image} alt={item.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-12 w-16 rounded-lg bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                        No Pic
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-foreground block">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        /{item.slug}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.client_name || '-'}
                </TableCell>
                <TableCell>
                  {item.is_featured ? (
                    <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-[11px]">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span>Ya</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Tidak</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Proyek"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      title="Hapus Proyek"
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
        {editingProject && (
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>
                {editingProject.id ? 'Edit Proyek' : 'Tambah Proyek Baru'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="title">Judul Proyek</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  required
                  defaultValue={editingProject.title}
                  placeholder="Contoh: Platform Analitik FinTech"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    type="text"
                    name="category"
                    defaultValue={editingProject.category || 'Web Development'}
                    placeholder="Web Development / Mobile App"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="client_name">Nama Klien</Label>
                  <Input
                    id="client_name"
                    type="text"
                    name="client_name"
                    defaultValue={editingProject.client_name || ''}
                    placeholder="Contoh: FinTech Nusantara"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="summary">Ringkasan Singkat (Summary)</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  rows={2}
                  required
                  defaultValue={editingProject.summary}
                  placeholder="Ringkasan 1-2 kalimat untuk preview kartu portofolio..."
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Deskripsi Studi Kasus Lengkap</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={editingProject.description || ''}
                  placeholder="Penjelasan tantangan, arsitektur, dan solusi yang diimplementasikan..."
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
                <div className="space-y-1.5">
                  <Label htmlFor="project_url">URL Demo Proyek (Opsional)</Label>
                  <Input
                    id="project_url"
                    type="url"
                    name="project_url"
                    defaultValue={editingProject.project_url || ''}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="display_order">Urutan Tampil</Label>
                  <Input
                    id="display_order"
                    type="number"
                    name="display_order"
                    defaultValue={editingProject.display_order || 1}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  name="is_featured"
                  defaultChecked={editingProject.is_featured ?? false}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                />
                <label htmlFor="is_featured" className="text-xs font-medium text-foreground cursor-pointer">
                  Tampilkan di Beranda sebagai Proyek Unggulan
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
                  <span>Simpan Proyek</span>
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
