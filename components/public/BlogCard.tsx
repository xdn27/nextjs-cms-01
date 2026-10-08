import React, { ViewTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Terbaru';

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-primary/40">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {post.cover_image ? (
          <Link href={`/blog/${post.slug}`} transitionTypes={['nav-forward']}>
            <ViewTransition name={`post-${post.id}`} share="morph" default="none">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </ViewTransition>
          </Link>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
            <span>Tidak ada foto</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge className="font-semibold shadow-sm">
            {post.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {post.author_name}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`} transitionTypes={['nav-forward']}>
              {post.title}
            </Link>
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <Link
            href={`/blog/${post.slug}`}
            transitionTypes={['nav-forward']}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline transition-colors"
          >
            <span>Baca Selengkapnya</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
