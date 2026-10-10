import { z } from 'zod';
import { PROJECT_CATEGORIES } from '../types';

export const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(100, 'Title is too long'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters').max(200, 'Short description cannot exceed 200 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  coverImage: z.string().url('Must be a valid image URL'),
  gallery: z.array(z.string().url()).default([]),
  technologies: z.array(z.string()).min(1, 'Add at least one technology tag'),
  category: z.enum(PROJECT_CATEGORIES as unknown as [string, ...string[]]),
  projectUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
