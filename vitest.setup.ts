import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Clerk
vi.mock('@clerk/nextjs', () => ({
  auth: () => ({ userId: 'test-user-id' }),
  currentUser: () => ({ id: 'test-user-id', emailAddresses: [{ emailAddress: 'test@example.com' }] }),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
  UserButton: () => null,
  SignInButton: () => null,
  SignUpButton: () => null,
}));

// Mock environment variables
Object.defineProperty(process, 'env', {
  value: {
    ...process.env,
    NODE_ENV: 'test',
    DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'test-key',
    CLERK_SECRET_KEY: 'test-secret',
  },
  writable: true,
});
