import { z } from 'zod';

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required').max(80, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().max(25, 'Phone number is too long').optional().or(z.literal('')),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(120, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message cannot exceed 2000 characters'),
  honeypot: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactMessageSchema>;
