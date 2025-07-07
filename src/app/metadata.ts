import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prism Writing - Professional Content & Technical Writing Services',
  description: 'Expert technical writing, content strategy, and documentation services. Transparent pricing, proven results, and honest statistics. Transform your business communication.',
  keywords: [
    'technical writing',
    'content writing', 
    'documentation',
    'copywriting',
    'content strategy',
    'business writing',
    'proposal writing',
    'API documentation',
    'user manuals',
    'marketing copy'
  ],
  authors: [{ name: 'Prism Writing' }],
  creator: 'Prism Writing',
  publisher: 'Prism Writing',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://prismwriting.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Prism Writing - Professional Content & Technical Writing Services',
    description: 'Expert technical writing, content strategy, and documentation services. Transparent pricing, proven results, and honest statistics.',
    url: 'https://prismwriting.com',
    siteName: 'Prism Writing',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prism Writing - Professional Writing Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prism Writing - Professional Content & Technical Writing Services',
    description: 'Expert technical writing, content strategy, and documentation services. Transparent pricing, proven results, and honest statistics.',
    images: ['/og-image.jpg'],
    creator: '@prismwriting',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}
