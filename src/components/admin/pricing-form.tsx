'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  useCreatePricingPlanMutation,
  useUpdatePricingPlanMutation,
} from '@/features/pricing/hooks/use-pricing-query';
import { PricingPlan } from '@/features/pricing/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, ArrowLeft, Sparkles, Plus, Trash2, Check } from 'lucide-react';
import Link from 'next/link';

interface PricingFormProps {
  initialData?: PricingPlan;
  isEdit?: boolean;
}

interface FormValues {
  name: string;
  badge: string;
  tagline: string;
  monthlyPrice: string;
  quarterlyPrice: string;
  billingPeriod: string;
  popular: boolean;
  idealFor: string;
  deliveryTime: string;
  teamSetup: string;
  featuresText: string;
  technologiesText: string;
  ctaLabel: string;
  ctaHref: string;
  sortOrder: number;
  isActive: boolean;
}

export function PricingForm({ initialData, isEdit = false }: PricingFormProps) {
  const router = useRouter();
  const createMutation = useCreatePricingPlanMutation();
  const updateMutation = useUpdatePricingPlanMutation();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: initialData?.name || '',
      badge: initialData?.badge || '',
      tagline: initialData?.tagline || '',
      monthlyPrice: initialData?.monthlyPrice !== undefined ? String(initialData.monthlyPrice) : '4999',
      quarterlyPrice: initialData?.quarterlyPrice !== undefined ? String(initialData.quarterlyPrice) : '4999',
      billingPeriod: initialData?.billingPeriod || 'per month',
      popular: initialData?.popular ?? false,
      idealFor: initialData?.idealFor || '',
      deliveryTime: initialData?.deliveryTime || '',
      teamSetup: initialData?.teamSetup || '',
      featuresText: initialData?.features?.join('\n') || '',
      technologiesText: initialData?.technologies?.join(', ') || '',
      ctaLabel: initialData?.ctaLabel || 'Get Started',
      ctaHref: initialData?.ctaHref || '/contact',
      sortOrder: initialData?.sortOrder ?? 0,
      isActive: initialData?.isActive ?? true,
    },
  });

  const isPopularVal = watch('popular');
  const isActiveVal = watch('isActive');

  const onSubmit = async (values: FormValues) => {
    try {
      const features = values.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const technologies = values.technologiesText
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      // Parse price to number if strictly numeric, else string (e.g. 'Custom')
      const monthlyParsed = isNaN(Number(values.monthlyPrice)) || values.monthlyPrice.trim() === ''
        ? values.monthlyPrice.trim()
        : Number(values.monthlyPrice);

      const quarterlyParsed = isNaN(Number(values.quarterlyPrice)) || values.quarterlyPrice.trim() === ''
        ? values.quarterlyPrice.trim()
        : Number(values.quarterlyPrice);

      const payload = {
        name: values.name.trim(),
        badge: values.badge.trim(),
        tagline: values.tagline.trim(),
        monthlyPrice: monthlyParsed,
        quarterlyPrice: quarterlyParsed,
        billingPeriod: values.billingPeriod.trim(),
        popular: values.popular,
        idealFor: values.idealFor.trim(),
        deliveryTime: values.deliveryTime.trim(),
        teamSetup: values.teamSetup.trim(),
        features,
        technologies,
        ctaLabel: values.ctaLabel.trim(),
        ctaHref: values.ctaHref.trim(),
        sortOrder: Number(values.sortOrder) || 0,
        isActive: values.isActive,
      };

      if (isEdit && initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, data: payload });
        toast.success('Pricing plan updated successfully');
      } else {
        await createMutation.mutateAsync(payload);
        toast.success('New pricing plan created successfully');
      }

      router.push('/admin/pricing');
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save pricing plan');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/pricing"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Cancel & Return
        </Link>
        <Button type="submit" disabled={isSubmitting} className="rounded-xl">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-1" /> Saving Plan...
            </>
          ) : isEdit ? (
            'Save Changes'
          ) : (
            'Create Pricing Plan'
          )}
        </Button>
      </div>

      {/* Basic Plan Info */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Plan Identification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Plan Title *
            </label>
            <Input
              placeholder="e.g. Dedicated Engineering Pod"
              {...register('name', { required: 'Plan name is required' })}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Audience / Stage Badge *
            </label>
            <Input
              placeholder="e.g. Growth & Scale or Seed & Startups"
              {...register('badge', { required: 'Badge is required' })}
            />
            {errors.badge && <p className="text-xs text-red-500">{errors.badge.message}</p>}
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Short Tagline / Value Proposition *
            </label>
            <Input
              placeholder="Brief description of who this plan is tailored for and what it delivers"
              {...register('tagline', { required: 'Tagline is required' })}
            />
            {errors.tagline && <p className="text-xs text-red-500">{errors.tagline.message}</p>}
          </div>
        </div>
      </div>

      {/* Pricing & Billing Structure */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Investment & Billing Rates
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Monthly Rate ($ or Custom) *
            </label>
            <Input
              placeholder="8999 or Custom"
              {...register('monthlyPrice', { required: 'Monthly rate is required' })}
            />
            <p className="text-[11px] text-slate-400">Enter a number or &quot;Custom&quot;</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Quarterly Rate ($ or Custom) *
            </label>
            <Input
              placeholder="7650 or Custom"
              {...register('quarterlyPrice', { required: 'Quarterly rate is required' })}
            />
            <p className="text-[11px] text-slate-400">Enter discounted rate or &quot;Custom&quot;</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Billing Period Label *
            </label>
            <Input
              placeholder="per month / per sprint"
              {...register('billingPeriod', { required: 'Billing period is required' })}
            />
          </div>
        </div>
      </div>

      {/* Team Pod & Delivery Scope */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Team Pod & Execution Scope
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Delivery Timeline *
            </label>
            <Input
              placeholder="e.g. 3 – 4 Weeks to Launch or Continuous Bi-Weekly Sprints"
              {...register('deliveryTime', { required: 'Delivery timeline is required' })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Team Setup *
            </label>
            <Input
              placeholder="e.g. Senior Tech Lead + 2 Full-Stack Devs + UI/UX"
              {...register('teamSetup', { required: 'Team setup is required' })}
            />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Ideal Target Audience *
            </label>
            <Input
              placeholder="e.g. Funded startups, scale-ups & high-growth digital businesses"
              {...register('idealFor', { required: 'Target audience is required' })}
            />
          </div>
        </div>
      </div>

      {/* Deliverables Checklist & Technologies */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Deliverables Checklist & Tech Stack
        </h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Deliverables List (One per line) *
            </label>
            <Textarea
              rows={8}
              placeholder={`Interactive Figma UI/UX prototype & design system\nProduction web app with React 19 & Next.js 15\nRelational PostgreSQL database architecture\nAutomated CI/CD deployment\n100% intellectual property ownership`}
              {...register('featuresText', { required: 'Please enter at least one deliverable' })}
            />
            <p className="text-[11px] text-slate-400">
              Each line will appear as a checkmarked feature in the pricing card.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Technologies / Stack Badges (Comma-separated)
            </label>
            <Input
              placeholder="Next.js, React, Node.js, PostgreSQL, Stripe"
              {...register('technologiesText')}
            />
            <p className="text-[11px] text-slate-400">
              Separated by commas (e.g. React/Node, Python AI, Docker, AWS)
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action & Display Configuration */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          CTA Button & Display Controls
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              CTA Button Label *
            </label>
            <Input
              placeholder="e.g. Hire Your Dedicated Pod"
              {...register('ctaLabel', { required: 'CTA label is required' })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              CTA Button Link *
            </label>
            <Input
              placeholder="/contact?plan=dedicated-pod"
              {...register('ctaHref', { required: 'CTA link is required' })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Display Sort Order (1, 2, 3...)
            </label>
            <Input
              type="number"
              {...register('sortOrder', { valueAsNumber: true })}
            />
          </div>

          <div className="flex flex-col justify-end space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <div className="text-xs font-bold text-slate-900">Featured / Most Popular</div>
                <div className="text-[11px] text-slate-500">Highlights card with glowing accent</div>
              </div>
              <Switch
                checked={isPopularVal}
                onCheckedChange={(c) => setValue('popular', c)}
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <div className="text-xs font-bold text-slate-900">Live on Public Website</div>
                <div className="text-[11px] text-slate-500">Enable or hide without deleting</div>
              </div>
              <Switch
                checked={isActiveVal}
                onCheckedChange={(c) => setValue('isActive', c)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
