import { Timestamp } from 'firebase/firestore';

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  technologies: string[];
  category: string;
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectInput = Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>;

export const PROJECT_CATEGORIES = [
  'Web Application',
  'Mobile App',
  'Enterprise Software',
  'E-Commerce',
  'SaaS Platform',
  'AI / ML',
  'Other',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
