import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Service } from '@/lib/types';
import { DynamicIcon } from './DynamicIcon';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group relative flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40">
      <CardContent className="p-7 flex flex-col justify-between h-full">
        <div>
          {/* Service Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <DynamicIcon name={service.icon} className="h-7 w-7" />
          </div>

          {/* Title */}
          <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">
            {service.title}
          </h3>

          {/* Summary */}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {service.summary}
          </p>

          {/* Features list */}
          {service.features && service.features.length > 0 && (
            <ul className="mt-5 space-y-2 border-t border-border pt-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-medium text-foreground">
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 pt-2">
          <Link
            href={`/layanan#${service.slug}`}
            transitionTypes={['nav-lateral']}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:underline"
          >
            <span>Pelajari Selengkapnya</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
