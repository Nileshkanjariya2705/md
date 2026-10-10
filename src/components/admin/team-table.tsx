'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TeamMember } from '@/features/team/types';
import {
  useAllTeamQuery,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} from '@/features/team/hooks/use-team-query';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from './confirm-dialog';
import { Edit2, Trash2, Search, Plus, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/icons';

interface TeamTableProps {
  initialMembers: TeamMember[];
}

export function TeamTable({ initialMembers }: TeamTableProps) {
  const router = useRouter();
  const { data: members = initialMembers } = useAllTeamQuery(initialMembers);
  const updateMutation = useUpdateTeamMemberMutation();
  const deleteMutation = useDeleteTeamMemberMutation();

  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.designation.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      const next = !current;
      await updateMutation.mutateAsync({ id, data: { isActive: next } });
      toast.success(`Team member ${next ? 'activated' : 'deactivated'}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update member status');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Team member removed');
      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete team member');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name or designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>

        <Button asChild className="w-full sm:w-auto rounded-xl">
          <Link href="/admin/team/new" className="gap-2">
            <Plus className="h-4 w-4" /> Add Team Member
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Photo</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Social Links</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead className="text-center">Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-500">
                  No team members matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-slate-900 block">
                      {member.name}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-teal-600 font-semibold uppercase">
                    {member.designation}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-slate-500">
                      {member.linkedinUrl && <LinkedinIcon className="h-3.5 w-3.5" />}
                      {member.githubUrl && <GithubIcon className="h-3.5 w-3.5" />}
                      {member.websiteUrl && <Globe className="h-3.5 w-3.5" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-mono text-xs text-slate-500">
                    {member.sortOrder}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={member.isActive}
                        onCheckedChange={() =>
                          handleToggleActive(member.id, member.isActive)
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/team/${member.id}/edit`}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Edit Member"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(member)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                        title="Delete Member"
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
        title="Delete Team Member"
        description={`Are you sure you want to remove "${deleteTarget?.name}"?`}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
