import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Project } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const waText = encodeURIComponent(
    `Halo CyberTech Computer, saya tertarik bertanya mengenai: ${productTitle(project)} (${project.client_name || ''})`
  );
  const waUrl = `https://wa.me/6281388997722?text=${waText}`;

  function productTitle(p: Project) {
    return p.title;
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-[#3584e4]/40">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
            <span>Tidak ada foto</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-md font-semibold text-[11px] shadow-sm">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col justify-between p-6">
        <div>
          {project.client_name && (
            <div className="inline-block rounded-lg bg-[#3584e4]/10 px-2.5 py-1 text-xs font-bold text-[#3584e4] mb-2">
              {project.client_name}
            </div>
          )}
          <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            <Link href={`/katalog/${project.slug}`}>
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {project.summary}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2 border-t border-border pt-4">
          <Button
            asChild
            size="sm"
            className="flex-1 h-8 bg-[#2ec27e] hover:bg-[#26a269] text-white text-xs font-semibold cursor-pointer"
          >
            <a href={waUrl} target="_blank" rel="noreferrer">
              <MessageCircle className="h-3.5 w-3.5 mr-1" />
              <span>Tanya Stok</span>
            </a>
          </Button>

          <Button asChild variant="outline" size="sm" className="h-8 px-3 text-xs cursor-pointer">
            <Link href={`/katalog/${project.slug}`}>
              <span>Detail</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
