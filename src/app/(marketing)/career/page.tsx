import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CTASection } from '@/components/sections/cta-section';
import {
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Laptop,
  GraduationCap,
  Globe,
  DollarSign,
  Coffee,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Careers & Opportunities',
  description:
    'Join our elite team of engineers, architects, and product designers building high-concurrency systems, AI engines, and enterprise software.',
  alternates: {
    canonical: 'https://magnovaa.com/career',
  },
  openGraph: {
    title: 'Engineering Careers & Opportunities | Magnovaa Technology',
    description:
      'Join our elite team of engineers, architects, and product designers building high-concurrency systems, AI engines, and enterprise software.',
    url: 'https://magnovaa.com/career',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Careers & Opportunities | Magnovaa Technology',
    description:
      'Join our elite team of engineers, architects, and product designers building high-concurrency systems, AI engines, and enterprise software.',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://magnovaa.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Career',
      item: 'https://magnovaa.com/career',
    },
  ],
};

const BENEFITS = [
  {
    icon: Globe,
    title: 'Work From Anywhere',
    description: '100% remote-first culture. Work from whichever timezone or environment maximizes your creative focus.',
  },
  {
    icon: DollarSign,
    title: 'Top-Tier Compensation & Equity',
    description: 'Top 5% market compensation benchmarks along with meaningful equity ownership in the firm.',
  },
  {
    icon: Laptop,
    title: '$3,500 Home Lab & Gear Budget',
    description: 'We fund your preferred hardware setup: M3 Max MacBooks, ergonomic chairs, 4K displays, and audio.',
  },
  {
    icon: GraduationCap,
    title: '$2,500 Annual Learning Stipend',
    description: 'Continuous growth allowance for top engineering conferences, technical books, and advanced courses.',
  },
  {
    icon: Heart,
    title: 'Premium Healthcare & Wellness',
    description: 'Comprehensive medical, dental, and vision insurance plus monthly fitness and mental wellness stipends.',
  },
  {
    icon: Coffee,
    title: 'True Autonomy, Zero Red Tape',
    description: 'No endless status meetings or bureaucratic roadblocks. Direct code ownership and rapid release cycles.',
  },
];

const OPEN_ROLES = [
  {
    id: 'cloud-architect',
    title: 'Principal Cloud & Distributed Systems Architect',
    department: 'Infrastructure & Platforms',
    location: 'Worldwide Remote',
    type: 'Full-time',
    experience: '8+ Years',
    description:
      'Lead the architecture of fault-tolerant multi-region cloud infrastructures across AWS/GCP with automated Kubernetes orchestration and 99.99% SLAs.',
    requirements: [
      'Deep mastery of distributed systems, Raft consensus, and event streaming (Kafka/Pulsar)',
      'Expertise in Kubernetes internals, Helm, Terraform, and service meshes (Istio)',
      'Proven track record scaling backends beyond 1M requests/minute',
    ],
  },
  {
    id: 'sr-fullstack',
    title: 'Senior Full-Stack Engineer (Next.js / TypeScript)',
    department: 'Engineering',
    location: 'Worldwide Remote',
    type: 'Full-time',
    experience: '5+ Years',
    description:
      'Build ultra-fast, beautifully designed web applications using Next.js 16, React 19, TypeScript, and high-performance serverless backbones.',
    requirements: [
      'Advanced TypeScript, React Server Components, and Web Performance profiling',
      'Strong eye for UI craft, micro-interactions, and accessibility standards',
      'Solid experience with Node.js/Go backend services and SQL/NoSQL databases',
    ],
  },
  {
    id: 'ai-engineer',
    title: 'Lead Generative AI & Autonomous Agent Engineer',
    department: 'Artificial Intelligence',
    location: 'Worldwide Remote',
    type: 'Full-time',
    experience: '4+ Years',
    description:
      'Design proprietary multi-agent workflows, stateful LangChain/LlamaIndex pipelines, vector retrieval engines, and fine-tuned open-weight LLMs.',
    requirements: [
      'Deep experience in Python, PyTorch, LangGraph, and Vector Databases (Pinecone/Milvus)',
      'Hands-on expertise deploying fine-tuned models with vLLM, TensorRT-LLM, and Ollama',
      'Strong understanding of RAG evaluation metrics, synthetic benchmarks, and guardrails',
    ],
  },
  {
    id: 'design-lead',
    title: 'Senior Product Designer & Design Systems Lead',
    department: 'Design',
    location: 'Worldwide Remote',
    type: 'Full-time',
    experience: '5+ Years',
    description:
      'Define visual design languages, atomic Figma tokens, and premium micro-interactions across enterprise desktop and mobile platforms.',
    requirements: [
      'Exceptional portfolio demonstrating state-of-the-art web UI and fluid motion',
      'Mastery of Figma component architecture, variables, and design tokens',
      'Familiarity with React/Tailwind code translation and developer handoff',
    ],
  },
  {
    id: 'sre-devops',
    title: 'Senior Site Reliability & Security Engineer',
    department: 'Infrastructure',
    location: 'Worldwide Remote',
    type: 'Full-time',
    experience: '5+ Years',
    description:
      'Establish enterprise zero-trust security postures, automated CI/CD gating, observability monitoring (Prometheus/Datadog), and automated failovers.',
    requirements: [
      'Hands-on experience with SOC2/HIPAA compliance frameworks and threat modeling',
      'Expertise in container security, secrets management (Vault), and eBPF observability',
      'Fluency in shell scripting, Python, and Go for platform tooling automation',
    ],
  },
];

export default function CareerPage() {
  return (
    <div className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container>
        {/* Page Hero */}
        <SectionHeading
          as="h1"
          badge="Careers at Magnovaa Technology"
          title="Build the Future of High-Scale Systems"
          description="We are an elite, highly autonomous collective of technologists solving hard distributed systems, AI, and design challenges. We do not do mundane work."
        />

        {/* Benefits & Perks */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2f6bff]">
              Why Engineers Choose Magnovaa
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14233a] mt-2">
              Built for Builder Autonomy & Well-being
            </h3>
            <p className="text-sm text-[#64748b] mt-2">
              We treat engineers as creative founders, providing every resource to do your life&apos;s best work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-xs hover:border-[#2f6bff]/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#2f6bff]/8 text-[#2f6bff] flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#14233a] mb-2">{benefit.title}</h4>
                  <p className="text-sm text-[#64748b] leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Positions List */}
        <div className="space-y-8" id="open-roles">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2f6bff]">
                Join The Squad
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14233a] mt-1">
                Open Engineering & Design Positions
              </h3>
            </div>
            <p className="text-sm text-slate-500 mt-2 md:mt-0 font-medium">
              Showing {OPEN_ROLES.length} active openings
            </p>
          </div>

          <div className="space-y-6">
            {OPEN_ROLES.map((role) => (
              <Card
                key={role.id}
                className="p-8 sm:p-10 border-slate-200/90 bg-white hover:border-[#2f6bff]/40 hover:shadow-xl transition-all duration-300 rounded-3xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="rounded-full bg-[#2f6bff]/8 text-[#2f6bff] border border-[#2f6bff]/20 px-3 py-1 text-xs font-bold">
                        {role.department}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {role.location}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {role.type}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {role.experience}
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-[#14233a] hover:text-[#2f6bff] transition-colors">
                      {role.title}
                    </h4>
                  </div>

                  <Button asChild size="lg" className="rounded-full shrink-0 shadow-sm">
                    <Link href={`/contact?subject=${encodeURIComponent(`Career Application: ${role.title}`)}`}>
                      Apply For Role <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>

                <div className="pt-6">
                  <p className="text-sm text-[#64748b] leading-relaxed mb-6">
                    {role.description}
                  </p>

                  <div className="space-y-2.5">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Key Capabilities Looked For
                    </h5>
                    {role.requirements.map((req, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-[#2f6bff] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* General Application Banner */}
        <div className="mt-16 rounded-3xl border border-slate-800 bg-gradient-to-b from-[#14233a] to-[#0b1320] text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-[#2f6bff]/20 blur-[90px] rounded-full" />
          <div className="relative z-10 max-w-2xl">
            <h4 className="text-2xl font-bold tracking-tight mb-3">
              Don&apos;t see your exact role listed?
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              We are constantly scouting for exceptional minds in distributed infrastructure, generative AI research, and compiler engineering. Send us your GitHub, portfolio, or proudest project.
            </p>
            <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 text-white hover:bg-white/10 hover:border-white/40">
              <Link href="/contact?subject=General+Engineering+Application">
                Send Speculative Pitch <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>

      {/* CTA */}
      <div className="mt-20">
        <CTASection />
      </div>
    </div>
  );
}
