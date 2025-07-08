import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface EmailTemplateData {
  name: string;
  email: string;
  company?: string;
  message?: string;
  submittedAt: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null;
  private isConfigured: boolean;

  constructor() {
    this.isConfigured = !!(
      process.env.SMTP_HOST && 
      process.env.SMTP_USER && 
      process.env.SMTP_PASSWORD
    );

    if (this.isConfigured) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    } else {
      this.transporter = null;
      console.warn('Email service not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD environment variables.');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.isConfigured || !this.transporter) {
      console.log('Email service not configured. Would send email to:', options.to, 'Subject:', options.subject);
      return false;
    }

    try {
      const info = await this.transporter.sendMail({
        from: process.env.FROM_EMAIL || 'hello@prismwriting.com',
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  // Send both confirmation and notification emails
  async sendContactFormEmails(data: EmailTemplateData): Promise<{ client: boolean; admin: boolean }> {
    const clientResult = await this.sendEmail({
      to: data.email,
      subject: '✨ Thank you for contacting Prism Writing - We\'ll be in touch soon!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Thank you, ${data.name}!</h1>
          <p>We received your message and will respond within 24 hours.</p>
          <p style="color: #6b7280;">Your message was submitted on ${data.submittedAt}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 14px; color: #6b7280;">
            This is an automated confirmation. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    const adminResult = await this.sendEmail({
      to: process.env.ADMIN_EMAIL || 'hello@prismwriting.com',
      subject: `🚨 New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">New Contact Form Submission</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${data.email}</td></tr>
            ${data.company ? `<tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; font-weight: bold;">Submitted:</td><td style="padding: 8px 0;">${data.submittedAt}</td></tr>
          </table>
          <h3>Message:</h3>
          <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin: 16px 0;">
            ${data.message}
          </div>
        </div>
      `,
    });

    return { client: clientResult, admin: adminResult };
  }
}

export const emailService = new EmailService();
export default EmailService;
