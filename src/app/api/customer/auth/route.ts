import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser, createSessionToken } from '@/lib/unified-auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const result = await authenticateUser(email, password)
    
    if (result.success && result.user) {
      const token = createSessionToken(result.user)
      
      // Return user data and token
      return NextResponse.json({
        success: true,
        customer: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
          company: result.user.company
        },
        user: result.user,
        token
      })
    }

    return NextResponse.json(
      { success: false, message: result.message },
      { status: 401 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    )
  }
}
