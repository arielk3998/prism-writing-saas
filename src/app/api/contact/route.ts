import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emailService } from '@/lib/email'
import { contactRateLimiter, applyRateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  project: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await applyRateLimit(request, contactRateLimiter)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  try {
    const body = await request.json()
    
    // Validate the data
    const validatedData = contactSchema.parse(body)
    
    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        message: validatedData.message,
        source: 'CONTACT_FORM',
        status: 'NEW',
        priority: 'MEDIUM',
      },
    })

    // Send automated emails (client confirmation + admin notification)
    const emailData = {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      message: validatedData.message,
      submittedAt: new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'short'
      })
    }

    try {
      const emailResults = await emailService.sendContactFormEmails(emailData)
      console.log('Email automation results:', emailResults)
    } catch (emailError) {
      console.error('Email sending failed (non-critical):', emailError)
      // Don't fail the API call if emails fail - log for admin review
    }

    console.log('New lead created with email automation:', lead.id)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        leadId: lead.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your form data',
          errors: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    )
  }
}
