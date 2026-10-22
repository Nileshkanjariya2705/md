import React from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { TeamTable } from '@/components/admin/team-table';
import { getAllTeamMembers } from '@/features/team/services/team.service';

export default async function AdminTeamPage() {
  const members = await getAllTeamMembers();

  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title="Team Members & Leadership"
        description="Manage the company roster, designations, bios, and public visibility."
      />
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <TeamTable initialMembers={members} />
      </div>
    </div>
  );
}
