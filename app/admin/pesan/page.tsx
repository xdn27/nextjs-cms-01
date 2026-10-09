'use client';

import React, { useState } from 'react';
import { Mail, Phone, Reply, Check } from 'lucide-react';
import { updateInquiryStatusAction } from '@/lib/actions';
import { initialInquiries } from '@/lib/mock-data';
import { Inquiry } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const filteredInquiries = inquiries.filter((inq) => {
    if (filter === 'unread') return inq.status === 'unread';
    if (filter === 'read') return inq.status !== 'unread';
    return true;
  });

  async function handleToggleStatus(inquiry: Inquiry) {
    const newStatus = inquiry.status === 'unread' ? 'read' : 'unread';
    await updateInquiryStatusAction(inquiry.id, newStatus);
    setInquiries((prev) =>
      prev.map((i) => (i.id === inquiry.id ? { ...i, status: newStatus } : i))
    );
    if (selectedInquiry?.id === inquiry.id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    toast.success(newStatus === 'read' ? 'Pesan ditandai sudah dibaca' : 'Pesan ditandai belum dibaca');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Kotak Masuk Pesan & Leads
          </h1>
          <p className="text-xs text-muted-foreground">
            Daftar pesan masuk dan formulir kontak calon klien dari website publik.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card p-1 text-xs">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Semua ({inquiries.length})
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Belum Dibaca ({inquiries.filter((i) => i.status === 'unread').length})
          </Button>
          <Button
            variant={filter === 'read' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('read')}
          >
            Sudah Dibaca ({inquiries.filter((i) => i.status !== 'unread').length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Messages List Column */}
        <div className="lg:col-span-1 space-y-3">
          {filteredInquiries.length === 0 ? (
            <Card className="border-dashed p-8 text-center text-xs text-muted-foreground">
              Tidak ada pesan pada kategori ini.
            </Card>
          ) : (
            filteredInquiries.map((item) => (
              <Card
                key={item.id}
                onClick={() => setSelectedInquiry(item)}
                className={`cursor-pointer transition-all text-xs ${
                  selectedInquiry?.id === item.id
                    ? 'border-primary ring-1 ring-primary bg-primary/5'
                    : 'hover:border-border hover:bg-muted/30'
                }`}
              >
                <CardContent className="p-4.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">
                        {item.name}
                      </span>
                      {item.status === 'unread' && (
                        <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : 'Baru'}
                    </span>
                  </div>

                  <p className="mt-1 font-semibold text-foreground truncate">
                    {item.subject}
                  </p>

                  <p className="mt-1 text-muted-foreground line-clamp-2">
                    {item.message}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Message Detail View Column */}
        <div className="lg:col-span-2">
          {selectedInquiry ? (
            <Card className="shadow-sm">
              <CardHeader className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-6 pb-4">
                <div>
                  <CardTitle className="text-lg font-bold">
                    {selectedInquiry.subject}
                  </CardTitle>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Pengirim: {selectedInquiry.name}
                    </span>
                    <span>•</span>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-primary hover:underline">
                      {selectedInquiry.email}
                    </a>
                    {selectedInquiry.phone && (
                      <>
                        <span>•</span>
                        <a href={`tel:${selectedInquiry.phone}`} className="text-foreground">
                          {selectedInquiry.phone}
                        </a>
                      </>
                    )}
                  </div>
                </div>

                {/* Mark read button */}
                <Button
                  variant={selectedInquiry.status === 'unread' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToggleStatus(selectedInquiry)}
                >
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                  <span>
                    {selectedInquiry.status === 'unread' ? 'Tandai Sudah Dibaca' : 'Tandai Belum Dibaca'}
                  </span>
                </Button>
              </CardHeader>

              {/* Message Content */}
              <CardContent className="p-6">
                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Isi Pesan Masuk:
                </span>
                <div className="mt-3 rounded-xl border border-border bg-muted/40 p-5 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>

                {/* Reply Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                  <Button asChild size="sm">
                    <a href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject || 'Inquiry')}`}>
                      <Reply className="h-4 w-4 mr-1.5" />
                      <span>Balas lewat Email</span>
                    </a>
                  </Button>

                  {selectedInquiry.phone && (
                    <Button asChild variant="outline" size="sm" className="border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10">
                      <a
                        href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Phone className="h-4 w-4 mr-1.5" />
                        <span>Hubungi via WhatsApp</span>
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex h-64 flex-col items-center justify-center border-dashed p-8 text-center text-muted-foreground">
              <Mail className="h-8 w-8 text-muted-foreground/50" />
              <p className="mt-3 text-xs">Pilih salah satu pesan di kolom kiri untuk membaca rinciannya.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
