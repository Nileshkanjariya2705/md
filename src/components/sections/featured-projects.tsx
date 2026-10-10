import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { ProjectCard } from '@/components/projects/project-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/features/projects/types';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section id="projects" className="py-24 relative overflow-hidden scroll-mt-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            badge="Selected Work"
            title="Featured Case Studies"
            description="Explore how we have engineered scalable architectures, modernized legacies, and launched game-changing products."
            align="left"
            className="mb-0 max-w-2xl"
          />
          <div className="mt-6 md:mt-0">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/projects" className="gap-2">
                All Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Explore More Projects Button */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-xl px-8 shadow-sm">
            <Link href="/projects" className="gap-2">
              Explore More Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
