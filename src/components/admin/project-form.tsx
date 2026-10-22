'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { projectSchema, ProjectFormData } from '@/features/projects/validations/project.schema';
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from '@/features/projects/hooks/use-projects-query';
import { Project, PROJECT_CATEGORIES } from '@/features/projects/types';
import { generateSlug } from '@/lib/utils/slug';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Wand2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const createMutation = useCreateProjectMutation();
  const updateMutation = useUpdateProjectMutation();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const [techInput, setTechInput] = useState(
    initialData ? initialData.technologies.join(', ') : ''
  );
  const [galleryInput, setGalleryInput] = useState(
    initialData && initialData.gallery ? initialData.gallery.join('\n') : ''
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(projectSchema) as any,
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      shortDescription: initialData?.shortDescription || '',
      description: initialData?.description || '',
      coverImage: initialData?.coverImage || '',
      category: initialData?.category || PROJECT_CATEGORIES[0],
      projectUrl: initialData?.projectUrl || '',
      githubUrl: initialData?.githubUrl || '',
      featured: initialData?.featured ?? false,
      isPublished: initialData?.isPublished ?? true,
      sortOrder: initialData?.sortOrder ?? 0,
      technologies: initialData?.technologies || ['Next.js', 'TypeScript', 'Tailwind CSS'],
      gallery: initialData?.gallery || [],
    },
  });

  const titleVal = watch('title');
  const isPublishedVal = watch('isPublished');
  const featuredVal = watch('featured');

  const handleAutoSlug = () => {
    if (titleVal) {
      setValue('slug', generateSlug(titleVal));
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const parsedTech = techInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const parsedGallery = galleryInput
        .split('\n')
        .map((g) => g.trim())
        .filter(Boolean);

      const payload = {
        ...data,
        technologies: parsedTech.length > 0 ? parsedTech : ['TypeScript'],
        gallery: parsedGallery,
      };

      if (isEdit && initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, data: payload });
        toast.success('Project updated successfully');
      } else {
        await createMutation.mutateAsync(payload);
        toast.success('Project created successfully');
      }
      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save project. Please check fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/projects"
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
            'Publish Project'
          )}
        </Button>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Basic Project Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Project Title *
            </label>
            <Input
              placeholder="e.g. Pulse Analytics Engine"
              {...register('title')}
              className={errors.title ? 'border-rose-500' : ''}
            />
            {errors.title && (
              <p className="text-xs text-rose-500">{errors.title.message}</p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                URL Slug *
              </label>
              <button
                type="button"
                onClick={handleAutoSlug}
                className="text-[11px] text-teal-600 hover:underline flex items-center gap-1 font-medium"
              >
                <Wand2 className="h-3 w-3" /> Auto from title
              </button>
            </div>
            <Input
              placeholder="pulse-analytics-engine"
              {...register('slug')}
              className={errors.slug ? 'border-rose-500' : ''}
            />
            {errors.slug && (
              <p className="text-xs text-rose-500">{errors.slug.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Category *
            </label>
            <select
              {...register('category')}
              className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-teal-600 focus:outline-none"
            >
              {PROJECT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
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

        {/* Short Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Short Description (Card Summary) *
          </label>
          <Input
            placeholder="Brief 1-2 sentence overview shown on catalog cards..."
            {...register('shortDescription')}
            className={errors.shortDescription ? 'border-rose-500' : ''}
          />
          {errors.shortDescription && (
            <p className="text-xs text-rose-500">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* Full Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Detailed Case Study Narrative *
          </label>
          <Textarea
            rows={6}
            placeholder="Detailed architecture description, client challenges, technical breakthroughs..."
            {...register('description')}
            className={errors.description ? 'border-rose-500' : ''}
          />
          {errors.description && (
            <p className="text-xs text-rose-500">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Media & Links */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Media Assets & External Links
        </h3>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Cover Image URL *
          </label>
          <Input
            placeholder="https://images.unsplash.com/photo-..."
            {...register('coverImage')}
            className={errors.coverImage ? 'border-rose-500' : ''}
          />
          {errors.coverImage && (
            <p className="text-xs text-rose-500">{errors.coverImage.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Gallery Image URLs (One URL per line)
          </label>
          <Textarea
            rows={3}
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Technologies (Comma separated) *
          </label>
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Next.js 16, TypeScript, Go, Tailwind CSS, Redis"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Live Product URL (Optional)
            </label>
            <Input
              type="url"
              placeholder="https://example.com"
              {...register('projectUrl')}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              GitHub Repository (Optional)
            </label>
            <Input
              type="url"
              placeholder="https://github.com/example/repo"
              {...register('githubUrl')}
            />
          </div>
        </div>
      </div>

      {/* Visibility Settings */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Publishing Controls
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Publish Status</h4>
            <p className="text-xs text-slate-500">
              When enabled, this project is visible to all visitors on the public portfolio.
            </p>
          </div>
          <Switch
            checked={isPublishedVal}
            onCheckedChange={(checked) => setValue('isPublished', checked)}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Feature on Home Page</h4>
            <p className="text-xs text-slate-500">
              Highlighted in the featured projects section on the home page.
            </p>
          </div>
          <Switch
            checked={featuredVal}
            onCheckedChange={(checked) => setValue('featured', checked)}
          />
        </div>
      </div>
    </form>
  );
}
