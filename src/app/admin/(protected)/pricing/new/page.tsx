import React from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { PricingForm } from '@/components/admin/pricing-form';

export default function NewPricingPlanPage() {
  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title="Create New Pricing Plan"
        description="Configure a new service tier, pricing structure, and deliverable inclusions."
      />
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <PricingForm />
      </div>
    </div>
  );
}
