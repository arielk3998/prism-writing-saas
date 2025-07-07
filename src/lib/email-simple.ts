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
      html: `<h1>Thank you, ${data.name}!</h1><p>We received your message and will respond within 24 hours.</p>`,
    });

    const adminResult = await this.sendEmail({
      to: process.env.FROM_EMAIL || 'hello@prismwriting.com',
      subject: `🚨 New Contact Form Submission from ${data.name}`,
      html: `<h1>New Contact Form Submission</h1><p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p>${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}<p><strong>Message:</strong> ${data.message}</p>`,
    });

    return { client: clientResult, admin: adminResult };
  }
}

export const emailService = new EmailService();
export default EmailService;
