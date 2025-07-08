import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const authSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = authSchema.parse(body)

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { 
        email: email.toLowerCase(),
        role: 'CLIENT',
        status: 'ACTIVE'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // For demo purposes, we'll use a simple password check
    // In production, you should hash passwords and compare properly
    const validPassword = password === 'customer123' || 
                         password === user.email.split('@')[0] // Use email prefix as password for demo

    if (!validPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Return customer data (excluding sensitive information)
    const customer = {
      id: user.id,
      email: user.email,
      name: user.name,
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      customer
    })

  } catch (error) {
    console.error('Customer auth error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid input data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    )
  }
}
