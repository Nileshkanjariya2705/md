'use client';

import React, { useState, useMemo } from 'react';
import { TeamMember } from '@/features/team/types';
import { useActiveTeamQuery } from '@/features/team/hooks/use-team-query';
import { TeamCard } from './team-card';
import { cn } from '@/lib/utils/cn';
import { Users, Search, Sparkles } from 'lucide-react';

interface TeamGridProps {
  initialTeam: TeamMember[];
}

export function TeamGrid({ initialTeam }: TeamGridProps) {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: team = initialTeam } = useActiveTeamQuery(initialTeam);

  const departments = useMemo(() => {
    const depts = new Set<string>();
    team.forEach((m) => {
      if (m.department) depts.add(m.department);
    });
    return ['All', ...Array.from(depts)];
  }, [team]);

  const filteredTeam = useMemo(() => {
    return team.filter((member) => {
      const matchesDept = selectedDept === 'All' || member.department === selectedDept;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.designation.toLowerCase().includes(q) ||
        member.bio.toLowerCase().includes(q) ||
        (member.skills && member.skills.some((s) => s.toLowerCase().includes(q)));
      return matchesDept && matchesSearch;
    });
  }, [initialTeam, selectedDept, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Department Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
        {/* Department Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {departments.map((dept) => {
            const isSelected = selectedDept === dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 border',
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                )}
              >
                {dept}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, role, skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Counter bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 max-w-5xl mx-auto px-2">
        <span className="font-semibold text-slate-700">
          Showing {filteredTeam.length} of {team.length} team specialists
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-teal-600 hover:underline font-medium"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredTeam.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredTeam.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center max-w-md mx-auto shadow-sm">
          <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Team Members Found</h3>
          <p className="text-sm text-slate-500 mb-6">
            We couldn&apos;t find any specialists matching your filter or search query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDept('All');
              setSearchQuery('');
            }}
            className="rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-teal-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
