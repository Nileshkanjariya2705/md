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
  name: 'Magnovaa',
  fullName: 'Magnovaa Technology',
  tagline: 'AI-Powered Enterprise Software & Digital Solutions',
  description:
    'Magnovaa Technology engineers high-concurrency systems, generative AI platforms, cloud architectures, and bespoke software solutions worldwide.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://magnovaa.com',
  email: 'magnovaa11@gmail.com',
  phone: '+91 9662225971',
  address: {
    street: 'Pride Square, 2nd Floor, Opp. Aalap Avenue , Pushkardham Main Road',
    city: 'Rajkot',
    state: 'Gujarat',
    zip: '360005',
    country: 'India',
  },
  social: {
    linkedin: 'https://linkedin.com/company/magnovaa',
    github: 'https://github.com/magnovaa',
    twitter: 'https://twitter.com/magnovaa',
  },
} as const;
