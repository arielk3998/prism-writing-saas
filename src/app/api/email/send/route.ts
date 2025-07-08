import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'hello@prismwriting.com',
    pass: process.env.SMTP_PASSWORD || 'your-app-password'
  }
}

export async function POST(request: NextRequest) {
  try {
    const { to, from, subject, text, html, type = 'contact' } = await request.json()

    if (!to || !subject || (!text && !html)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport(EMAIL_CONFIG)

    // Verify connection
    try {
      await transporter.verify()
    } catch (error) {
      console.error('SMTP connection failed:', error)
      return NextResponse.json(
        { error: 'Email service temporarily unavailable' },
        { status: 503 }
      )
    }

    // Prepare email based on type
    let mailOptions

    if (type === 'contact') {
      // Contact form submission - forward to ariel.pk@outlook.com
      mailOptions = {
        from: `"Prism Writing Contact" <${EMAIL_CONFIG.auth.user}>`,
        to: 'ariel.pk@outlook.com',
        subject: `Contact Form: ${subject}`,
        replyTo: from,
        text: `
Contact Form Submission

From: ${from}
Subject: ${subject}

Message:
${text}

---
This message was sent via the Prism Writing contact form.
        `,
        html: html || `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Contact Form Submission</h2>
            <p><strong>From:</strong> ${from}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
            <div style="white-space: pre-wrap;">${text}</div>
            <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 12px;">This message was sent via the Prism Writing contact form.</p>
          </div>
        `
      }

      // Send auto-reply to the contact
      const autoReplyOptions = {
        from: `"Ariel Karagodskiy - Prism Writing" <${EMAIL_CONFIG.auth.user}>`,
        to: from,
        subject: `Re: ${subject}`,
        text: `
Thank you for contacting Prism Writing!

I've received your message and will get back to you within 24 hours.

Best regards,
Ariel Karagodskiy
Prism Writing
hello@prismwriting.com

---
Original message:
${text}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank you for contacting Prism Writing!</h2>
            <p>I've received your message and will get back to you within 24 hours.</p>
            <p>Best regards,<br>
            <strong>Ariel Karagodskiy</strong><br>
            Prism Writing<br>
            <a href="mailto:hello@prismwriting.com">hello@prismwriting.com</a></p>
            <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
            <p><strong>Your original message:</strong></p>
            <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #2563eb; white-space: pre-wrap;">${text}</div>
          </div>
        `
      }

      // Send both emails
      await Promise.all([
        transporter.sendMail(mailOptions),
        transporter.sendMail(autoReplyOptions)
      ])

    } else if (type === 'newsletter') {
      // Newsletter subscription
      mailOptions = {
        from: `"Prism Writing" <${EMAIL_CONFIG.auth.user}>`,
        to: 'ariel.pk@outlook.com',
        subject: 'New Newsletter Subscription',
        text: `New newsletter subscription: ${to}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${to}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
        `
      }

      const welcomeOptions = {
        from: `"Ariel Karagodskiy - Prism Writing" <${EMAIL_CONFIG.auth.user}>`,
        to: to,
        subject: 'Welcome to Prism Writing Newsletter!',
        text: `
Welcome to the Prism Writing newsletter!

Thank you for subscribing. You'll receive updates on:
- Technical writing best practices
- Industry insights and trends
- New resources and templates
- Service updates and announcements

Best regards,
Ariel Karagodskiy
Prism Writing
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Welcome to Prism Writing Newsletter!</h2>
            <p>Thank you for subscribing. You'll receive updates on:</p>
            <ul>
              <li>Technical writing best practices</li>
              <li>Industry insights and trends</li>
              <li>New resources and templates</li>
              <li>Service updates and announcements</li>
            </ul>
            <p>Best regards,<br>
            <strong>Ariel Karagodskiy</strong><br>
            Prism Writing</p>
          </div>
        `
      }

      await Promise.all([
        transporter.sendMail(mailOptions),
        transporter.sendMail(welcomeOptions)
      ])

    } else if (type === 'notification') {
      // General notification from hello@prismwriting.com
      mailOptions = {
        from: `"Ariel Karagodskiy - Prism Writing" <${EMAIL_CONFIG.auth.user}>`,
        to,
        subject,
        text,
        html
      }

      await transporter.sendMail(mailOptions)

    } else {
      return NextResponse.json(
        { error: 'Invalid email type' },
        { status: 400 }
      )
    }

    // Log email for analytics
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const forwardedFor = request.headers.get('x-forwarded-for') || 'unknown'
    console.log(`Email sent: Type: ${type} - To: ${to} - Subject: ${subject} - IP: ${forwardedFor} - UA: ${userAgent}`)

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    })

  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Test SMTP connection
    const transporter = nodemailer.createTransport(EMAIL_CONFIG)
    await transporter.verify()

    return NextResponse.json({
      status: 'healthy',
      service: 'email',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Email service health check failed:', error)
    return NextResponse.json(
      { 
        status: 'unhealthy',
        service: 'email',
        error: 'SMTP connection failed',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    )
  }
}
