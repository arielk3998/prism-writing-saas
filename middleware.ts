import { NextRequest, NextResponse } from 'next/server'
import { verify, sign } from 'jsonwebtoken'

// JWT secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

interface JWTPayload {
  userId: string
  email: string
  role: string
  exp?: number
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public paths
  const publicPaths = [
    '/',
    '/about',
    '/contact',
    '/gallery',
    '/resources',
    '/login',
    '/register',
    '/legal',
    '/api/contact',
    '/api/email',
    '/api/download',
    '/_next',
    '/favicon.ico',
    '/static'
  ]

  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path) || 
    pathname.includes('/_next/') || 
    pathname.includes('/static/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2)$/)
  )

  if (isPublicPath) {
    return NextResponse.next()
  }

  // Check for authentication token
  const token = request.cookies.get('auth_token')?.value ||
                request.headers.get('authorization')?.replace('Bearer ', '')

  // Protected routes that require authentication
  const protectedPaths = ['/client', '/admin', '/member']
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    if (!token) {
      // Redirect to login for protected routes
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Verify JWT token
      const payload = verify(token, JWT_SECRET) as JWTPayload
      
      // Check if token is expired
      if (payload.exp && payload.exp < Date.now() / 1000) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('auth_token')
        return response
      }

      // Add user info to request headers for API routes
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', payload.userId || '')
      requestHeaders.set('x-user-email', payload.email || '')
      requestHeaders.set('x-user-role', payload.role || 'customer')

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })

    } catch (error) {
      console.error('Token verification failed:', error)
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth_token')
      return response
    }
  }

  // For API routes, check authentication but don't redirect
  if (pathname.startsWith('/api/') && pathname.includes('/client/')) {
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    try {
      const payload = verify(token, JWT_SECRET) as JWTPayload
      
      if (payload.exp && payload.exp < Date.now() / 1000) {
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        )
      }

      // Add user info to request headers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', payload.userId || '')
      requestHeaders.set('x-user-email', payload.email || '')
      requestHeaders.set('x-user-role', payload.role || 'customer')

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })

    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }
  }

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // In production, implement actual rate limiting with Redis or similar
    // For now, just log the request
    console.log(`API request: ${pathname} from ${ip}`)
  }

  // Add security headers
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // CSP header for enhanced security
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.stripe.com",
    "frame-src https://js.stripe.com https://hooks.stripe.com",
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', cspHeader)

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

// Helper function to create JWT token
export function createAuthToken(payload: Record<string, unknown>, expiresIn: string = '7d') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sign(payload, JWT_SECRET, { expiresIn } as any)
}

// Helper function to verify JWT token
export function verifyAuthToken(token: string) {
  try {
    return verify(token, JWT_SECRET)
  } catch {
    return null
  }
}
