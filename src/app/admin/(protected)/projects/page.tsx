import React from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { ProjectsTable } from '@/components/admin/projects-table';
import { getAllProjects } from '@/features/projects/services/project.service';

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title="Projects & Case Studies"
        description="Manage, feature, and publish enterprise case studies on the public website."
      />
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <ProjectsTable initialProjects={projects} />
      </div>
    </div>
  );
}
