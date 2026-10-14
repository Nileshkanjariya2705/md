'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileCardScroll } from '@/components/ui/mobile-card-scroll';
import {
  Code2,
  BrainCircuit,
  Smartphone,
  Layers,
  Coffee,
  Globe,
  Database,
  Cloud,
  Palette,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  number: string;
  icon: React.ElementType;
  badge: string;
  title: string;
  headline: string;
  desc: string;
  highlights: string[];
  tags: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'node-react',
    number: '01',
    icon: Code2,
    badge: 'Full-Stack JavaScript',
    title: 'Node.js / React.js Web Development',
    headline: 'High-Throughput Modern Web Platforms & Scalable SaaS',
    desc: 'We build lightning-fast, fault-tolerant web applications and enterprise SaaS platforms using React.js 19 and Node.js. Optimized for sub-second page loads, real-time data streaming, and zero-downtime scalability that drives user conversion.',
    highlights: [
      'Sub-50ms API response times with event-driven Node.js runtimes',
      'Reactive Next.js single-page applications & fluid SSR architectures',
      'Real-time WebSockets, automated state management & live analytics',
    ],
    tags: ['Node.js', 'React.js', 'Next.js', 'Express', 'TypeScript', 'TailwindCSS'],
  },
  {
    id: 'python-ai',
    number: '02',
    icon: BrainCircuit,
    badge: 'Generative AI & ML',
    title: 'Python & AI/ML Development',
    headline: 'Autonomous AI Agents, Custom LLMs & Predictive Analytics',
    desc: 'Harness artificial intelligence to automate mission-critical operations and discover actionable predictive intelligence. We engineer bespoke RAG pipelines, multi-agent reasoning workflows, and production-grade Python microservices.',
    highlights: [
      'Private & secure enterprise RAG (Retrieval-Augmented Generation) systems',
      'Domain-tuned AI copilots and autonomous multi-agent task workflows',
      'Scalable inference backends with FastAPI, PyTorch, and vector databases',
    ],
    tags: ['Python', 'PyTorch', 'LangChain', 'OpenAI API', 'FastAPI', 'Pinecone'],
  },
  {
    id: 'react-native',
    number: '03',
    icon: Smartphone,
    badge: 'Cross-Platform Mobile',
    title: 'React Native Mobile Development',
    headline: 'Fluid 120Hz iOS & Android Apps from a Single Codebase',
    desc: 'Launch top-ranking mobile applications on the Apple App Store and Google Play in half the time. We deliver smooth 60-120 FPS gestures, offline-first synchronization, push notification infrastructures, and biometric security.',
    highlights: [
      'Single codebase cuts development & maintenance costs by 40%+',
      'Native device performance, camera, GPS, and biometric integration',
      'Offline-first data sync & instant over-the-air (OTA) feature updates',
    ],
    tags: ['React Native', 'Expo', 'TypeScript', 'iOS', 'Android', 'Redux'],
  },
  {
    id: 'dotnet',
    number: '04',
    icon: Layers,
    badge: 'Enterprise Architecture',
    title: '.NET Development',
    headline: 'High-Capacity Enterprise Backends & Secure Cloud Systems',
    desc: 'High-performance, mission-critical enterprise systems engineered with C# and .NET 8/9. Built for fintech, logistics, and healthcare organizations demanding ironclad security, ACID compliance, and seamless Microsoft Azure scaling.',
    highlights: [
      'High-throughput ASP.NET Core APIs with microsecond processing speeds',
      'Enterprise-grade encryption, HIPAA, SOC2 & GDPR regulatory compliance',
      'Resilient event-driven microservices with Entity Framework Core & SQL Server',
    ],
    tags: ['C#', '.NET 8/9', 'ASP.NET Core', 'Azure', 'Entity Framework', 'SQL Server'],
  },
  {
    id: 'java',
    number: '05',
    icon: Coffee,
    badge: 'High-Concurrency Banking',
    title: 'Java Development',
    headline: 'Bulletproof Banking, Telemetry & Distributed Microservices',
    desc: 'Enterprise-scale, fault-tolerant backends engineered with modern Java 21+ and Spring Boot. Built to reliably process millions of daily transactions, high-frequency data pipelines, and zero-downtime distributed microservices.',
    highlights: [
      'Ultra-low latency virtual threads handling 100k+ concurrent requests',
      'Production-grade Spring Boot 3 & Spring Cloud microservices architectures',
      'Ironclad transactional integrity with Apache Kafka & PostgreSQL clusters',
    ],
    tags: ['Java 21', 'Spring Boot', 'Hibernate', 'Apache Kafka', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'wordpress',
    number: '06',
    icon: Globe,
    badge: 'CMS & E-Commerce',
    title: 'WordPress Development',
    headline: 'Custom High-Converting Websites, Headless WP & WooCommerce',
    desc: 'Elevate beyond generic templates. We build bespoke, lightweight WordPress and WooCommerce solutions featuring custom Gutenberg blocks, Headless Next.js architectures, 95+ PageSpeed scores, and airtight security hardening.',
    highlights: [
      '100% custom theme and plugin engineering tailored to your brand identity',
      '95+ Google PageSpeed & Core Web Vitals optimization for maximum SEO rank',
      'High-converting WooCommerce stores with custom checkouts & payment gateways',
    ],
    tags: ['WordPress', 'WooCommerce', 'ACF Pro', 'PHP 8', 'Next.js', 'MySQL'],
  },
  {
    id: 'php-laravel',
    number: '07',
    icon: Database,
    badge: 'Rapid SaaS Architecture',
    title: 'PHP & Laravel Development',
    headline: 'Clean MVC Architectures, Custom Portals & Scalable REST APIs',
    desc: 'Accelerate your time-to-market with elegant, maintainable web applications built on Laravel 11 and modern PHP 8.3. We build custom portals, multi-tenant SaaS platforms, and API backbones with automated queue workers and testing.',
    highlights: [
      'Rapid SaaS feature rollout with Laravel 11, Livewire, and Inertia.js',
      'Multi-tenant architectures with automated Stripe/PayPal recurring subscriptions',
      'Asynchronous background job processing with Redis queues & Horizon',
    ],
    tags: ['PHP 8.3', 'Laravel 11', 'Livewire', 'MySQL', 'Redis', 'REST APIs'],
  },
  {
    id: 'devops',
    number: '08',
    icon: Cloud,
    badge: 'Cloud & Infrastructure',
    title: 'DevOps Engineering',
    headline: 'Automated CI/CD Pipelines, Kubernetes & 99.99% Cloud Uptime',
    desc: 'Eliminate deployment bottlenecks and infrastructure downtime. We architect automated cloud operations across AWS, GCP, and Azure with Terraform Infrastructure as Code, Docker containers, Kubernetes clusters, and 24/7 monitoring.',
    highlights: [
      'Automated zero-downtime CI/CD release pipelines via GitHub Actions & GitLab',
      'Cloud cost optimization: 30–50% infrastructure bill savings via auto-scaling',
      'Proactive 24/7 system observability with Prometheus, Grafana, and Datadog',
    ],
    tags: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
  },
  {
    id: 'design',
    number: '09',
    icon: Palette,
    badge: 'Brand & Visual Identity',
    title: 'Graphic & UI/UX Designing',
    headline: 'Conversion-Driven Brand Identity, Pitch Decks & Pixel-Perfect UI',
    desc: 'Captivate your audience and turn casual visitors into loyal customers. We craft memorable visual identities, investor pitch decks, brand guidelines, and complete Figma UI/UX design systems based on human cognitive psychology.',
    highlights: [
      'Psychology-driven UI/UX design that boosts user conversion and engagement',
      'Complete Brand Identity kits: modern logos, typography harmonies & assets',
      'Investor-ready Pitch Decks, promotional media, and interactive Figma prototypes',
    ],
    tags: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Brand Identity', 'UI/UX Design', 'Design Systems'],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-slate-50/70 relative scroll-mt-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/5 blur-[140px] rounded-full" />

      <Container>
        <SectionHeading
          badge="Our Core Capabilities"
          title="Full-Spectrum Engineering & Creative Services"
          description="Explore our 9 specialized engineering and design disciplines engineered to accelerate growth, reduce technical debt, and maximize ROI."
        />

        {/* Top 3 Services Grid */}
        <MobileCardScroll gridClassName="md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {SERVICES.slice(0, 3).map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="group p-7 sm:p-8 border-slate-200/90 bg-white hover:border-teal-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden rounded-3xl h-full"
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/70">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors mb-2 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Headline */}
                  <p className="text-xs font-semibold text-teal-700 mb-3 leading-snug">
                    {service.headline}
                  </p>

                  {/* Detailed Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {service.desc}
                  </p>

                  {/* Key Highlights / Deliverables */}
                  <div className="space-y-2.5 pt-4 pb-2 border-t border-slate-100">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                      Key Client Deliverables
                    </div>
                    {service.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips & Action Link */}
                <div className="pt-5 mt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors group-hover:translate-x-1 transition-transform"
                  >
                    <span>Request a Quote for {service.title.split(' ')[0]}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </MobileCardScroll>

        {/* Explore More Services Button */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-xl px-8 shadow-sm">
            <Link href="/services" className="gap-2">
              Explore More Services <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 text-center bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4 text-teal-600" /> Need a Custom Technology Stack?
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Ready to architect your custom digital solution?
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              Talk directly with our senior software architects for a free scoping session and quote.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-xl px-8 shadow-sm shrink-0">
            <Link href="/contact" className="gap-2">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
