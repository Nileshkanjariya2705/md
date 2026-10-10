import React from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FolderKanban,
  Users,
  Star,
  MessageSquare,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { getAllProjects } from '@/features/projects/services/project.service';
import { getAllTeamMembers } from '@/features/team/services/team.service';
import { getAllReviews } from '@/features/reviews/services/review.service';
import { getAllMessages } from '@/features/contact/services/contact.service';
import { getAllPricingPlans } from '@/features/pricing/services/pricing.service';
import { formatDate } from '@/lib/utils/date';

export default async function AdminDashboardPage() {
  const [projects, teamMembers, reviews, messages, pricingPlans] = await Promise.all([
    getAllProjects(),
    getAllTeamMembers(),
    getAllReviews(),
    getAllMessages(),
    getAllPricingPlans(),
  ]);

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      detail: `${projects.filter((p) => p.isPublished).length} Published`,
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'text-teal-400',
    },
    {
      label: 'Pricing Plans',
      value: pricingPlans.length,
      detail: `${pricingPlans.filter((p) => p.isActive).length} Live on Web`,
      icon: CreditCard,
      href: '/admin/pricing',
      color: 'text-indigo-400',
    },
    {
      label: 'Team Members',
      value: teamMembers.length,
      detail: `${teamMembers.filter((m) => m.isActive).length} Active`,
      icon: Users,
      href: '/admin/team',
      color: 'text-cyan-400',
    },
    {
      label: 'Client Reviews',
      value: reviews.length,
      detail: `${reviews.filter((r) => r.isPublished).length} Published`,
      icon: Star,
      href: '/admin/reviews',
      color: 'text-amber-400',
    },
    {
      label: 'Contact Messages',
      value: messages.length,
      detail: `${messages.filter((m) => m.status === 'NEW').length} New`,
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'text-emerald-400',
    },
  ];

  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title="Dashboard Overview"
        description="System health, content metrics, and administrative quick actions."
        action={
          <Button asChild size="sm" className="rounded-xl">
            <Link href="/admin/projects/new" className="gap-1.5">
              <Plus className="h-4 w-4" /> New Project
            </Link>
          </Button>
        }
      />

      <div className="p-8 space-y-8 max-w-7xl">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={idx}
                className="p-6 border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                    {stat.label}
                  </span>
                  <div className={`p-2 rounded-xl bg-slate-100 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                    <span>{stat.detail}</span>
                    <Link
                      href={stat.href}
                      className="text-teal-600 hover:underline font-semibold"
                    >
                      Manage →
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions Bar */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-teal-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Direct Content Publishing</h3>
              <p className="text-xs text-slate-500">Instantly append records to the live public site.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="secondary" size="sm" className="rounded-xl">
              <Link href="/admin/projects/new">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Project
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm" className="rounded-xl">
              <Link href="/admin/team/new">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Team Member
              </Link>
            </Button>
            <Button asChild variant="secondary" size="sm" className="rounded-xl">
              <Link href="/admin/reviews/new">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Review
              </Link>
            </Button>
          </div>
        </div>

        {/* Two-Column Grid: Recent Projects & Recent Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <Card className="p-6 border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-teal-600" />
                Recent Projects
              </h3>
              <Link
                href="/admin/projects"
                className="text-xs font-semibold text-teal-600 hover:underline"
              >
                View all ({projects.length})
              </Link>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 5).map((proj) => (
                <div
                  key={proj.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-0.5 overflow-hidden pr-3">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {proj.category} • Order: {proj.sortOrder}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant={proj.isPublished ? 'success' : 'outline'}
                      className="text-[10px]"
                    >
                      {proj.isPublished ? 'Live' : 'Draft'}
                    </Badge>
                    <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Link href={`/admin/projects/${proj.id}/edit`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Contact Inquiries */}
          <Card className="p-6 border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
                Incoming Inquiries
              </h3>
              <Link
                href="/admin/messages"
                className="text-xs font-semibold text-teal-600 hover:underline"
              >
                View all ({messages.length})
              </Link>
            </div>

            <div className="space-y-3">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No incoming contact submissions yet.
                </div>
              ) : (
                messages.slice(0, 5).map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {msg.name} ({msg.email})
                      </span>
                      <Badge
                        variant={msg.status === 'NEW' ? 'default' : 'secondary'}
                        className="text-[10px]"
                      >
                        {msg.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">
                      Subject: {msg.subject}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {msg.message}
                    </p>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(msg.createdAt)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
