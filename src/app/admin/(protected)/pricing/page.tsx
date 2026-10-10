import React from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { PricingTable } from '@/components/admin/pricing-table';
import { getAllPricingPlans } from '@/features/pricing/services/pricing.service';

export const dynamic = 'force-dynamic';

export default async function AdminPricingPage() {
  const plans = await getAllPricingPlans();

  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title="Pricing Plans & Packages"
        description="Manage pricing tiers, deliverable checklists, rates, and visibility on the public website."
      />
      <div className="p-8 max-w-7xl">
        <PricingTable initialPlans={plans} />
      </div>
    </div>
  );
}
