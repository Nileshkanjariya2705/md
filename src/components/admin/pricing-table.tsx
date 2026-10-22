'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PricingPlan } from '@/features/pricing/types';
import {
  useAllPricingQuery,
  useUpdatePricingPlanMutation,
  useDeletePricingPlanMutation,
} from '@/features/pricing/hooks/use-pricing-query';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from './confirm-dialog';
import { Edit2, Trash2, Search, Plus } from 'lucide-react';

interface PricingTableProps {
  initialPlans: PricingPlan[];
}

export function PricingTable({ initialPlans }: PricingTableProps) {
  const router = useRouter();
  const { data: plans = initialPlans } = useAllPricingQuery(initialPlans);
  const updateMutation = useUpdatePricingPlanMutation();
  const deleteMutation = useDeletePricingPlanMutation();

  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<PricingPlan | null>(null);

  const filtered = plans.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.badge.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      const next = !current;
      await updateMutation.mutateAsync({ id, data: { isActive: next } });
      toast.success(`Pricing plan ${next ? 'activated on website' : 'hidden from website'}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update plan status');
    }
  };

  const handleTogglePopular = async (id: string, current: boolean) => {
    try {
      const next = !current;
      await updateMutation.mutateAsync({ id, data: { popular: next } });
      toast.success(`Plan ${next ? 'marked as Most Popular' : 'unmarked from Most Popular'}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update popular highlight');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Pricing plan deleted');
      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete pricing plan');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search plans by name, badge..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>

        <Button asChild className="w-full sm:w-auto rounded-xl">
          <Link href="/admin/pricing/new" className="gap-2">
            <Plus className="h-4 w-4" /> Add Pricing Plan
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Plan Name & Badge</TableHead>
              <TableHead>Monthly / Sprint</TableHead>
              <TableHead>Quarterly</TableHead>
              <TableHead>Delivery / Scope</TableHead>
              <TableHead className="text-center">Popular</TableHead>
              <TableHead className="text-center">Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-slate-500">
                  No pricing plans found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((plan) => {
                const isCustom = typeof plan.monthlyPrice === 'string';
                const formattedMonthly = isCustom ? 'Custom' : `$${Number(plan.monthlyPrice).toLocaleString()}`;
                const formattedQuarterly = isCustom ? 'Custom' : `$${Number(plan.quarterlyPrice).toLocaleString()}`;

                return (
                  <TableRow key={plan.id} className="hover:bg-slate-50/80 transition-colors">
                    <TableCell className="text-center font-bold text-slate-400 text-xs">
                      {plan.sortOrder ?? 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{plan.name}</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              {plan.badge}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 line-clamp-1 mt-0.5 max-w-sm">
                            {plan.tagline}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-extrabold text-slate-900">
                        {formattedMonthly}
                      </div>
                      <span className="text-[11px] text-slate-400">/{plan.billingPeriod}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-bold text-[#2f6bff]">
                        {formattedQuarterly}
                      </div>
                      <span className="text-[11px] text-slate-400">/quarter</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-semibold text-slate-700">{plan.deliveryTime}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{plan.teamSetup}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Switch
                          checked={plan.popular}
                          onCheckedChange={() => handleTogglePopular(plan.id, plan.popular)}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Switch
                          checked={plan.isActive}
                          onCheckedChange={() => handleToggleActive(plan.id, plan.isActive)}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-600 hover:text-[#2f6bff] hover:bg-[#2f6bff]/10"
                        >
                          <Link href={`/admin/pricing/${plan.id}/edit`}>
                            <Edit2 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(plan)}
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(isOpen) => !isOpen && setDeleteTarget(null)}
        title="Delete Pricing Plan"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? It will no longer be visible on the public website.`}
        confirmText="Delete Plan"
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
