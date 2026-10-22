import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/features/projects/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white hover:border-[#2f6bff]/40 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(47,107,255,0.12)]">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={project.coverImage}
          alt={`${project.title} - ${project.category} case study by Magnovaa Technology`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14233a]/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/95 backdrop-blur-md border-[#2f6bff]/20 text-[#2f6bff] font-bold shadow-xs">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-xl font-bold text-[#14233a] group-hover:text-[#2f6bff] transition-colors line-clamp-1">
            {project.title}
          </h3>
          <div className="rounded-full p-2 bg-slate-100 text-slate-600 group-hover:bg-[#2f6bff] group-hover:text-white transition-all shrink-0">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <p className="text-sm text-[#64748b] line-clamp-2 mb-6 flex-1 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 group-hover:bg-[#2f6bff]/8 group-hover:text-[#2f6bff] transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View ${project.title} details`}
        />
      </div>
    </Card>
  );
}
