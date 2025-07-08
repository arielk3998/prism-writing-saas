import { NextRequest, NextResponse } from 'next/server'
import { createUser, authenticateUser, createSessionToken } from '@/lib/unified-auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, company } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // For registration, we create a temporary admin user to create the new customer
    // In a real app, this would be handled differently
    const tempAdmin = {
      id: 'temp_admin',
      email: 'temp@admin.com',
      name: 'Temp Admin',
      role: 'admin' as const,
      permissions: ['manage_customers'],
      canBeRemoved: true,
      mfaEnabled: false
    }

    const result = await createUser(tempAdmin, {
      email,
      name,
      company,
      role: 'customer',
      permissions: ['view_documents', 'view_projects', 'contact_support']
    })

    if (result.success && result.user) {
      // Auto-login the newly created user
      const authResult = await authenticateUser(email, password)
      
      if (authResult.success && authResult.user) {
        const token = createSessionToken(authResult.user)
        
        return NextResponse.json({
          success: true,
          message: 'Account created successfully',
          customer: {
            id: authResult.user.id,
            email: authResult.user.email,
            name: authResult.user.name,
            company: authResult.user.company
          },
          user: authResult.user,
          token
        })
      }
    }

    return NextResponse.json(
      { success: false, message: result.message || 'Registration failed' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 500 }
    )
  }
}
