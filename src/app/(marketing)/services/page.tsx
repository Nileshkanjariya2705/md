import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CTASection } from '@/components/sections/cta-section';
import {
  Code2,
  BrainCircuit,
  Cloud,
  Smartphone,
  Palette,
  Database,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Coffee,
  Globe,
  Cpu,
  Sparkles,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering & Technology Services | MD Technologies',
  description:
    'Full-cycle software engineering across Node.js/React, Python & AI/ML, React Native, .NET, Java, WordPress, Laravel, DevOps, and UI/UX design.',
};

const SERVICES_DETAILED = [
  {
    id: 'node-react',
    number: '01',
    icon: Code2,
    badge: 'Full-Stack JavaScript',
    title: 'Node.js / React.js Web Development',
    headline: 'High-Throughput Modern Web Platforms & Scalable SaaS',
    description:
      'We build lightning-fast, fault-tolerant web applications and enterprise SaaS platforms using React.js 19 and Node.js. Optimized for sub-second Core Web Vitals, ultra-low latency, and resilient multi-tenant architecture that drives conversions.',
    deliverables: [
      'Reactive Next.js single-page applications & fluid SSR architectures',
      'Real-time WebSockets, streaming APIs & live interactive dashboards',
      'High-concurrency state management & micro-frontend architectures',
      'Enterprise RBAC security, zero-trust authentication & automated testing',
    ],
    tech: ['Node.js', 'React.js 19', 'Next.js 15', 'Express', 'TypeScript', 'TailwindCSS'],
  },
  {
    id: 'python-ai',
    number: '02',
    icon: BrainCircuit,
    badge: 'Generative AI & ML',
    title: 'Python & AI/ML Development',
    headline: 'Autonomous AI Agents, Custom LLMs & Predictive Analytics',
    description:
      'Harness artificial intelligence to automate mission-critical operations and discover actionable predictive intelligence. We engineer bespoke RAG pipelines, multi-agent reasoning workflows, and production-grade Python microservices.',
    deliverables: [
      'Private & secure enterprise RAG (Retrieval-Augmented Generation) systems',
      'Domain-tuned AI copilots and autonomous multi-agent task workflows',
      'Predictive analytics, NLP sentiment analysis & recommendation engines',
      'Scalable inference backends with FastAPI, PyTorch, and vector databases',
    ],
    tech: ['Python 3.12', 'PyTorch', 'LangChain', 'OpenAI API', 'FastAPI', 'Pinecone', 'vLLM'],
  },
  {
    id: 'react-native',
    number: '03',
    icon: Smartphone,
    badge: 'Cross-Platform Mobile',
    title: 'React Native Mobile Development',
    headline: 'Fluid 120Hz iOS & Android Apps from a Unified Codebase',
    description:
      'Launch top-ranking mobile applications on the Apple App Store and Google Play in half the time. We deliver smooth 60–120 FPS gestures, offline-first synchronization, push notification infrastructures, and biometric security.',
    deliverables: [
      'Single codebase cuts development & maintenance costs by 40%+',
      'Native device performance, biometric hardware & GPS integrations',
      'Offline-first data caching and zero-latency local sync (WatermelonDB)',
      'Automated App Store & Google Play publishing with instant OTA updates',
    ],
    tech: ['React Native', 'Expo', 'TypeScript', 'iOS', 'Android', 'Redux Toolkit', 'Fastlane'],
  },
  {
    id: 'dotnet',
    number: '04',
    icon: Layers,
    badge: 'Enterprise Architecture',
    title: '.NET Development',
    headline: 'High-Capacity Enterprise Backends & Secure Cloud Systems',
    description:
      'High-performance, mission-critical enterprise systems engineered with C# and .NET 8/9. Built for fintech, logistics, and healthcare organizations demanding ironclad security, ACID compliance, and seamless Microsoft Azure scaling.',
    deliverables: [
      'Sub-millisecond API processing speeds with ASP.NET Core & Kestrel',
      'Enterprise-grade encryption, HIPAA, SOC2 & GDPR regulatory compliance',
      'Resilient event-driven microservices with MassTransit & RabbitMQ',
      'Seamless Microsoft Azure Cloud & SQL Server enterprise integrations',
    ],
    tech: ['C#', '.NET 8/9', 'ASP.NET Core', 'Entity Framework', 'Azure Cloud', 'SQL Server'],
  },
  {
    id: 'java',
    number: '05',
    icon: Coffee,
    badge: 'High-Concurrency Banking',
    title: 'Java Development',
    headline: 'Bulletproof Banking, Telemetry & Distributed Microservices',
    description:
      'Enterprise-scale, fault-tolerant backends engineered with modern Java 21+ and Spring Boot. Built to reliably process millions of daily transactions, high-frequency data pipelines, and zero-downtime distributed microservices.',
    deliverables: [
      'Ultra-low latency virtual threads handling 100k+ concurrent requests',
      'Production-grade Spring Boot 3 & Spring Cloud microservices architectures',
      'Ironclad transactional integrity with Apache Kafka & PostgreSQL clusters',
      'Proven fault isolation trusted by global financial institutions',
    ],
    tech: ['Java 21', 'Spring Boot 3', 'Hibernate', 'Apache Kafka', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'wordpress',
    number: '06',
    icon: Globe,
    badge: 'CMS & E-Commerce',
    title: 'WordPress Development',
    headline: 'Custom High-Converting Websites, Headless WP & WooCommerce',
    description:
      'Elevate beyond generic templates. We build bespoke, lightweight WordPress and WooCommerce solutions featuring custom Gutenberg blocks, Headless Next.js architectures, 95+ PageSpeed scores, and airtight security hardening.',
    deliverables: [
      '100% custom theme and plugin engineering tailored to your brand identity',
      '95+ Google PageSpeed & Core Web Vitals optimization for maximum SEO rank',
      'High-converting WooCommerce stores with custom checkouts & payment gateways',
      'Enterprise security hardening against malware, brute force, and DDoS attacks',
    ],
    tech: ['WordPress', 'WooCommerce', 'ACF Pro', 'PHP 8', 'Next.js', 'MySQL', 'Redis'],
  },
  {
    id: 'php-laravel',
    number: '07',
    icon: Database,
    badge: 'Rapid SaaS Architecture',
    title: 'PHP & Laravel Development',
    headline: 'Clean MVC Architectures, Custom Portals & Scalable REST APIs',
    description:
      'Accelerate your time-to-market with elegant, maintainable web applications built on Laravel 11 and modern PHP 8.3. We build custom portals, multi-tenant SaaS platforms, and API backbones with automated queue workers and testing.',
    deliverables: [
      'Rapid SaaS feature rollout with Laravel 11, Livewire, and Inertia.js',
      'Multi-tenant architectures with automated Stripe/PayPal recurring subscriptions',
      'Asynchronous background job processing with Redis queues & Horizon',
      'Clean RESTful APIs & GraphQL endpoints with OpenAPI documentation',
    ],
    tech: ['PHP 8.3', 'Laravel 11', 'Livewire', 'Inertia.js', 'MySQL', 'Redis', 'REST APIs'],
  },
  {
    id: 'devops',
    number: '08',
    icon: Cloud,
    badge: 'Cloud & Infrastructure',
    title: 'DevOps Engineering',
    headline: 'Automated CI/CD Pipelines, Kubernetes & 99.99% Cloud Uptime',
    description:
      'Eliminate deployment bottlenecks and infrastructure downtime. We architect automated cloud operations across AWS, GCP, and Azure with Terraform Infrastructure as Code, Docker containers, Kubernetes clusters, and 24/7 monitoring.',
    deliverables: [
      'Automated zero-downtime CI/CD release pipelines via GitHub Actions & GitLab',
      'Cloud cost optimization: 30–50% infrastructure bill savings via auto-scaling',
      'Enterprise cloud migration and disaster recovery with multi-region failovers',
      'Proactive 24/7 system observability with Prometheus, Grafana, and Datadog',
    ],
    tech: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus'],
  },
  {
    id: 'design',
    number: '09',
    icon: Palette,
    badge: 'Brand & Visual Identity',
    title: 'Graphic & UI/UX Designing',
    headline: 'Conversion-Driven Brand Identity, Pitch Decks & Pixel-Perfect UI',
    description:
      'Captivate your audience and turn casual visitors into loyal customers. We craft memorable visual identities, investor pitch decks, brand guidelines, and complete Figma UI/UX design systems based on human cognitive psychology.',
    deliverables: [
      'Psychology-driven UI/UX design that boosts user conversion and retention',
      'Complete Brand Identity kits: modern logos, typography harmonies & assets',
      'Investor-ready Pitch Decks, promotional media, and interactive Figma prototypes',
      'Comprehensive design systems with accessible tokens and component libraries',
    ],
    tech: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Brand Guidelines', 'UI/UX Design', 'Design Systems'],
  },
];

const ARCHITECTURAL_PILLARS = [
  {
    icon: Zap,
    title: 'Sub-Second Performance',
    desc: 'Every endpoint, page render, and query is profiled for extreme execution efficiency and sub-second user responses.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Trust Security',
    desc: 'Continuous authentication, end-to-end data encryption in transit and at rest, and strict defensive posture.',
  },
  {
    icon: Layers,
    title: 'Modular Decoupling',
    desc: 'Domain-driven systems engineered so individual services scale independently without catastrophic ripple effects.',
  },
  {
    icon: Cpu,
    title: 'Production Resilience',
    desc: 'Automated health probes, graceful degradation, circuit breakers, and self-healing infrastructure topologies.',
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        {/* Page Hero */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-800 mb-6 uppercase tracking-wider">
            Our 9 Specialized Disciplines
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Engineering & Technology Services{' '}
            <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
              Engineered for Enterprise Impact
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            From modern full-stack web architectures and cutting-edge artificial intelligence to enterprise .NET, Java, WordPress, and cloud DevOps, we deliver end-to-end software excellence that scales your business.
          </p>
        </div>

        {/* Architectural Principles Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {ARCHITECTURAL_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-teal-500/30 hover:shadow-md transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{pillar.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Detailed Services Grid (All 9 Services in Sequence) */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our 9 Core Service Offerings
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Each discipline is led by senior engineers and architects dedicated to delivering maximum business value and zero technical debt.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES_DETAILED.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  id={service.id}
                  key={service.number}
                  className="p-8 sm:p-10 border-slate-200 bg-white hover:border-teal-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group rounded-3xl scroll-mt-28"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-teal-700 bg-teal-50/80 border border-teal-200/70 px-3 py-1 rounded-full">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-teal-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700 mb-3">
                      {service.headline}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Key Client Deliverables
                      </h5>
                      {service.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Sparkles className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack tags & Action */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {service.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Button asChild size="sm" variant="outline" className="rounded-xl shrink-0 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-all">
                      <Link href="/contact" className="gap-1.5">
                        <span>Get Quote</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <div className="mt-20">
        <CTASection />
      </div>
    </div>
  );
}
