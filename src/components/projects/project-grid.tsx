'use client';
import React, { useState } from 'react';
import { Project, PROJECT_CATEGORIES } from '@/features/projects/types';
import { usePublishedProjectsQuery } from '@/features/projects/hooks/use-projects-query';
import { ProjectCard } from './project-card';
import { MobileCardScroll } from '@/components/ui/mobile-card-scroll';
import { cn } from '@/lib/utils/cn';
import { Layers } from 'lucide-react';

interface ProjectGridProps {
  initialProjects: Project[];
}

export function ProjectGrid({ initialProjects }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { data: projects = initialProjects } = usePublishedProjectsQuery(initialProjects);

  const categories = ['All', ...PROJECT_CATEGORIES];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer',
                isSelected
                  ? 'bg-gradient-to-r from-[#2f6bff] to-[#4f8aff] text-white border-[#2f6bff] shadow-[0_4px_14px_rgba(47,107,255,0.25)] -translate-y-0.5'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <MobileCardScroll gridClassName="md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </MobileCardScroll>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center max-w-md mx-auto shadow-sm">
          <Layers className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#14233a] mb-1">No Projects Found</h3>
          <p className="text-sm text-[#64748b] mb-6">
            There are no projects currently published in the &ldquo;{selectedCategory}&rdquo; category.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className="text-xs text-[#2f6bff] hover:underline font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
