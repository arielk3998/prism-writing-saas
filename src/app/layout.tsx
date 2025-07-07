import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  metadataBase: new URL('https://prismwriting.com'),
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
    description: 'Expert technical writing, content strategy, and documentation services. Transparent pricing, proven results.',
    images: ['/og-image.jpg'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
