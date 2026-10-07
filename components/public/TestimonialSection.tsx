import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">
            Kepercayaan Klien
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Apa Kata Para Pemimpin Bisnis
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground">
            Dengar langsung testimoni dari mitra bisnis dan pimpinan korporasi yang telah merasakan dampak solusi digital kami.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
            >
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-primary/30" />
                  </div>

                  {/* Quote Text */}
                  <p className="mt-5 text-sm leading-relaxed text-foreground italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Client Avatar & Name */}
                <div className="mt-8 flex items-center gap-4 border-t border-border pt-5">
                  {item.avatar_url ? (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border">
                      <Image
                        src={item.avatar_url}
                        alt={item.client_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {item.client_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {item.client_name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.client_title} {item.company && `• ${item.company}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
