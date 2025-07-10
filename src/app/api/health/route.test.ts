import { describe, it, expect, beforeEach, afterEach, vi, type MockedFunction } from 'vitest';
import { GET } from './route';

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    $queryRaw: vi.fn(),
  },
}));

// Import the mocked prisma after the mock is set up
import { prisma } from '@/lib/prisma';

// Type the mock properly
const mockQueryRaw = prisma.$queryRaw as MockedFunction<typeof prisma.$queryRaw>;

describe('/api/health', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return healthy status when database is accessible', async () => {
    // Mock successful database query
    mockQueryRaw.mockResolvedValue([{ '?column?': 1 }]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('healthy');
    expect(data.checks.database).toBe('healthy');
    expect(data.timestamp).toBeDefined();
    expect(data.checks.memory).toBeDefined();
    expect(data.checks.uptime).toBeDefined();
  });

  it('should return unhealthy status when database is not accessible', async () => {
    // Mock database connection failure
    mockQueryRaw.mockRejectedValue(new Error('Database connection failed'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe('unhealthy');
    expect(data.checks.database).toBe('unhealthy');
  });

  it('should return memory usage information', async () => {
    mockQueryRaw.mockResolvedValue([{ '?column?': 1 }]);

    const response = await GET();
    const data = await response.json();

    expect(data.checks.memory.rss).toMatch(/^\d+MB$/);
    expect(data.checks.memory.heapUsed).toMatch(/^\d+MB$/);
    expect(data.checks.memory.heapTotal).toMatch(/^\d+MB$/);
    expect(data.checks.memory.external).toMatch(/^\d+MB$/);
  });

  it('should return uptime information', async () => {
    mockQueryRaw.mockResolvedValue([{ '?column?': 1 }]);

    const response = await GET();
    const data = await response.json();

    expect(data.checks.uptime).toMatch(/^\d+s$/);
  });

  it('should handle unexpected errors gracefully', async () => {
    // Mock prisma to throw an unexpected error during the main try-catch
    mockQueryRaw.mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe('unhealthy');
    expect(data.checks.database).toBe('unhealthy');
  });
});
