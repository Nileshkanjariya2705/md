import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { ProjectGrid } from '@/components/projects/project-grid';
import { CTASection } from '@/components/sections/cta-section';
import { getPublishedProjects } from '@/features/projects/services/project.service';

export const metadata: Metadata = {
  title: 'Projects & Portfolio',
  description:
    'Explore MD Technologies case studies, enterprise software implementations, and cutting-edge digital products.',
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          badge="Portfolio"
          title="Engineered for Precision, Proven at Scale"
          description="Explore our track record of cloud platforms, AI architectures, and full-stack software delivered for category leaders."
        />

        <ProjectGrid initialProjects={projects} />
      </Container>

      <CTASection />
    </div>
  );
}
