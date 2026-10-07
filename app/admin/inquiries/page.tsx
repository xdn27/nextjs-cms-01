'use client';

import React, { useState } from 'react';
import { Mail, Phone, Reply, Check } from 'lucide-react';
import { updateInquiryStatusAction } from '@/lib/actions';
import { initialInquiries } from '@/lib/mock-data';
import { Inquiry } from '@/lib/types';

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
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Kotak Masuk Pesan & Leads
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Daftar pesan masuk dan formulir kontak calon klien dari website publik.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-1 text-xs dark:border-neutral-800 dark:bg-neutral-900">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400'
            }`}
          >
            Semua ({inquiries.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400'
            }`}
          >
            Belum Dibaca ({inquiries.filter((i) => i.status === 'unread').length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              filter === 'read'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400'
            }`}
          >
            Sudah Dibaca ({inquiries.filter((i) => i.status !== 'unread').length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Messages List Column */}
        <div className="lg:col-span-1 space-y-3">
          {filteredInquiries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-400">
              Tidak ada pesan pada kategori ini.
            </div>
          ) : (
            filteredInquiries.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedInquiry(item)}
                className={`cursor-pointer rounded-2xl border p-4.5 transition-all text-xs ${
                  selectedInquiry?.id === item.id
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm dark:border-indigo-500 dark:bg-indigo-950/30'
                    : 'border-neutral-200/80 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 dark:text-white">
                      {item.name}
                    </span>
                    {item.status === 'unread' && (
                      <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-400">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : 'Baru'}
                  </span>
                </div>

                <p className="mt-1 font-semibold text-neutral-700 dark:text-neutral-300 truncate">
                  {item.subject}
                </p>

                <p className="mt-1 text-neutral-500 line-clamp-2">
                  {item.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail View Column */}
        <div className="lg:col-span-2">
          {selectedInquiry ? (
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-4 dark:border-neutral-800">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {selectedInquiry.subject}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                      Pengirim: {selectedInquiry.name}
                    </span>
                    <span>•</span>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-indigo-600 hover:underline">
                      {selectedInquiry.email}
                    </a>
                    {selectedInquiry.phone && (
                      <>
                        <span>•</span>
                        <a href={`tel:${selectedInquiry.phone}`} className="text-neutral-600 dark:text-neutral-400">
                          {selectedInquiry.phone}
                        </a>
                      </>
                    )}
                  </div>
                </div>

                {/* Mark read button */}
                <button
                  onClick={() => handleToggleStatus(selectedInquiry)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    selectedInquiry.status === 'unread'
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>
                    {selectedInquiry.status === 'unread' ? 'Tandai Sudah Dibaca' : 'Tandai Belum Dibaca'}
                  </span>
                </button>
              </div>

              {/* Message Content */}
              <div className="mt-6">
                <span className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Isi Pesan Masuk:
                </span>
                <div className="mt-3 rounded-xl border border-neutral-100 bg-neutral-50/70 p-5 text-sm leading-relaxed text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-neutral-200 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Reply Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject || 'Inquiry')}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-indigo-500"
                >
                  <Reply className="h-4 w-4" />
                  <span>Balas lewat Email</span>
                </a>

                {selectedInquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Hubungi via WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-400 dark:border-neutral-800">
              <Mail className="h-8 w-8 text-neutral-300 dark:text-neutral-700" />
              <p className="mt-3 text-xs">Pilih salah satu pesan di kolom kiri untuk membaca rinciannya.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
