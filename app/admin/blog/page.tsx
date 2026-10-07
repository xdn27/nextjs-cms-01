'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { savePostAction, deletePostAction } from '@/lib/actions';
import { initialPosts } from '@/lib/mock-data';
import { Post } from '@/lib/types';
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

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [contentInput, setContentInput] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  function handleOpenCreate() {
    setEditingPost({
      title: '',
      slug: '',
      category: 'Teknologi',
      author_name: 'Tim Redaksi',
      excerpt: '',
      content: '',
      cover_image: '',
      status: 'published',
      tags: [],
    });
    setCoverImageUrl('');
    setContentInput('<p>Tuliskan paragraf pertama artikel Anda di sini...</p>');
    setTagsInput('Teknologi, Cloud, Next.js');
    setIsModalOpen(true);
  }

  function handleOpenEdit(post: Post) {
    setEditingPost(post);
    setCoverImageUrl(post.cover_image || '');
    setContentInput(post.content || '');
    setTagsInput(post.tags ? post.tags.join(', ') : '');
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    setLoading(true);
    await deletePostAction(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast.success('Artikel berhasil dihapus');
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingPost) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = (formData.get('slug') as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = formData.get('category') as string;
    const author_name = formData.get('author_name') as string;
    const excerpt = formData.get('excerpt') as string;
    const status = formData.get('status') as 'draft' | 'published';

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedData: Partial<Post> = {
      ...editingPost,
      title,
      slug,
      category,
      author_name,
      excerpt,
      content: contentInput,
      cover_image: coverImageUrl,
      tags,
      status,
    };

    const res = await savePostAction(updatedData);

    if (res.success) {
      if (editingPost.id) {
        setPosts((prev) =>
          prev.map((p) => (p.id === editingPost.id ? ({ ...p, ...updatedData } as Post) : p))
        );
        toast.success('Artikel berhasil diperbarui');
      } else {
        const newPost: Post = {
          ...(updatedData as Post),
          id: `b-${Date.now()}`,
          published_at: new Date().toISOString(),
        };
        setPosts((prev) => [newPost, ...prev]);
        toast.success('Artikel baru berhasil diterbitkan');
      }
      setIsModalOpen(false);
    } else {
      toast.error(res.error || 'Gagal menyimpan artikel.');
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kelola Blog & Artikel
          </h1>
          <p className="text-xs text-muted-foreground">
            Publikasikan wawasan teknologi, tutorial, dan siaran pers perusahaan.
          </p>
        </div>

        <Button onClick={handleOpenCreate} size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Tulis Artikel Baru</span>
        </Button>
      </div>

      {/* Posts Table */}
      <Card className="overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto & Judul Artikel</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((item) => (
              <TableRow key={item.id}>
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
                      <span className="font-bold text-foreground block line-clamp-1">
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
                  {item.author_name}
                </TableCell>
                <TableCell>
                  <Badge variant={item.status === 'published' ? 'success' : 'secondary'}>
                    {item.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-[11px]">
                  {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID') : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Artikel"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      title="Hapus Artikel"
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
        {editingPost && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingPost.id ? 'Edit Artikel Blog' : 'Tulis Artikel Baru'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="title">Judul Artikel</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  required
                  defaultValue={editingPost.title}
                  placeholder="Contoh: Mengapa Arsitektur Serverless Menjadi Pilihan Utama"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    type="text"
                    name="category"
                    defaultValue={editingPost.category || 'Teknologi'}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="author_name">Nama Penulis</Label>
                  <Input
                    id="author_name"
                    type="text"
                    name="author_name"
                    defaultValue={editingPost.author_name || 'Tim Redaksi'}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="status">Status Publikasi</Label>
                  <select
                    id="status"
                    name="status"
                    defaultValue={editingPost.status || 'published'}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 cursor-pointer"
                  >
                    <option value="published">Published (Tayang)</option>
                    <option value="draft">Draft (Konsep)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="excerpt">Ringkasan Artikel (Excerpt)</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  rows={2}
                  defaultValue={editingPost.excerpt || ''}
                  placeholder="Ringkasan singkat untuk kartu preview dan meta deskripsi SEO..."
                />
              </div>

              {/* Cover Image */}
              <MediaUploader
                label="Foto Sampul Artikel (Cover Image)"
                value={coverImageUrl}
                onChange={(url) => setCoverImageUrl(url)}
                helperText="Upload gambar berkualitas tinggi untuk header artikel."
              />

              {/* Content Editor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Isi Konten Artikel (HTML / Teks Kaya)</Label>
                  <span className="text-[11px] text-muted-foreground">
                    Mendukung tag HTML &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;blockquote&gt;
                  </span>
                </div>
                <Textarea
                  id="content"
                  rows={8}
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tags">Tag / Label (Pisahkan dengan koma)</Label>
                <Input
                  id="tags"
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Next.js, Serverless, Supabase, Cloud"
                />
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
                  <span>Simpan Artikel</span>
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
