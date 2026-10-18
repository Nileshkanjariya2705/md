import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { TeamCard } from '@/components/team/team-card';
import { Button } from '@/components/ui/button';
import { MobileCardScroll } from '@/components/ui/mobile-card-scroll';
import { ArrowRight } from 'lucide-react';
import { TeamMember } from '@/features/team/types';

interface TeamPreviewProps {
  team: TeamMember[];
}

export function TeamPreview({ team }: TeamPreviewProps) {
  return (
    <section id="team" className="py-24 bg-slate-50/60 relative scroll-mt-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            badge="Leadership"
            title="The Minds Behind Magnovaa"
            description="Our leadership team combines deep technical expertise from premier engineering organizations with a relentless passion for perfection."
            align="left"
            className="mb-0 max-w-2xl"
          />
          <div className="mt-6 md:mt-0">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/team" className="gap-2">
                Meet Full Team <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <MobileCardScroll gridClassName="md:grid-cols-3 md:gap-8">
          {team.slice(0, 3).map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </MobileCardScroll>

        {/* Explore More Team Button */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-xl px-8 shadow-sm">
            <Link href="/team" className="gap-2">
              Explore More Team Members <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
