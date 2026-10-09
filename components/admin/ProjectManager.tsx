'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Loader2, Star } from 'lucide-react';
import { saveProjectAction, deleteProjectAction } from '@/lib/actions';
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

interface ProjectManagerProps {
  initialProjects: Project[];
  isFallback: boolean;
}

export default function ProjectManager({ initialProjects, isFallback }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  function handleOpenCreate() {
    setEditingProject({
      title: '',
      slug: '',
      category: 'PC Gaming & Streaming',
      client_name: 'Rp 0',
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
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini dari katalog?')) return;
    setLoading(true);
    const res = await deleteProjectAction(id);
    if (!res.success) {
      toast.error(res.error || 'Gagal menghapus produk.');
      setLoading(false);
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.success(res.message || 'Produk berhasil dihapus dari katalog');
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

    if (!res.success) {
      toast.error(res.error || 'Gagal menyimpan produk.');
      setLoading(false);
      return;
    }

    const savedProject = res.project;
    if (editingProject.id && projects.some((p) => p.id === editingProject.id)) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? savedProject : p))
      );
      toast.success(res.message || 'Produk katalog berhasil diperbarui');
    } else {
      setProjects((prev) => [...prev, savedProject]);
      toast.success(res.message || 'Produk baru berhasil ditambahkan ke katalog');
    }
    setIsModalOpen(false);

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kelola Katalog Produk &amp; Komputer
          </h1>
          <p className="text-xs text-muted-foreground">
            Daftar paket rakitan PC, laptop gaming/office, dan aksesoris yang ditampilkan di katalog website.
          </p>
          {isFallback && (
            <p className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400">
              Menampilkan data contoh karena database katalog belum tersedia.
            </p>
          )}
        </div>

        <Button onClick={handleOpenCreate} size="sm" className="bg-[#3584e4] hover:bg-[#1c71d8] text-white">
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Tambah Produk Baru</span>
        </Button>
      </div>

      {/* Projects / Products Table */}
      <Card className="overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Urutan</TableHead>
              <TableHead>Foto &amp; Nama Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga / Info Garansi</TableHead>
              <TableHead>Best Seller</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-xs text-muted-foreground">
                  Belum ada produk di database katalog.
                </TableCell>
              </TableRow>
            )}
            {projects.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono font-bold text-muted-foreground">
                  {item.display_order}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {item.cover_image ? (
                      <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-border shrink-0 bg-muted">
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
                <TableCell className="font-semibold text-xs text-[#3584e4]">
                  {item.client_name || '-'}
                </TableCell>
                <TableCell>
                  {item.is_featured ? (
                    <span className="inline-flex items-center gap-1 text-amber-500 font-semibold text-[11px]">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span>Ya</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs">Tidak</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Produk"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      title="Hapus Produk"
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
                {editingProject.id ? 'Edit Produk Katalog' : 'Tambah Produk Baru'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="title">Nama Produk / Paket PC</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  required
                  defaultValue={editingProject.title}
                  placeholder="Contoh: PC Gaming Rig Ryzen 7 7800X3D + RTX 4070 Ti"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="category">Kategori Produk</Label>
                  <Input
                    id="category"
                    type="text"
                    name="category"
                    defaultValue={editingProject.category || 'PC Gaming & Streaming'}
                    placeholder="PC Gaming / Laptop / Workstation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="client_name">Harga &amp; Info Garansi</Label>
                  <Input
                    id="client_name"
                    type="text"
                    name="client_name"
                    defaultValue={editingProject.client_name || ''}
                    placeholder="Contoh: Rp 28.500.000 (Garansi 3 Thn)"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="summary">Ringkasan Spesifikasi Utama</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  rows={2}
                  required
                  defaultValue={editingProject.summary}
                  placeholder="Ringkasan 1-2 kalimat untuk preview kartu produk..."
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Rincian Spesifikasi Lengkap</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={editingProject.description || ''}
                  placeholder="Prosesor, GPU, RAM, Storage, Motherboard, Power Supply, Casing..."
                />
              </div>

              {/* Cover Image Upload */}
              <MediaUploader
                label="Foto / Ilustrasi Produk"
                value={coverImageUrl}
                onChange={(url) => setCoverImageUrl(url)}
                helperText="Upload gambar produk atau masukkan URL SVG/PNG."
              />

              <div className="grid grid-cols-2 gap-3 items-center">
                <div className="space-y-1.5">
                  <Label htmlFor="project_url">Link Pemesanan WhatsApp / Toko</Label>
                  <Input
                    id="project_url"
                    type="url"
                    name="project_url"
                    defaultValue={editingProject.project_url || ''}
                    placeholder="https://wa.me/..."
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
                  Tampilkan di Beranda sebagai Produk Pilihan (Best Seller)
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
                <Button type="submit" disabled={loading} className="bg-[#3584e4] hover:bg-[#1c71d8] text-white">
                  {loading && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
                  <span>Simpan Produk</span>
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
