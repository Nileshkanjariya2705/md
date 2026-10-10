import React from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { TeamForm } from '@/components/admin/team-form';

export default function NewTeamMemberPage() {
  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title="Add Team Member"
        description="Create a new leadership profile to display on the company roster."
      />
      <div className="p-8 max-w-7xl">
        <TeamForm />
      </div>
    </div>
  );
}
