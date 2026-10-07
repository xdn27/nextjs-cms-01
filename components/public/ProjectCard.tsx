import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
            <span>Tidak ada foto</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-md font-semibold">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col justify-between p-6">
        <div>
          {project.client_name && (
            <span className="text-xs font-medium text-muted-foreground">
              Klien: {project.client_name}
            </span>
          )}
          <h3 className="mt-1 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {project.summary}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors"
          >
            <span>Detail Studi Kasus</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {project.project_url && (
            <a
              href={project.project_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Demo</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
