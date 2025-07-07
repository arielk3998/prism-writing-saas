// Simple in-memory rate limiter for development
// In production, use Redis or Upstash for distributed rate limiting

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class SimpleRateLimiter {
  private store: RateLimitStore = {};
  public readonly limit: number;
  private readonly windowMs: number;

  constructor(limit: number = 10, windowMs: number = 60000) { // 10 requests per minute
    this.limit = limit;
    this.windowMs = windowMs;
    
    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  async checkLimit(identifier: string): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now();
    const key = identifier;

    if (!this.store[key] || now > this.store[key].resetTime) {
      // First request or window expired
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs
      };
      
      return {
        allowed: true,
        remaining: this.limit - 1,
        resetTime: this.store[key].resetTime
      };
    }

    if (this.store[key].count >= this.limit) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: this.store[key].resetTime
      };
    }

    // Increment counter
    this.store[key].count++;
    
    return {
      allowed: true,
      remaining: this.limit - this.store[key].count,
      resetTime: this.store[key].resetTime
    };
  }

  private cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (now > this.store[key].resetTime) {
        delete this.store[key];
      }
    });
  }
}

// Global rate limiter instances
export const contactRateLimiter = new SimpleRateLimiter(5, 60000); // 5 submissions per minute
export const apiRateLimiter = new SimpleRateLimiter(30, 60000); // 30 API calls per minute

// Utility function to get client identifier
export function getClientIdentifier(request: Request): string {
  // In production, use IP address or user ID
  // For development, use a combination of headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  return `${ip}:${userAgent.slice(0, 50)}`;
}

// Middleware function for rate limiting
export async function applyRateLimit(
  request: Request,
  limiter: SimpleRateLimiter = apiRateLimiter
): Promise<Response | null> {
  try {
    const identifier = getClientIdentifier(request);
    const result = await limiter.checkLimit(identifier);
    
    if (!result.allowed) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Rate limit exceeded. Please try again later.',
          resetTime: result.resetTime
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limiter.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.resetTime.toString(),
            'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }
    
    // Rate limit passed, return null to continue
    return null;
  } catch (error) {
    console.error('Rate limiting error:', error);
    // If rate limiting fails, allow the request to continue
    return null;
  }
}
