import React from 'react';
import Image from 'next/image';
import { Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/icons';
import { TeamMember } from '@/features/team/types';
import { Card } from '@/components/ui/card';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="group overflow-hidden border-slate-200 bg-white hover:border-teal-500/40 transition-all duration-300 hover:shadow-xl p-6 flex flex-col items-center text-center justify-between">
      <div className="flex flex-col items-center w-full">
        {/* Photo with glow on hover */}
        <div className="relative mb-5 h-32 w-32 overflow-hidden rounded-2xl ring-2 ring-slate-200 group-hover:ring-teal-500/50 shadow-sm transition-all duration-300">
          <Image
            src={member.photo}
            alt={`${member.name} - ${member.designation} at Magnovaa Technology`}
            fill
            sizes="128px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Department Pill */}
        {member.department && (
          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-full mb-2">
            {member.department}
          </span>
        )}

        {/* Info */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
          {member.name}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mt-0.5 mb-3">
          {member.designation}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {member.bio}
        </p>

        {/* Skills Chips */}
        {member.skills && member.skills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-5 w-full">
            {member.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-medium text-slate-600 bg-slate-100 rounded-md px-2 py-0.5"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-auto flex items-center justify-center gap-2 pt-3 border-t border-slate-100 w-full">
        {member.linkedinUrl && (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} LinkedIn`}
            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-teal-600 hover:bg-slate-200 transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        )}
        {member.githubUrl && (
          <a
            href={member.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} GitHub`}
            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-teal-600 hover:bg-slate-200 transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        )}
        {member.websiteUrl && (
          <a
            href={member.websiteUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} Website`}
            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-teal-600 hover:bg-slate-200 transition-colors"
          >
            <Globe className="h-4 w-4" />
          </a>
        )}
      </div>
    </Card>
  );
}
