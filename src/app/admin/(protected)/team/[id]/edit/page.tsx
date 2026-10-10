import React from 'react';
import { notFound } from 'next/navigation';
import { AdminHeader } from '@/components/admin/admin-header';
import { TeamForm } from '@/components/admin/team-form';
import { getTeamMemberById } from '@/features/team/services/team.service';

export const dynamic = 'force-dynamic';

interface EditTeamProps {
  params: Promise<{ id: string }>;
}

export default async function EditTeamMemberPage({ params }: EditTeamProps) {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title={`Edit: ${member.name}`}
        description="Update role title, bio, photo URL, or active visibility status."
      />
      <div className="p-8 max-w-7xl">
        <TeamForm initialData={member} isEdit />
      </div>
    </div>
  );
}
