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
  name: 'Mogovaa',
  fullName: 'Mogovaa Technology',
  tagline: 'AI-Powered Enterprise Software & Digital Solutions',
  description:
    'Mogovaa Technology engineers high-concurrency systems, generative AI platforms, cloud architectures, and bespoke software solutions worldwide.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mogovaa.com',
  email: 'hello@mogovaa.com',
  phone: '+1 (555) 000-0000',
  address: {
    street: '123 Innovation Drive',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'US',
  },
  social: {
    linkedin: 'https://linkedin.com/company/mogovaa',
    github: 'https://github.com/mogovaa',
    twitter: 'https://twitter.com/mogovaa',
  },
} as const;
