import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Post } from '@/lib/types';

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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
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
          <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-neutral-400" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-neutral-400" />
              {post.author_name}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-bold tracking-tight text-neutral-900 group-hover:text-indigo-600 transition-colors dark:text-white dark:group-hover:text-indigo-400">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-neutral-600 line-clamp-2 dark:text-neutral-400">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-6 border-t border-neutral-100 pt-4 dark:border-neutral-800">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors dark:text-indigo-400"
          >
            <span>Baca Selengkapnya</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
