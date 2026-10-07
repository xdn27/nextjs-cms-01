import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-400">
            <span>Tidak ada foto</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-neutral-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {project.client_name && (
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Klien: {project.client_name}
            </span>
          )}
          <h3 className="mt-1 text-lg font-bold tracking-tight text-neutral-900 group-hover:text-indigo-600 transition-colors dark:text-white dark:group-hover:text-indigo-400">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 line-clamp-2 dark:text-neutral-400">
            {project.summary}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-indigo-600 transition-colors dark:text-neutral-300 dark:hover:text-indigo-400"
          >
            <span>Detail Studi Kasus</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 transition-colors dark:hover:text-neutral-200"
            >
              <span>Demo</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
