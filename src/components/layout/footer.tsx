'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from './container';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants/navigation';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/icons';

const CAPABILITIES_SERVICES = [
  { name: 'Node.js & React.js', href: '/services#node-react' },
  { name: 'Python & AI / ML', href: '/services#python-ai' },
  { name: 'React Native Mobile', href: '/services#react-native' },
  { name: '.NET Enterprise Dev', href: '/services#dotnet' },
  { name: 'Java Microservices', href: '/services#java' },
  { name: 'WordPress Development', href: '/services#wordpress' },
  { name: 'PHP & Laravel Dev', href: '/services#php-laravel' },
  { name: 'DevOps & Cloud Systems', href: '/services#devops' },
  { name: 'Graphic & UI/UX Design', href: '/services#design' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-slate-800 bg-[#0d1726] pt-20 pb-12 overflow-hidden text-slate-400">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#2f6bff]/5 blur-[140px] rounded-full" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-16 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-1 lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group bg-white/95 px-3.5 py-1.5 rounded-2xl shadow-sm" aria-label="Magnovaa Technology Home">
              <Image
                src="/logo.png"
                alt="Magnovaa Technology Logo"
                width={220}
                height={75}
                className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Engineering high-concurrency systems, AI-powered digital products, and enterprise cloud software for market-defining organizations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 shadow-xs flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#2f6bff] hover:border-[#2f6bff] transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 shadow-xs flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#2f6bff] hover:border-[#2f6bff] transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 shadow-xs flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#2f6bff] hover:border-[#2f6bff] transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:translate-x-0.5 transition-all text-slate-400 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div className="md:col-span-1 lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between pr-2">
              <h4 className="text-xs uppercase font-bold tracking-widest text-slate-200">
                Capabilities
              </h4>
            </div>
            <ul className="space-y-2 text-sm">
              {CAPABILITIES_SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="hover:text-white transition-colors text-slate-400 flex items-center gap-2 group py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2f6bff] group-hover:scale-125 transition-all shrink-0" />
                    <span className="text-[13px] leading-snug group-hover:translate-x-0.5 transition-transform">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-1 lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-slate-200">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#2f6bff] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-[13px] leading-relaxed text-slate-300">
                  San Francisco, CA<br />Worldwide Remote
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#2f6bff] shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors text-xs sm:text-[13px] truncate text-slate-300"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Magnovaa Technology. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
