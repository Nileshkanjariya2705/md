import { z } from 'zod';

export const pricingPlanSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  badge: z.string().min(1, 'Badge is required').max(50, 'Badge is too long'),
  tagline: z.string().min(5, 'Tagline must be at least 5 characters').max(250, 'Tagline is too long'),
  monthlyPrice: z.union([z.number(), z.string()]),
  quarterlyPrice: z.union([z.number(), z.string()]),
  billingPeriod: z.string().min(2, 'Billing period is required'),
  popular: z.boolean().default(false),
  idealFor: z.string().min(3, 'Ideal audience description is required'),
  deliveryTime: z.string().min(2, 'Delivery timeline is required'),
  teamSetup: z.string().min(2, 'Team setup is required'),
  features: z.array(z.string()).min(1, 'Provide at least one feature item'),
  technologies: z.array(z.string()).default([]),
  ctaLabel: z.string().min(2, 'CTA button label is required'),
  ctaHref: z.string().min(1, 'CTA link is required'),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type PricingPlanFormData = z.infer<typeof pricingPlanSchema>;
