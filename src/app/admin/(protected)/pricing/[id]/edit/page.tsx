import React from 'react';
import { notFound } from 'next/navigation';
import { AdminHeader } from '@/components/admin/admin-header';
import { PricingForm } from '@/components/admin/pricing-form';
import { getPricingPlanById } from '@/features/pricing/services/pricing.service';

export const dynamic = 'force-dynamic';

interface EditPricingProps {
  params: Promise<{ id: string }>;
}

export default async function EditPricingPlanPage({ params }: EditPricingProps) {
  const { id } = await params;
  const plan = await getPricingPlanById(id);

  if (!plan) {
    notFound();
  }

  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title={`Edit Plan: ${plan.name}`}
        description="Update pricing rates, deliverable checklists, tech stacks, or visibility status."
      />
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <PricingForm initialData={plan} isEdit />
      </div>
    </div>
  );
}
