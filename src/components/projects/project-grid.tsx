'use client';
import React, { useState } from 'react';
import { Project, PROJECT_CATEGORIES } from '@/features/projects/types';
import { usePublishedProjectsQuery } from '@/features/projects/hooks/use-projects-query';
import { ProjectCard } from './project-card';
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
                'rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 border',
                isSelected
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center max-w-md mx-auto shadow-sm">
          <Layers className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Projects Found</h3>
          <p className="text-sm text-slate-500 mb-6">
            There are no projects currently published in the &ldquo;{selectedCategory}&rdquo; category.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className="text-xs text-teal-600 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
