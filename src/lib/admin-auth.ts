import { NextRequest } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export function verifyAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.substring(7) // Remove 'Bearer ' prefix
  
  // For now, we'll use a simple password-based check
  // In production, this should be replaced with proper JWT or session validation
  return token === ADMIN_PASSWORD
}

export function createAuthResponse() {
  return Response.json(
    { success: false, message: 'Unauthorized access' },
    { status: 401 }
  )
}
