'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Loader2, Star } from 'lucide-react';
import { saveGalleryItemAction, deleteGalleryItemAction } from '@/lib/actions';
import { GalleryItem } from '@/lib/types';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';

interface GalleryManagerProps {
  initialItems: GalleryItem[];
}

export function GalleryManager({ initialItems }: GalleryManagerProps) {
  // Data berasal dari server; action me-revalidate halaman sehingga props ter-update
  const items = initialItems;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  function handleOpenCreate() {
    setEditingItem({
      title: '',
      caption: '',
      category: '',
      image_url: '',
      is_featured: false,
      display_order: items.length + 1,
      is_active: true,
    });
    setImageUrl('');
    setIsModalOpen(true);
  }

  function handleOpenEdit(item: GalleryItem) {
    setEditingItem(item);
    setImageUrl(item.image_url || '');
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus foto ini dari galeri?')) return;
    setLoading(true);
    const res = await deleteGalleryItemAction(id);
    if (!res.success) {
      toast.error(res.error || 'Gagal menghapus foto.');
    } else {
      toast.success(res.message || 'Foto berhasil dihapus');
    }
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingItem) return;

    if (!imageUrl) {
      toast.error('Foto wajib diunggah.');
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const payload: Partial<GalleryItem> = {
      ...editingItem,
      title: (formData.get('title') as string).trim(),
      caption: (formData.get('caption') as string).trim() || null,
      category: (formData.get('category') as string).trim() || null,
      image_url: imageUrl,
      display_order: Number(formData.get('display_order')) || 1,
      is_featured: formData.get('is_featured') === 'on',
      is_active: formData.get('is_active') === 'on',
    };

    const res = await saveGalleryItemAction(payload);
    if (res.success) {
      toast.success(editingItem.id ? 'Foto berhasil diperbarui' : 'Foto baru berhasil ditambahkan');
      setIsModalOpen(false);
    } else {
      toast.error(res.error || 'Gagal menyimpan foto.');
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kelola Galeri Foto
          </h1>
          <p className="text-xs text-muted-foreground">
            Foto yang ditandai &ldquo;Unggulan&rdquo; tampil di beranda. Bila tidak ada, section galeri di beranda disembunyikan.
          </p>
        </div>

        <Button onClick={handleOpenCreate} size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Tambah Foto</span>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Urutan</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Beranda</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-xs text-muted-foreground">
                  Belum ada foto di galeri. Klik &ldquo;Tambah Foto&rdquo; untuk memulai.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono font-bold text-muted-foreground">
                    {item.display_order}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                        <Image src={item.image_url} alt={item.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <span className="font-bold text-foreground">{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.category || '-'}</TableCell>
                  <TableCell>
                    {item.is_featured ? (
                      <Badge variant="default">
                        <Star className="h-3 w-3" />
                        Unggulan
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.is_active ? 'success' : 'secondary'}>
                      {item.is_active ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(item)} title="Edit Foto">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        disabled={loading}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        title="Hapus Foto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {editingItem && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem.id ? 'Edit Foto' : 'Tambah Foto Baru'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <MediaUploader
                label="Foto"
                value={imageUrl}
                onChange={(url) => setImageUrl(url)}
                helperText="Unggah foto dokumentasi. Rasio 4:3 paling pas."
              />

              <div className="space-y-1.5">
                <Label htmlFor="gallery_title">Judul</Label>
                <Input
                  id="gallery_title"
                  name="title"
                  required
                  defaultValue={editingItem.title}
                  placeholder="Contoh: Rakitan PC Gaming RTX 4070"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gallery_caption">Keterangan (opsional)</Label>
                <Textarea
                  id="gallery_caption"
                  name="caption"
                  rows={2}
                  defaultValue={editingItem.caption || ''}
                  placeholder="Deskripsi singkat yang tampil saat foto dibuka..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="gallery_category">Kategori (opsional)</Label>
                  <Input
                    id="gallery_category"
                    name="category"
                    defaultValue={editingItem.category || ''}
                    placeholder="Rakitan / Servis / Toko"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="gallery_order">Urutan Tampil</Label>
                  <Input
                    id="gallery_order"
                    type="number"
                    name="display_order"
                    defaultValue={editingItem.display_order || 1}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_featured"
                    defaultChecked={editingItem.is_featured ?? false}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                  />
                  Unggulan (tampilkan di beranda)
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    defaultChecked={editingItem.is_active ?? true}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                  />
                  Aktif (tampil di halaman galeri)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
                  <span>Simpan Foto</span>
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
