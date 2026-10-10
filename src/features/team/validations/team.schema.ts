import { z } from 'zod';

export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  designation: z.string().min(2, 'Designation is required').max(100, 'Designation is too long'),
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(500, 'Bio cannot exceed 500 characters'),
  photo: z.string().url('Must be a valid photo URL'),
  linkedinUrl: z.string().url('Must be a valid LinkedIn URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Must be a valid GitHub URL').optional().or(z.literal('')),
  websiteUrl: z.string().url('Must be a valid website URL').optional().or(z.literal('')),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;
