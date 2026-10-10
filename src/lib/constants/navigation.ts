export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Project', href: '/projects' },
  { label: 'Service', href: '/services' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Career', href: '/career' },
  { label: 'Client Review', href: '/reviews' },
  { label: 'Contact Us', href: '/contact' },
] as const;

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { label: 'Projects', href: '/admin/projects', icon: 'FolderOpen' },
  { label: 'Team', href: '/admin/team', icon: 'Users' },
  { label: 'Pricing Plans', href: '/admin/pricing', icon: 'CreditCard' },
  { label: 'Reviews', href: '/admin/reviews', icon: 'Star' },
  { label: 'Messages', href: '/admin/messages', icon: 'MessageSquare' },
] as const;

export const SITE_CONFIG = {
  name: 'MD',
  tagline: 'Premium Digital Solutions',
  description:
    'We craft exceptional digital experiences that elevate brands and drive business growth through innovative technology solutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://md.dev',
  email: 'hello@md.dev',
  phone: '+1 (555) 000-0000',
  address: {
    street: '123 Innovation Drive',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'US',
  },
  social: {
    linkedin: 'https://linkedin.com/company/md',
    github: 'https://github.com/md',
    twitter: 'https://twitter.com/md',
  },
} as const;
