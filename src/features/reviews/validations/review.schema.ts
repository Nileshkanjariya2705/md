import { z } from 'zod';

export const clientReviewSchema = z.object({
  clientName: z.string().min(2, 'Client name is required').max(80, 'Name is too long'),
  companyName: z.string().min(2, 'Company name is required').max(100, 'Company name is too long'),
  designation: z.string().min(2, 'Designation is required').max(100, 'Designation is too long'),
  photo: z.string().url('Must be a valid photo URL').optional().or(z.literal('')),
  review: z.string().min(10, 'Review must be at least 10 characters').max(1000, 'Review is too long'),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5').default(5),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export type ClientReviewFormData = z.infer<typeof clientReviewSchema>;
