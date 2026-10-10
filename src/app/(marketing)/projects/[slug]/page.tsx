import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CTASection } from '@/components/sections/cta-section';
import { getProjectBySlug, getPublishedProjects } from '@/features/projects/services/project.service';
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, Folder } from 'lucide-react';
import { GithubIcon } from '@/components/ui/icons';
import { formatDate } from '@/lib/utils/date';

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | MD Technologies Case Study`,
      description: project.shortDescription,
      images: [{ url: project.coverImage }],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-12 sm:py-16">
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all projects
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-teal-50 text-teal-700 border-teal-200">
              {project.category}
            </Badge>
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(project.createdAt)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.projectUrl && (
              <Button asChild size="sm" className="rounded-xl">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gap-2"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            )}

            {project.githubUrl && (
              <Button asChild variant="outline" size="sm" className="rounded-xl">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gap-2"
                >
                  <GithubIcon className="h-4 w-4" /> Source Code
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-xl mb-16">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Architecture & Implementation Overview
              </h2>
              <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4 text-base">
                <p>{project.description}</p>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                Key Engineering Highlights
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>Engineered with strict zero-trust data segregation protocols.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>Optimized for low-latency edge deployment and horizontal scaling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>Comprehensive automated CI/CD pipeline with synthetic test coverage.</span>
                </li>
              </ul>
            </div>

            {/* Gallery Images if available */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-4 pt-6">
                <h3 className="text-xl font-bold text-slate-900">Project Visuals</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specs */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-sm">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Folder className="h-4 w-4 text-teal-600" /> Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-teal-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-1">
                  Category
                </h4>
                <p className="text-sm font-semibold text-slate-900">
                  {project.category}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-1">
                  Client Engagement
                </h4>
                <p className="text-sm font-semibold text-slate-900">
                  Enterprise Dedicated Squad
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      <CTASection />
    </article>
  );
}
