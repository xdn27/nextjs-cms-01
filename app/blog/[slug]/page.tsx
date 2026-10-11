import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { getCompanySettings, getPostBySlug, getPosts } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Artikel Tidak Ditemukan' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  if (posts.length === 0) {
    return [{ slug: '__placeholder__' }];
  }
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const [settings, post] = await Promise.all([
    getCompanySettings(),
    getPostBySlug(slug),
  ]);

  if (!post) {
    notFound();
  }

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Baru saja';

  return (
      <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1 pb-24">
        {/* Back Link */}
        <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            transitionTypes={['nav-back']}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Semua Artikel</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {post.category}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 border-b border-neutral-200 pb-6 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-neutral-400" />
              <span>Oleh {post.author_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-neutral-400" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Featured Cover Image */}
          {post.cover_image && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-neutral-200 shadow-lg dark:border-neutral-800">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          )}

          {/* Article Body Content */}
          <div className="mt-10 rounded-2xl border border-neutral-200/70 bg-white p-8 sm:p-12 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            {post.excerpt && (
              <p className="border-l-4 border-indigo-600 pl-4 text-lg font-medium italic text-neutral-700 dark:text-neutral-300 mb-8">
                {post.excerpt}
              </p>
            )}

            <div
              className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed text-neutral-800 dark:text-neutral-200 space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-6 dark:border-neutral-800">
                <Tag className="h-4 w-4 text-neutral-400 mr-1" />
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
