'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Project } from '@/features/projects/types';
import {
  useAllProjectsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from '@/features/projects/hooks/use-projects-query';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ConfirmDialog } from './confirm-dialog';
import { Edit2, Trash2, ExternalLink, Search, Plus, Star } from 'lucide-react';

interface ProjectsTableProps {
  initialProjects: Project[];
}

export function ProjectsTable({ initialProjects }: ProjectsTableProps) {
  const router = useRouter();
  const { data: projects = initialProjects } = useAllProjectsQuery(initialProjects);
  const updateMutation = useUpdateProjectMutation();
  const deleteMutation = useDeleteProjectMutation();

  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleTogglePublish = async (id: string, current: boolean) => {
    try {
      const next = !current;
      await updateMutation.mutateAsync({ id, data: { isPublished: next } });
      toast.success(`Project ${next ? 'published' : 'unpublished'}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update publish state');
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      const next = !current;
      await updateMutation.mutateAsync({ id, data: { featured: next } });
      toast.success(`Project ${next ? 'marked as featured' : 'unfeatured'}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update featured state');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Project deleted successfully');
      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search projects by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>

        <Button asChild className="w-full sm:w-auto rounded-xl">
          <Link href="/admin/projects/new" className="gap-2">
            <Plus className="h-4 w-4" /> Create New Project
          </Link>
        </Button>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Cover</TableHead>
              <TableHead>Project Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-center">Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-500">
                  No projects matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="relative h-10 w-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {project.title}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        /{project.slug}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-mono text-xs text-slate-500">
                    {project.sortOrder}
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(project.id, project.featured)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        project.featured
                          ? 'text-amber-500 bg-amber-50'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={project.featured ? 'Featured' : 'Not featured'}
                    >
                      <Star className={`h-4 w-4 ${project.featured ? 'fill-amber-400' : ''}`} />
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={project.isPublished}
                        onCheckedChange={() =>
                          handleTogglePublish(project.id, project.isPublished)
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-slate-400 hover:text-[#2f6bff] hover:bg-slate-100 transition-colors"
                        title="View Public Case Study"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(project)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                        title="Delete Project"
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

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Project"
        description={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
