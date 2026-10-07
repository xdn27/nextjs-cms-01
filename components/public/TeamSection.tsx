import React from 'react';
import Image from 'next/image';
import { TeamMember } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface TeamSectionProps {
  team: TeamMember[];
}

export function TeamSection({ team }: TeamSectionProps) {
  if (!team || team.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">
            Teknisi &amp; Konsultan Hardware
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Tim Ahli Rakit PC &amp; Servis Komputer
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground">
            Didukung oleh para teknisi perakitan berpengalaman dan spesialis perbaikan hardware bersertifikasi.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <Card
              key={member.id}
              className="group flex flex-col items-center text-center transition-all duration-200 ease-out hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
            >
              <CardContent className="p-6 flex flex-col items-center w-full">
                {/* Photo */}
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-primary/20 shadow-md transition-transform duration-150 ease-out group-hover:scale-105">
                  {member.photo_url ? (
                    <Image
                      src={member.photo_url}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-primary">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {member.bio}
                  </p>
                )}

                {/* Social links */}
                <div className="mt-4 flex items-center justify-center gap-3 pt-3 border-t border-border w-full">
                  {member.social_linkedin && (
                    <a
                      href={member.social_linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.social_twitter && (
                    <a
                      href={member.social_twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      X
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
