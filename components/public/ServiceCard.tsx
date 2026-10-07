import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Service } from '@/lib/types';
import { DynamicIcon } from './DynamicIcon';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-indigo-800">
      <div>
        {/* Service Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-neutral-800 dark:text-indigo-400 dark:group-hover:bg-indigo-600 dark:group-hover:text-white">
          <DynamicIcon name={service.icon} className="h-7 w-7" />
        </div>

        {/* Title */}
        <h3 className="mt-5 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {service.title}
        </h3>

        {/* Summary */}
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {service.summary}
        </p>

        {/* Features list */}
        {service.features && service.features.length > 0 && (
          <ul className="mt-5 space-y-2 border-t border-neutral-100 pt-4 dark:border-neutral-800">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                <Check className="h-3.5 w-3.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 pt-2">
        <Link
          href={`/services#${service.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700 dark:text-indigo-400"
        >
          <span>Pelajari Selengkapnya</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
