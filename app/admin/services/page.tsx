'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { saveServiceAction, deleteServiceAction } from '@/lib/actions';
import { initialServices } from '@/lib/mock-data';
import { Service } from '@/lib/types';
import { DynamicIcon } from '@/components/public/DynamicIcon';
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

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [loading, setLoading] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');

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
    toast.success('Layanan berhasil dihapus');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingService) return;

    setLoading(true);

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
        toast.success('Layanan berhasil diperbarui');
      } else {
        const newService: Service = {
          ...(updatedData as Service),
          id: `s-${Date.now()}`,
        };
        setServices((prev) => [...prev, newService]);
        toast.success('Layanan baru berhasil ditambahkan');
      }
      setIsModalOpen(false);
    } else {
      toast.error(res.error || 'Gagal menyimpan data.');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kelola Layanan
          </h1>
          <p className="text-xs text-muted-foreground">
            Daftar layanan yang ditawarkan di website Company Profile publik.
          </p>
        </div>

        <Button onClick={handleOpenCreate} size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Tambah Layanan Baru</span>
        </Button>
      </div>

      {/* Table Container */}
      <Card className="overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Urutan</TableHead>
              <TableHead>Icon & Judul</TableHead>
              <TableHead>Ringkasan</TableHead>
              <TableHead>Fitur Poin</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono font-bold text-muted-foreground">
                  {item.display_order}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <DynamicIcon name={item.icon} className="h-5 w-5" />
                    </div>
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
                <TableCell className="max-w-xs truncate text-muted-foreground">
                  {item.summary}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {item.features?.length || 0} fitur
                  </Badge>
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
                      title="Edit Layanan"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      title="Hapus Layanan"
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
        {editingService && (
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>
                {editingService.id ? 'Edit Layanan' : 'Tambah Layanan Baru'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="title">Judul Layanan</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  required
                  defaultValue={editingService.title}
                  placeholder="Contoh: Pengembangan Web & SaaS"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="slug">Slug URL</Label>
                  <Input
                    id="slug"
                    type="text"
                    name="slug"
                    defaultValue={editingService.slug}
                    placeholder="custom-web-development"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="icon">Nama Icon Lucide</Label>
                  <Input
                    id="icon"
                    type="text"
                    name="icon"
                    defaultValue={editingService.icon || 'Globe'}
                    placeholder="Globe / Cloud / Smartphone"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="summary">Ringkasan Singkat (Muncul di Kartu)</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  rows={2}
                  required
                  defaultValue={editingService.summary}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu layanan..."
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Deskripsi Lengkap</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={editingService.description || ''}
                  placeholder="Penjelasan detail teknis dan ruang lingkup layanan..."
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="features">Poin Fitur Utama (Pisahkan dengan baris baru / Enter)</Label>
                <Textarea
                  id="features"
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Next.js App Router&#10;Arsitektur Serverless&#10;Keamanan RLS"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div className="space-y-1.5">
                  <Label htmlFor="display_order">Urutan Tampil</Label>
                  <Input
                    id="display_order"
                    type="number"
                    name="display_order"
                    defaultValue={editingService.display_order || 1}
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    defaultChecked={editingService.is_active ?? true}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                  />
                  <label htmlFor="is_active" className="text-xs font-medium text-foreground cursor-pointer">
                    Aktif & Ditampilkan
                  </label>
                </div>
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
                  <span>Simpan Layanan</span>
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
