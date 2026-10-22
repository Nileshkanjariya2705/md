'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ContactMessage, MessageStatus, MESSAGE_STATUSES } from '@/features/contact/types';
import {
  useMessagesQuery,
  useUpdateMessageStatusMutation,
  useDeleteMessageMutation,
} from '@/features/contact/hooks/use-messages-query';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { ConfirmDialog } from './confirm-dialog';
import { formatDate } from '@/lib/utils/date';
import { Trash2, Search, Mail, Phone, Clock, Eye } from 'lucide-react';

interface MessagesTableProps {
  initialMessages: ContactMessage[];
}

export function MessagesTable({ initialMessages }: MessagesTableProps) {
  const router = useRouter();
  const { data: messages = initialMessages } = useMessagesQuery(initialMessages);
  const updateStatusMutation = useUpdateMessageStatusMutation();
  const deleteMutation = useDeleteMessageMutation();

  const [search, setSearch] = useState('');
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = async (id: string, newStatus: MessageStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: newStatus });
      if (activeMessage && activeMessage.id === id) {
        setActiveMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      toast.success(`Message marked as ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      if (activeMessage?.id === deleteTarget.id) {
        setActiveMessage(null);
      }
      toast.success('Inquiry deleted');
      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete message');
    }
  };

  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case 'NEW':
        return <Badge variant="default">NEW</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="warning">IN PROGRESS</Badge>;
      case 'RESOLVED':
        return <Badge variant="success">RESOLVED</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search by sender, email or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>

      <p className="text-[11px] text-slate-400 md:hidden flex items-center gap-1.5 px-1">
        <span>↔</span> Swipe table horizontally to view full message subjects & status
      </p>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead>Sender Details</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-slate-500">
                  No contact submissions found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell>
                    <div>
                      <span className="font-bold text-slate-900 block">{msg.name}</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-teal-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        <Mail className="h-3 w-3" /> {msg.email}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-slate-900 block">
                      {msg.subject}
                    </span>
                    <span className="text-xs text-slate-500 line-clamp-1">
                      {msg.message}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(msg.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <select
                      value={msg.status}
                      onChange={(e) =>
                        handleStatusChange(msg.id, e.target.value as MessageStatus)
                      }
                      className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none"
                    >
                      {MESSAGE_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMessage(msg);
                          if (msg.status === 'NEW') {
                            handleStatusChange(msg.id, 'READ');
                          }
                        }}
                        className="p-2 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-slate-100 transition-colors"
                        title="View Full Message"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(msg)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                        title="Delete Message"
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

      {/* Detail Dialog */}
      <Dialog
        open={!!activeMessage}
        onOpenChange={(open) => !open && setActiveMessage(null)}
        title={activeMessage?.subject}
        description={`From: ${activeMessage?.name} (${activeMessage?.email})`}
      >
        {activeMessage && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {formatDate(activeMessage.createdAt)}
              </span>
              {activeMessage.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {activeMessage.phone}
                </span>
              )}
              <div>{getStatusBadge(activeMessage.status)}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {activeMessage.message}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <a
                href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(
                  activeMessage.subject
                )}`}
                className="text-xs text-teal-600 font-bold hover:underline flex items-center gap-1"
              >
                <Mail className="h-3.5 w-3.5" /> Direct Reply via Email
              </a>

              <select
                value={activeMessage.status}
                onChange={(e) =>
                  handleStatusChange(activeMessage.id, e.target.value as MessageStatus)
                }
                className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700"
              >
                {MESSAGE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    Mark {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Message"
        description={`Are you sure you want to delete the message from "${deleteTarget?.name}"?`}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
