import React from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { ProjectForm } from '@/components/admin/project-form';

export default function NewProjectPage() {
  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title="Create New Project"
        description="Add a new enterprise case study to your portfolio showcase."
      />
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <ProjectForm />
      </div>
    </div>
  );
}
