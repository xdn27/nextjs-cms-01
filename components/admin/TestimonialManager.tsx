'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Loader2, Star } from 'lucide-react';
import { saveTestimonialAction, deleteTestimonialAction } from '@/lib/actions';
import { Testimonial } from '@/lib/types';
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

interface TestimonialManagerProps {
  initialTestimonials: Testimonial[];
}

export default function TestimonialManager({ initialTestimonials }: TestimonialManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

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
    const res = await deleteTestimonialAction(id);
    if (!res.success) {
      toast.error(res.error || 'Gagal menghapus testimoni.');
      setLoading(false);
      return;
    }
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast.success(res.message || 'Testimoni berhasil dihapus');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingItem) return;

    setLoading(true);

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
      if (editingItem.id && testimonials.some((t) => t.id === editingItem.id)) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === editingItem.id ? ({ ...t, ...updatedData } as Testimonial) : t))
        );
        toast.success('Testimoni berhasil diperbarui');
      } else {
        const newItem: Testimonial = {
          ...(updatedData as Testimonial),
          id: `tm-${Date.now()}`,
        };
        setTestimonials((prev) => [...prev, newItem]);
        toast.success('Testimoni baru berhasil ditambahkan');
      }
      setIsModalOpen(false);
    } else {
      toast.error(res.error || 'Gagal menyimpan testimoni.');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kelola Testimoni Klien
          </h1>
          <p className="text-xs text-muted-foreground">
            Daftar ulasan dan kepuasan mitra bisnis yang tampil di bagian testimoni.
          </p>
        </div>

        <Button onClick={handleOpenCreate} size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Tambah Testimoni Baru</span>
        </Button>
      </div>

      {/* Table */}
      <Card className="overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Urutan</TableHead>
              <TableHead>Klien & Perusahaan</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Ulasan (Quote)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-xs text-muted-foreground">
                  Belum ada testimoni di database. Klik tombol &ldquo;Tambah Testimoni Baru&rdquo; untuk menambahkan.
                </TableCell>
              </TableRow>
            ) : (
              testimonials.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono font-bold text-muted-foreground">
                    {item.display_order}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.avatar_url ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border shrink-0">
                          <Image src={item.avatar_url} alt={item.client_name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {item.client_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-foreground block">
                          {item.client_name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {item.client_title} {item.company && `• ${item.company}`}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-sm truncate text-muted-foreground italic">
                    &ldquo;{item.quote}&rdquo;
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
                        title="Edit Testimoni"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        title="Hapus Testimoni"
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

      {/* Modal Add/Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {editingItem && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingItem.id ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="client_name">Nama Klien</Label>
                <Input
                  id="client_name"
                  type="text"
                  name="client_name"
                  required
                  defaultValue={editingItem.client_name}
                  placeholder="Contoh: Ir. Hendra Gunawan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="client_title">Jabatan Klien</Label>
                  <Input
                    id="client_title"
                    type="text"
                    name="client_title"
                    defaultValue={editingItem.client_title || ''}
                    placeholder="Managing Director"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">Perusahaan Klien</Label>
                  <Input
                    id="company"
                    type="text"
                    name="company"
                    defaultValue={editingItem.company || ''}
                    placeholder="PT Samudera Logistik"
                  />
                </div>
              </div>

              <MediaUploader
                label="Foto Avatar Klien"
                value={avatarUrl}
                onChange={(url) => setAvatarUrl(url)}
                helperText="Upload foto profil klien untuk membangun rasa percaya."
              />

              <div className="space-y-1.5">
                <Label htmlFor="quote">Isi Testimoni / Ulasan</Label>
                <Textarea
                  id="quote"
                  name="quote"
                  rows={3}
                  required
                  defaultValue={editingItem.quote}
                  placeholder="Tuliskan ulasan klien mengenai kerja sama dan kepuasan hasil proyek..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="rating">Rating Bintang (1 - 5)</Label>
                  <select
                    id="rating"
                    name="rating"
                    defaultValue={editingItem.rating || 5}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 cursor-pointer"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Bintang</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Bintang</option>
                    <option value={3}>⭐⭐⭐ 3 Bintang</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="display_order">Urutan Tampil</Label>
                  <Input
                    id="display_order"
                    type="number"
                    name="display_order"
                    defaultValue={editingItem.display_order || 1}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="testimonial_is_active"
                  name="is_active"
                  defaultChecked={editingItem.is_active ?? true}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                />
                <label htmlFor="testimonial_is_active" className="text-xs font-medium text-foreground cursor-pointer">
                  Tampilkan di Beranda Publik
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
                  <span>Simpan Testimoni</span>
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
