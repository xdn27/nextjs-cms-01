import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import { getCompanySettings, getProjectBySlug, getProjects } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Proyek Tidak Ditemukan' };
  }

  return {
    title: `${project.title} - Studi Kasus`,
    description: project.summary,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const [settings, project] = await Promise.all([
    getCompanySettings(),
    getProjectBySlug(slug),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1 pb-24">
        {/* Back navigation */}
        <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Portofolio</span>
          </Link>
        </div>

        {/* Title & Metadata */}
        <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {project.category}
            </span>
            {project.client_name && (
              <span className="text-xs font-medium text-neutral-500">
                Klien: {project.client_name}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
            {project.title}
          </h1>

          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
            {project.summary}
          </p>

          {project.project_url && (
            <div className="mt-6">
              <a
                href={project.project_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                <span>Lihat Live Preview</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>

        {/* Cover Image */}
        {project.cover_image && (
          <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-neutral-200 shadow-xl dark:border-neutral-800">
              <Image
                src={project.cover_image}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        )}

        {/* Main Case Study Content */}
        <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Tantangan & Solusi yang Dihadirkan
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              <p>{project.description || project.summary}</p>
              <p>
                Melalui arsitektur sistem yang modular dan berbasis cloud serverless, kami memastikan sistem mampu beroperasi dengan efisiensi maksimal, biaya komputasi terkontrol, dan keamanan yang terverifikasi.
              </p>
            </div>

            <div className="mt-8 border-t border-neutral-100 pt-6 dark:border-neutral-800">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                Hasil yang Dicapai
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Waktu respons sistem berkurang lebih dari 60%</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Efisiensi operasional tim meningkat signifikan</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Tingkat kepuasan pengguna (CSAT) mencapai skor 4.9/5.0</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
