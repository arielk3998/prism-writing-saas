import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  project: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the data
    const validatedData = contactSchema.parse(body)
    
    // Create the email content
    const subject = `Contact Form: ${validatedData.project ? validatedData.project : 'General Inquiry'}`
    const text = `
Name: ${validatedData.name}
Email: ${validatedData.email}
Company: ${validatedData.company || 'Not provided'}
Project Type: ${validatedData.project || 'Not specified'}

Message:
${validatedData.message}
    `

    // Send email using our email service
    const emailResponse = await fetch(`${request.nextUrl.origin}/api/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'ariel.pk@outlook.com',
        from: validatedData.email,
        subject,
        text,
        type: 'contact'
      })
    })

    if (!emailResponse.ok) {
      throw new Error('Failed to send email')
    }

    // Log contact form submission for analytics
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const forwardedFor = request.headers.get('x-forwarded-for') || 'unknown'
    console.log(`Contact form submission: ${validatedData.email} - IP: ${forwardedFor} - UA: ${userAgent}`)

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you within 24 hours."
    })

  } catch (error) {
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

    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again or contact us directly.' 
      },
      { status: 500 }
    )
  }
}
