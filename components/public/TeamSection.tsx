import React from 'react';
import Image from 'next/image';
import { TeamMember } from '@/lib/types';

interface TeamSectionProps {
  team: TeamMember[];
}

export function TeamSection({ team }: TeamSectionProps) {
  if (!team || team.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
            Tim Kepemimpinan
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Para Insinyur & Inovator Kami
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-neutral-600 dark:text-neutral-400">
            Didukung oleh para profesional berpengalaman yang berdedikasi menciptakan standar keunggulan teknologi baru.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col items-center rounded-2xl border border-neutral-200/80 bg-white p-6 text-center shadow-sm transition-all hover:border-indigo-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              {/* Photo */}
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-indigo-100 shadow-md transition-transform group-hover:scale-105 dark:border-neutral-700">
                {member.photo_url ? (
                  <Image
                    src={member.photo_url}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-indigo-50 text-2xl font-bold text-indigo-600 dark:bg-neutral-800 dark:text-indigo-400">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="mt-5 text-lg font-bold text-neutral-900 dark:text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {member.role}
              </p>
              {member.bio && (
                <p className="mt-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-3">
                  {member.bio}
                </p>
              )}

              {/* Social links */}
              <div className="mt-4 flex items-center gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                {member.social_linkedin && (
                  <a
                    href={member.social_linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-neutral-500 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
                  >
                    LinkedIn
                  </a>
                )}
                {member.social_twitter && (
                  <a
                    href={member.social_twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-neutral-500 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
                  >
                    X
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
