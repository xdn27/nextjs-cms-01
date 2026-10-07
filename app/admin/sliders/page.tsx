'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import {
  saveHeroSlideAction,
  deleteHeroSlideAction,
  toggleHeroSlideStatusAction,
} from '@/lib/actions';
import { initialHeroSlides } from '@/lib/mock-data';
import { HeroSlide, HeroSlideHighlight } from '@/lib/types';
import { DynamicIcon } from '@/components/public/DynamicIcon';
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
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';

const POPULAR_ICONS = [
  'Cpu',
  'Wrench',
  'ShoppingBag',
  'Zap',
  'ShieldCheck',
  'Sparkles',
  'Laptop',
  'PackageCheck',
  'Monitor',
  'Layers',
];

export default function AdminSlidersPage() {
  const [slides, setSlides] = useState<HeroSlide[]>(initialHeroSlides);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states for highlights
  const [hl1, setHl1] = useState({ text: '', icon: 'Zap', iconColor: 'text-amber-500' });
  const [hl2, setHl2] = useState({ text: '', icon: 'ShieldCheck', iconColor: 'text-emerald-500' });
  const [hl3, setHl3] = useState({ text: '', icon: 'Cpu', iconColor: 'text-blue-500' });

  function handleOpenCreate() {
    setIsEditMode(false);
    setEditingSlide({
      title: '',
      subtitle: '',
      badge_text: 'Spesialis Hardware & PC',
      badge_icon: 'Cpu',
      badge_color: 'border-[#3584e4]/30 bg-[#3584e4]/10 text-[#3584e4]',
      image_url: '/images/hero/slide-1-gaming-pc.svg',
      primary_cta_text: 'Lihat Katalog Produk',
      primary_cta_link: '/katalog',
      secondary_cta_text: 'Hubungi Kontak Toko',
      secondary_cta_link: '/contact',
      display_order: slides.length + 1,
      is_active: true,
    });
    setHl1({ text: 'Komponen 100% Original', icon: 'ShieldCheck', iconColor: 'text-emerald-500' });
    setHl2({ text: 'Perakitan Bebas Bottleneck', icon: 'Zap', iconColor: 'text-amber-500' });
    setHl3({ text: 'Garansi Distributor Resmi', icon: 'Cpu', iconColor: 'text-blue-500' });
    setIsModalOpen(true);
  }

  function handleOpenEdit(slide: HeroSlide) {
    setIsEditMode(true);
    setEditingSlide(slide);

    const highlights = (slide.highlights || []) as (HeroSlideHighlight | string)[];
    const parseHl = (item: HeroSlideHighlight | string | undefined, defaultIcon: string, defaultColor: string) => {
      if (!item) return { text: '', icon: defaultIcon, iconColor: defaultColor };
      if (typeof item === 'string') return { text: item, icon: defaultIcon, iconColor: defaultColor };
      return {
        text: item.text || '',
        icon: item.icon || defaultIcon,
        iconColor: item.iconColor || defaultColor,
      };
    };

    setHl1(parseHl(highlights[0], 'Zap', 'text-amber-500'));
    setHl2(parseHl(highlights[1], 'ShieldCheck', 'text-emerald-500'));
    setHl3(parseHl(highlights[2], 'Cpu', 'text-blue-500'));

    setIsModalOpen(true);
  }

  async function handleToggleStatus(slide: HeroSlide) {
    const newStatus = !slide.is_active;
    setSlides((prev) =>
      prev.map((s) => (s.id === slide.id ? { ...s, is_active: newStatus } : s))
    );

    const res = await toggleHeroSlideStatusAction(slide.id, newStatus);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.error || 'Gagal mengubah status slide');
      // Revert on failure
      setSlides((prev) =>
        prev.map((s) => (s.id === slide.id ? { ...s, is_active: slide.is_active } : s))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus slide ini dari Hero Banner?')) return;
    setLoading(true);
    await deleteHeroSlideAction(id);
    setSlides((prev) => prev.filter((s) => s.id !== id));
    toast.success('Slide hero berhasil dihapus');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingSlide) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const badge_text = formData.get('badge_text') as string;
    const badge_icon = (formData.get('badge_icon') as string) || 'Cpu';
    const badge_color = (formData.get('badge_color') as string) || 'border-[#3584e4]/30 bg-[#3584e4]/10 text-[#3584e4]';
    const image_url = (editingSlide.image_url || (formData.get('image_url') as string) || '').trim();
    const primary_cta_text = formData.get('primary_cta_text') as string;
    const primary_cta_link = formData.get('primary_cta_link') as string;
    const secondary_cta_text = formData.get('secondary_cta_text') as string;
    const secondary_cta_link = formData.get('secondary_cta_link') as string;
    const display_order = Number(formData.get('display_order')) || 1;
    const is_active = formData.get('is_active') === 'on';

    if (!title || !subtitle || !image_url) {
      toast.error('Judul, subjudul, dan gambar latar wajib diisi.');
      setLoading(false);
      return;
    }

    const highlights: HeroSlideHighlight[] = [
      hl1.text ? hl1 : null,
      hl2.text ? hl2 : null,
      hl3.text ? hl3 : null,
    ].filter(Boolean) as HeroSlideHighlight[];

    const updatedSlide: HeroSlide = {
      id: editingSlide.id || `slide-${Date.now()}`,
      title,
      subtitle,
      badge_text,
      badge_icon,
      badge_color,
      image_url,
      primary_cta_text,
      primary_cta_link,
      secondary_cta_text,
      secondary_cta_link,
      highlights,
      display_order,
      is_active,
    };

    const res = await saveHeroSlideAction(updatedSlide);

    if (res.success) {
      setSlides((prev) => {
        const exists = prev.some((s) => s.id === updatedSlide.id);
        if (exists) {
          return prev
            .map((s) => (s.id === updatedSlide.id ? updatedSlide : s))
            .sort((a, b) => a.display_order - b.display_order);
        }
        return [...prev, updatedSlide].sort((a, b) => a.display_order - b.display_order);
      });
      toast.success(res.message);
      setIsModalOpen(false);
    } else {
      toast.error(res.error || 'Gagal menyimpan slide');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* Header View */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="h-6 w-6 text-[#3584e4]" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Kelola Slider Hero Banner
            </h1>
          </div>
          <p className="mt-1 text-xs text-[#9a9996]">
            Atur gambar background slider, judul promosi, tombol CTA, dan keunggulan untuk banner halaman utama.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-white/10 bg-[#303030] text-xs font-medium text-[#c0bfbc] hover:bg-[#3a3a3a] hover:text-white"
          >
            <a href="/" target="_blank" rel="noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              <span>Preview Live</span>
            </a>
          </Button>

          <Button
            onClick={handleOpenCreate}
            size="sm"
            className="bg-[#3584e4] hover:bg-[#1c71d8] text-white text-xs font-semibold cursor-pointer shadow-sm transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            <span>Tambah Slide Baru</span>
          </Button>
        </div>
      </div>

      {/* Info Tip Libadwaita Card */}
      <Card className="border-[#383838] bg-[#242424] p-4 text-xs text-[#c0bfbc]">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-[#3584e4]/15 p-2 text-[#3584e4] shrink-0">
            <Sliders className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-white">
              Arsitektur Anti-Jumping Aktif
            </p>
            <p className="text-[#9a9996] leading-relaxed">
              Slider pada beranda web menggunakan sistem <span className="text-[#78aeed]">CSS Grid Stacking</span>. Anda bebas membuat judul atau subjudul dengan panjang berbeda — tinggi layout otomatis terkunci pada slide tertinggi sehingga tampilan beranda tidak akan melompat saat transisi.
            </p>
          </div>
        </div>
      </Card>

      {/* Slide Table Card */}
      <Card className="border-[#383838] bg-[#242424] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#1e1e1e]/60 border-b border-[#383838]">
              <TableRow className="border-[#383838] hover:bg-transparent">
                <TableHead className="w-16 text-center text-xs font-bold text-[#9a9996]">Urutan</TableHead>
                <TableHead className="w-44 text-xs font-bold text-[#9a9996]">Preview Gambar</TableHead>
                <TableHead className="text-xs font-bold text-[#9a9996]">Badge & Judul Slide</TableHead>
                <TableHead className="text-xs font-bold text-[#9a9996]">Tombol Aksi (CTA)</TableHead>
                <TableHead className="w-24 text-center text-xs font-bold text-[#9a9996]">Status</TableHead>
                <TableHead className="w-28 text-right text-xs font-bold text-[#9a9996]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slides.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-xs text-[#9a9996]">
                    Belum ada slide hero. Klik tombol &ldquo;Tambah Slide Baru&rdquo; untuk membuat slide pertama.
                  </TableCell>
                </TableRow>
              ) : (
                slides.map((slide) => (
                  <TableRow
                    key={slide.id}
                    className="border-b border-[#383838] hover:bg-white/[0.02] transition-colors"
                  >
                    <TableCell className="text-center font-mono text-xs font-bold text-white">
                      #{slide.display_order}
                    </TableCell>

                    <TableCell>
                      <div className="relative h-16 w-32 overflow-hidden rounded-lg border border-[#383838] bg-[#090d16] shadow-sm">
                        <Image
                          src={slide.image_url}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="max-w-md">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant="secondary"
                            className="text-[10px] py-0 px-2 border border-white/10 bg-[#303030] text-[#78aeed]"
                          >
                            <DynamicIcon name={slide.badge_icon} className="h-3 w-3 mr-1" />
                            <span>{slide.badge_text}</span>
                          </Badge>
                        </div>
                        <h4 className="font-bold text-xs text-white line-clamp-1">
                          {slide.title}
                        </h4>
                        <p className="text-[11px] text-[#9a9996] line-clamp-2 leading-relaxed">
                          {slide.subtitle}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs text-[#c0bfbc]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[11px]">
                          <span className="font-semibold text-white">Utama:</span>
                          <span className="text-[#3584e4]">{slide.primary_cta_text}</span>
                          <span className="text-[10px] text-[#77767b]">({slide.primary_cta_link})</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px]">
                          <span className="font-semibold text-[#9a9996]">Sekunder:</span>
                          <span className="text-neutral-300">{slide.secondary_cta_text}</span>
                          <span className="text-[10px] text-[#77767b]">({slide.secondary_cta_link})</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(slide)}
                        title={slide.is_active ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'}
                        className="cursor-pointer inline-flex items-center gap-1"
                      >
                        {slide.is_active ? (
                          <Badge className="bg-[#2ec27e]/20 text-[#2ec27e] border border-[#2ec27e]/30 text-[10px] hover:bg-[#2ec27e]/30 cursor-pointer">
                            <Eye className="h-2.5 w-2.5 mr-1" />
                            Aktif
                          </Badge>
                        ) : (
                          <Badge className="bg-[#9a9996]/20 text-[#9a9996] border border-[#9a9996]/30 text-[10px] hover:bg-[#9a9996]/30 cursor-pointer">
                            <EyeOff className="h-2.5 w-2.5 mr-1" />
                            Non-aktif
                          </Badge>
                        )}
                      </button>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(slide)}
                          className="h-7 w-7 text-[#c0bfbc] hover:bg-white/10 hover:text-white cursor-pointer"
                          title="Edit Slide"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(slide.id)}
                          className="h-7 w-7 text-[#ff7b63] hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                          title="Hapus Slide"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Modal Dialog Form Tambah / Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="dark adwaita-dark max-w-2xl max-h-[90vh] overflow-y-auto bg-[#242424] border-[#383838] text-white">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="h-4 w-4 text-[#3584e4]" />
              <span>{isEditMode ? 'Edit Slide Hero' : 'Tambah Slide Hero Baru'}</span>
            </DialogTitle>
          </DialogHeader>

          {editingSlide && (
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              {/* Media Uploader untuk Gambar Latar */}
              <div className="space-y-2 border-b border-[#383838] pb-4">
                <MediaUploader
                  label="Gambar Latar Belakang Slide (1920 x 1080 disarankan)"
                  value={editingSlide.image_url}
                  onChange={(url) => setEditingSlide((prev) => ({ ...prev, image_url: url }))}
                  helperText="Gunakan tombol upload atau ketik URL/path gambar di atas (misal /images/hero/slide-1-gaming-pc.svg)."
                />
                <input type="hidden" name="image_url" value={editingSlide.image_url || ''} />
              </div>

              {/* Badge Teks & Icon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Teks Badge Atas</Label>
                  <Input
                    name="badge_text"
                    defaultValue={editingSlide.badge_text || ''}
                    placeholder="Contoh: Spesialis Rakit PC Gaming"
                    required
                    className="bg-[#1e1e1e] border-[#383838] text-xs h-9"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Icon Badge</Label>
                  <div className="flex items-center gap-2">
                    <select
                      name="badge_icon"
                      defaultValue={editingSlide.badge_icon || 'Cpu'}
                      className="w-full h-9 rounded-md border border-[#383838] bg-[#1e1e1e] px-3 text-xs text-white"
                    >
                      {POPULAR_ICONS.map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Judul Hero */}
              <div className="space-y-1">
                <Label className="text-xs">Judul Hero (Headline Banner)</Label>
                <Input
                  name="title"
                  defaultValue={editingSlide.title || ''}
                  placeholder="Contoh: Rakit PC Gaming & Workstation Bebas Bottleneck"
                  required
                  className="bg-[#1e1e1e] border-[#383838] text-xs h-9 font-semibold"
                />
              </div>

              {/* Subjudul / Deskripsi */}
              <div className="space-y-1">
                <Label className="text-xs">Subjudul (Deskripsi Penjelas)</Label>
                <Textarea
                  name="subtitle"
                  defaultValue={editingSlide.subtitle || ''}
                  placeholder="Tuliskan ringkasan penawaran atau solusi toko komputer Anda..."
                  rows={3}
                  required
                  className="bg-[#1e1e1e] border-[#383838] text-xs leading-relaxed resize-none"
                />
              </div>

              {/* Tombol Aksi Utama & Sekunder */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[#383838] pt-3">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-[#3584e4]">Tombol Aksi Utama (CTA 1)</Label>
                  <Input
                    name="primary_cta_text"
                    defaultValue={editingSlide.primary_cta_text || 'Lihat Katalog Produk'}
                    placeholder="Teks Tombol (cth: Lihat Katalog Produk)"
                    required
                    className="bg-[#1e1e1e] border-[#383838] text-xs h-8"
                  />
                  <Input
                    name="primary_cta_link"
                    defaultValue={editingSlide.primary_cta_link || '/katalog'}
                    placeholder="URL Tujuan (cth: /katalog)"
                    required
                    className="bg-[#1e1e1e] border-[#383838] text-xs h-8"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-neutral-300">Tombol Aksi Sekunder (CTA 2)</Label>
                  <Input
                    name="secondary_cta_text"
                    defaultValue={editingSlide.secondary_cta_text || 'Hubungi Kontak Toko'}
                    placeholder="Teks Tombol (cth: Hubungi Kontak Toko)"
                    required
                    className="bg-[#1e1e1e] border-[#383838] text-xs h-8"
                  />
                  <Input
                    name="secondary_cta_link"
                    defaultValue={editingSlide.secondary_cta_link || '/contact'}
                    placeholder="URL Tujuan (cth: /contact)"
                    required
                    className="bg-[#1e1e1e] border-[#383838] text-xs h-8"
                  />
                </div>
              </div>

              {/* 3 Keunggulan / Highlights */}
              <div className="space-y-2 border-t border-[#383838] pt-3">
                <Label className="text-xs font-bold text-white">3 Keunggulan / Poin Fitur Bawah</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[#9a9996]">Poin 1</Label>
                    <Input
                      value={hl1.text}
                      onChange={(e) => setHl1((prev) => ({ ...prev, text: e.target.value }))}
                      placeholder="Poin keunggulan 1"
                      className="bg-[#1e1e1e] border-[#383838] text-[11px] h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[#9a9996]">Poin 2</Label>
                    <Input
                      value={hl2.text}
                      onChange={(e) => setHl2((prev) => ({ ...prev, text: e.target.value }))}
                      placeholder="Poin keunggulan 2"
                      className="bg-[#1e1e1e] border-[#383838] text-[11px] h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-[#9a9996]">Poin 3</Label>
                    <Input
                      value={hl3.text}
                      onChange={(e) => setHl3((prev) => ({ ...prev, text: e.target.value }))}
                      placeholder="Poin keunggulan 3"
                      className="bg-[#1e1e1e] border-[#383838] text-[11px] h-8"
                    />
                  </div>
                </div>
              </div>

              {/* Pengaturan Urutan & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#383838] pt-3 items-center">
                <div className="space-y-1">
                  <Label className="text-xs">Nomor Urutan Tampil (Display Order)</Label>
                  <Input
                    type="number"
                    name="display_order"
                    defaultValue={editingSlide.display_order ?? 1}
                    min={1}
                    className="bg-[#1e1e1e] border-[#383838] text-xs h-8 w-24"
                  />
                </div>

                <div className="flex items-center gap-2 pt-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    defaultChecked={editingSlide.is_active ?? true}
                    className="h-4 w-4 rounded border-[#383838] bg-[#1e1e1e] text-[#3584e4] focus:ring-[#3584e4]"
                  />
                  <Label htmlFor="is_active" className="text-xs cursor-pointer font-medium text-white">
                    Aktifkan Slide di Halaman Depan
                  </Label>
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-[#383838]">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                  className="text-xs text-[#c0bfbc] hover:bg-white/10 hover:text-white"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#3584e4] hover:bg-[#1c71d8] text-white text-xs font-semibold cursor-pointer shadow-sm"
                >
                  {loading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                  <span>Simpan Slide</span>
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
