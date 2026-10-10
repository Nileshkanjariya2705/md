import React from 'react';
import { notFound } from 'next/navigation';
import { AdminHeader } from '@/components/admin/admin-header';
import { ProjectForm } from '@/components/admin/project-form';
import { getProjectById } from '@/features/projects/services/project.service';

export const dynamic = 'force-dynamic';

interface EditProjectProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title={`Edit: ${project.title}`}
        description="Update case study copy, technologies, gallery images, or publication status."
      />
      <div className="p-8 max-w-7xl">
        <ProjectForm initialData={project} isEdit />
      </div>
    </div>
  );
}
