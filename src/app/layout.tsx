import type { Metadata } from "next";
import "./globals.css";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "@/components/theme-provider";
import { TranslationTool } from "@/components/translation-tool";

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
        url: '/og-image.svg',
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
    images: ['/og-image.svg'],
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const finalTheme = theme || systemPreference;
                  
                  const root = document.documentElement;
                  root.classList.remove('light', 'dark');
                  root.classList.add(finalTheme);
                  root.setAttribute('data-theme', finalTheme);
                  
                  // Dispatch custom event for theme initialization
                  window.dispatchEvent(new CustomEvent('theme-initialized', { detail: { theme: finalTheme } }));
                } catch (e) {
                  console.error('Theme initialization error:', e);
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className="antialiased font-sans"
      >
        <ThemeProvider defaultTheme="light">
          <ErrorBoundary>
            {children}
            <TranslationTool />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
