import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/features/auth/context/auth-context';
import { QueryProvider } from '@/lib/react-query/query-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Magnovaa Technology',
    default: 'Magnovaa Technology | AI-Powered Enterprise Software & Digital Solutions',
  },
  description:
    'Magnovaa Technology engineers high-concurrency systems, generative AI platforms, cloud architectures, and bespoke software solutions worldwide.',
  keywords: [
    'software engineering',
    'cloud architecture',
    'enterprise web apps',
    'AI solutions',
    'digital transformation',
    'Magnovaa Technology',
    'Magnovaa',
    'Full Stack Development',
    'Next.js',
    'React',
    'Python AI',
    'magnovaa.com',
  ],
  authors: [{ name: 'Magnovaa Technology', url: 'https://magnovaa.com' }],
  creator: 'Magnovaa Technology',
  publisher: 'Magnovaa Technology',
  metadataBase: new URL('https://magnovaa.com'),
  alternates: {
    canonical: 'https://magnovaa.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://magnovaa.com',
    siteName: 'Magnovaa Technology',
    title: 'Magnovaa Technology | AI-Powered Enterprise Software & Digital Solutions',
    description:
      'We craft exceptional digital experiences that elevate brands and drive business growth through innovative technology solutions.',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 362,
        alt: 'Magnovaa Technology Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magnovaa Technology | AI-Powered Enterprise Software & Digital Solutions',
    description:
      'We craft exceptional digital experiences that elevate brands and drive business growth through innovative technology solutions.',
    images: ['/logo.png'],
    site: '@magnovaa',
    creator: '@magnovaa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://magnovaa.com/#organization',
      name: 'Magnovaa Technology',
      alternateName: ['Magnovaa', 'Magnovaa Tech'],
      url: 'https://magnovaa.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://magnovaa.com/#logo',
        url: 'https://magnovaa.com/logo.png',
        caption: 'Magnovaa Technology Logo',
      },
      image: {
        '@id': 'https://magnovaa.com/#logo',
      },
      description:
        'Magnovaa Technology engineers high-concurrency systems, generative AI platforms, and bespoke enterprise software for industry-leading organizations worldwide.',
      email: 'hello@magnovaa.com',
      sameAs: [
        'https://linkedin.com/company/magnovaa',
        'https://twitter.com/magnovaa',
        'https://github.com/magnovaa',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@magnovaa.com',
        contactType: 'customer support',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://magnovaa.com/#website',
      url: 'https://magnovaa.com',
      name: 'Magnovaa Technology',
      description: 'AI-Powered Enterprise Software & Digital Solutions',
      publisher: {
        '@id': 'https://magnovaa.com/#organization',
      },
      inLanguage: 'en-US',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} light`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--md-bg-primary)] text-[var(--md-text-primary)] antialiased selection:bg-teal-500/20 selection:text-teal-900">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster
              theme="light"
              position="bottom-right"
              toastOptions={{
                className: 'border border-slate-200 bg-white text-slate-900 shadow-xl',
              }}
            />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
