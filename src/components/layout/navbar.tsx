'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu if route changed
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 pt-2 sm:pt-2.5">
      <nav
        aria-label="Main Navigation"
        className={cn(
          'mx-auto max-w-7xl rounded-2xl transition-all duration-300 px-3 sm:px-5 h-[52px] sm:h-[60px] flex items-center justify-between',
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-md shadow-slate-200/50'
            : 'bg-white/75 backdrop-blur-md border border-slate-200/70 shadow-sm'
        )}
      >
        {/* Brand Logo - takes ~90% of header height */}
        <Link
          href="/"
          className="flex items-center h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg shrink-0"
          aria-label="Magnovaa Technology Home"
        >
          <Image
            src="/logo.png"
            alt="Magnovaa Technology Logo"
            width={240}
            height={85}
            priority
            className="h-[46px] sm:h-[54px] max-h-[92%] w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-100/90 border border-slate-200 rounded-full px-3 xl:px-4 py-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive =
              mounted && pathname
                ? link.href === '/'
                  ? pathname === '/'
                  : link.href.startsWith('/#')
                  ? false
                  : pathname.startsWith(link.href)
                : false;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-2.5 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap',
                  isActive
                    ? 'text-teal-700 bg-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild size="sm" className="rounded-full shadow-sm">
            <Link href="/contact" className="gap-1.5">
              <span>Contact Us</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Actions & Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-1.5 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-2xl p-6 shadow-xl animate-reveal visible">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                mounted && pathname
                  ? link.href === '/'
                    ? pathname === '/'
                    : link.href.startsWith('/#')
                    ? false
                    : pathname.startsWith(link.href)
                  : false;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-base font-medium transition-all',
                    isActive
                      ? 'bg-teal-50 text-teal-700 font-semibold border border-teal-200'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-200">
              <Button asChild className="w-full justify-center">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact Us <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
