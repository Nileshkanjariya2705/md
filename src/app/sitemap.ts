import { MetadataRoute } from 'next';
import { getPublishedProjects } from '@/features/projects/services/project.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magnovaa.com';

  const staticRoutes = [
    { path: '', changeFreq: 'daily' as const, priority: 1.0 },
    { path: '/services', changeFreq: 'weekly' as const, priority: 0.9 },
    { path: '/projects', changeFreq: 'weekly' as const, priority: 0.9 },
    { path: '/about', changeFreq: 'monthly' as const, priority: 0.8 },
    { path: '/team', changeFreq: 'monthly' as const, priority: 0.8 },
    { path: '/career', changeFreq: 'weekly' as const, priority: 0.8 },
    { path: '/reviews', changeFreq: 'weekly' as const, priority: 0.8 },
    { path: '/contact', changeFreq: 'monthly' as const, priority: 0.8 },
    { path: '/privacy', changeFreq: 'yearly' as const, priority: 0.5 },
    { path: '/terms', changeFreq: 'yearly' as const, priority: 0.5 },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFreq,
    priority: route.priority,
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
