import React from 'react';
import type { Metadata } from 'next';
import { getCompanySettings, getProjects } from '@/lib/data';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { ProjectCard } from '@/components/public/ProjectCard';

export const metadata: Metadata = {
  title: 'Portofolio & Studi Kasus',
  description: 'Jelajahi berbagai proyek enterprise, aplikasi web & mobile yang telah kami selesaikan dengan sukses.',
};


export default async function PortfolioPage() {
  const [settings, projects] = await Promise.all([
    getCompanySettings(),
    getProjects(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-neutral-50 via-white to-white py-16 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
              Karya & Pencapaian
            </span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              Studi Kasus & Portofolio
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300">
              Berikut adalah beberapa proyek unggulan yang merefleksikan dedikasi kami pada kualitas teknis, desain antarmuka, dan skalabilitas.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
