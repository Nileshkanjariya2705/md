import { MetadataRoute } from 'next';
import { getPublishedProjects } from '@/features/projects/services/project.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://md.dev';

  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/team',
    '/services',
    '/career',
    '/reviews',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const projects = await getPublishedProjects();
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
