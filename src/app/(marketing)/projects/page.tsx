import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { ProjectGrid } from '@/components/projects/project-grid';
import { CTASection } from '@/components/sections/cta-section';
import { getPublishedProjects } from '@/features/projects/services/project.service';

export const metadata: Metadata = {
  title: 'Enterprise Software Case Studies & Client Projects',
  description:
    'Explore Magnovaa Technology case studies, enterprise software implementations, generative AI systems, and high-concurrency digital platforms.',
  alternates: {
    canonical: 'https://magnovaa.com/projects',
  },
  openGraph: {
    title: 'Enterprise Software Case Studies & Client Projects | Magnovaa Technology',
    description:
      'Explore Magnovaa Technology case studies, enterprise software implementations, generative AI systems, and high-concurrency digital platforms.',
    url: 'https://magnovaa.com/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Software Case Studies & Client Projects | Magnovaa Technology',
    description:
      'Explore Magnovaa Technology case studies, enterprise software implementations, generative AI systems, and high-concurrency digital platforms.',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://magnovaa.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Projects',
      item: 'https://magnovaa.com/projects',
    },
  ],
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container>
        <SectionHeading
          as="h1"
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
