export interface PricingPlan {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  monthlyPrice: number | string; // e.g. 4999 or "Custom"
  quarterlyPrice: number | string; // e.g. 7650 or "Custom"
  billingPeriod: string; // e.g. "per project sprint", "per month"
  popular: boolean;
  idealFor: string;
  deliveryTime: string;
  teamSetup: string;
  features: string[];
  technologies: string[];
  ctaLabel: string;
  ctaHref: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export type CreatePricingPlanInput = Omit<PricingPlan, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdatePricingPlanInput = Partial<CreatePricingPlanInput>;
