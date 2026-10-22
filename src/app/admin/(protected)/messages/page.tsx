import React from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { MessagesTable } from '@/components/admin/messages-table';
import { getAllMessages } from '@/features/contact/services/contact.service';

export default async function AdminMessagesPage() {
  const messages = await getAllMessages();

  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title="Contact Messages & Inquiries"
        description="Review inbound client leads, change workflow statuses, and respond directly."
      />
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <MessagesTable initialMessages={messages} />
      </div>
    </div>
  );
}
