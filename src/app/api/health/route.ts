import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface HealthChecks {
  timestamp: string;
  status: 'healthy' | 'unhealthy' | 'error';
  version: string;
  environment: string;
  checks: {
    database: string;
    memory: {
      rss: string;
      heapUsed: string;
      heapTotal: string;
      external: string;
    };
    uptime: string;
  };
}

export async function GET() {
  try {
    const healthChecks: HealthChecks = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: 'checking...',
        memory: {
          rss: '0MB',
          heapUsed: '0MB',
          heapTotal: '0MB',
          external: '0MB',
        },
        uptime: '0s',
      },
    };

    // Database health check
    try {
      await prisma.$queryRaw`SELECT 1`;
      healthChecks.checks.database = 'healthy';
    } catch {
      healthChecks.checks.database = 'unhealthy';
      healthChecks.status = 'unhealthy';
    }

    // Memory usage check
    const memoryUsage = process.memoryUsage();
    healthChecks.checks.memory = {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`,
    };

    // Uptime check
    healthChecks.checks.uptime = `${Math.round(process.uptime())}s`;

    const statusCode = healthChecks.status === 'healthy' ? 200 : 503;
    
    return NextResponse.json(healthChecks, { status: statusCode });
  } catch (error) {
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
