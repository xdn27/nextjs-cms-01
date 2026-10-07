import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/lib/types';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-neutral-50 py-20 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
            Kepercayaan Klien
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Apa Kata Para Pemimpin Bisnis
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-neutral-600 dark:text-neutral-400">
            Dengar langsung testimoni dari mitra bisnis dan pimpinan korporasi yang telah merasakan dampak solusi digital kami.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-sm transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-indigo-200 dark:text-indigo-900" />
                </div>

                {/* Quote Text */}
                <p className="mt-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Client Avatar & Name */}
              <div className="mt-8 flex items-center gap-4 border-t border-neutral-100 pt-5 dark:border-neutral-800">
                {item.avatar_url ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700">
                    <Image
                      src={item.avatar_url}
                      alt={item.client_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-neutral-800 dark:text-indigo-400">
                    {item.client_name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {item.client_name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {item.client_title} {item.company && `• ${item.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
