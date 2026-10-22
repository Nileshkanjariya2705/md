'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { teamMemberSchema, TeamMemberFormData } from '@/features/team/validations/team.schema';
import {
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
} from '@/features/team/hooks/use-team-query';
import { TeamMember } from '@/features/team/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface TeamFormProps {
  initialData?: TeamMember;
  isEdit?: boolean;
}

export function TeamForm({ initialData, isEdit = false }: TeamFormProps) {
  const router = useRouter();
  const createMutation = useCreateTeamMemberMutation();
  const updateMutation = useUpdateTeamMemberMutation();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TeamMemberFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(teamMemberSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      designation: initialData?.designation || '',
      bio: initialData?.bio || '',
      photo: initialData?.photo || '',
      linkedinUrl: initialData?.linkedinUrl || '',
      githubUrl: initialData?.githubUrl || '',
      websiteUrl: initialData?.websiteUrl || '',
      sortOrder: initialData?.sortOrder ?? 0,
      isActive: initialData?.isActive ?? true,
    },
  });

  const isActiveVal = watch('isActive');

  const onSubmit = async (data: TeamMemberFormData) => {
    try {
      if (isEdit && initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, data });
        toast.success('Team member profile updated');
      } else {
        await createMutation.mutateAsync(data);
        toast.success('Team member added successfully');
      }
      router.push('/admin/team');
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save team member');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/team"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Cancel & Return
        </Link>
        <Button type="submit" disabled={isSubmitting} className="rounded-xl">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-1" /> Saving...
            </>
          ) : isEdit ? (
            'Save Changes'
          ) : (
            'Add Team Member'
          )}
        </Button>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Member Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Full Name *
            </label>
            <Input
              placeholder="Alexander Chen"
              {...register('name')}
              className={errors.name ? 'border-rose-500' : ''}
            />
            {errors.name && (
              <p className="text-xs text-rose-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Designation / Role *
            </label>
            <Input
              placeholder="Chief Technology Officer"
              {...register('designation')}
              className={errors.designation ? 'border-rose-500' : ''}
            />
            {errors.designation && (
              <p className="text-xs text-rose-500">
                {errors.designation.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Professional Bio *
          </label>
          <Textarea
            rows={4}
            placeholder="1-2 paragraphs highlighting background, experience, and domain expertise..."
            {...register('bio')}
            className={errors.bio ? 'border-rose-500' : ''}
          />
          {errors.bio && (
            <p className="text-xs text-rose-500">{errors.bio.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Photo URL *
            </label>
            <Input
              placeholder="https://images.unsplash.com/photo-..."
              {...register('photo')}
              className={errors.photo ? 'border-rose-500' : ''}
            />
            {errors.photo && (
              <p className="text-xs text-rose-500">{errors.photo.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Sort Order (Ascending)
            </label>
            <Input
              type="number"
              {...register('sortOrder', { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Social & Portfolio Links
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              LinkedIn URL
            </label>
            <Input
              type="url"
              placeholder="https://linkedin.com/in/..."
              {...register('linkedinUrl')}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              GitHub URL
            </label>
            <Input
              type="url"
              placeholder="https://github.com/..."
              {...register('githubUrl')}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Personal Website
            </label>
            <Input
              type="url"
              placeholder="https://alexander.dev"
              {...register('websiteUrl')}
            />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Active Status</h4>
            <p className="text-xs text-slate-500">
              Enable to showcase this member on the public team page and leadership previews.
            </p>
          </div>
          <Switch
            checked={isActiveVal}
            onCheckedChange={(checked) => setValue('isActive', checked)}
          />
        </div>
      </div>
    </form>
  );
}
