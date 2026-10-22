'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ClientReview } from '@/features/reviews/types';
import {
  useAllReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from '@/features/reviews/hooks/use-reviews-query';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from './confirm-dialog';
import { Edit2, Trash2, Search, Plus, Star } from 'lucide-react';

interface ReviewsTableProps {
  initialReviews: ClientReview[];
}

export function ReviewsTable({ initialReviews }: ReviewsTableProps) {
  const router = useRouter();
  const { data: reviews = initialReviews } = useAllReviewsQuery(initialReviews);
  const updateMutation = useUpdateReviewMutation();
  const deleteMutation = useDeleteReviewMutation();

  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ClientReview | null>(null);

  const filtered = reviews.filter((r) =>
    r.clientName.toLowerCase().includes(search.toLowerCase()) ||
    r.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const handleTogglePublish = async (id: string, current: boolean) => {
    try {
      const next = !current;
      await updateMutation.mutateAsync({ id, data: { isPublished: next } });
      toast.success(`Review ${next ? 'published' : 'unpublished'}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update review status');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Review removed');
      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete review');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by client or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>

        <Button asChild className="w-full sm:w-auto rounded-xl">
          <Link href="/admin/reviews/new" className="gap-2">
            <Plus className="h-4 w-4" /> Add Review
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client & Company</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review Excerpt</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead className="text-center">Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                  No reviews matching search.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((rev) => (
                <TableRow key={rev.id}>
                  <TableCell>
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {rev.clientName}
                      </span>
                      <span className="text-xs text-slate-500">
                        {rev.designation} • <span className="text-[#2f6bff] font-semibold">{rev.companyName}</span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < rev.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-xs text-slate-600 truncate italic">
                      &ldquo;{rev.review}&rdquo;
                    </p>
                  </TableCell>
                  <TableCell className="text-center font-mono text-xs text-slate-500">
                    {rev.sortOrder}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={rev.isPublished}
                        onCheckedChange={() =>
                          handleTogglePublish(rev.id, rev.isPublished)
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/reviews/${rev.id}/edit`}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Edit Review"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(rev)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                        title="Delete Review"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Client Review"
        description={`Are you sure you want to delete the testimonial from "${deleteTarget?.clientName}"?`}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
