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
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
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

  // Client confirmation email template
  generateClientConfirmationEmail(data: EmailTemplateData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank You - Prism Writing</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .highlight { background: #e3f2fd; padding: 15px; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
            .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Thank You, ${data.name}!</h1>
              <p>Your message has been received</p>
            </div>
            <div class="content">
              <p>Hello ${data.name},</p>
              
              <p>Thank you for reaching out to Prism Writing! We've received your inquiry and our team will review it carefully.</p>
              
              <div class="highlight">
                <h3>📝 Your Submission Details:</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
                <p><strong>Submitted:</strong> ${data.submittedAt}</p>
              </div>
              
              <h3>🚀 What Happens Next?</h3>
              <ul>
                <li><strong>Within 2 hours:</strong> We'll review your project requirements</li>
                <li><strong>Within 24 hours:</strong> You'll receive a detailed proposal with transparent pricing</li>
                <li><strong>Within 48 hours:</strong> We can schedule a consultation call if needed</li>
              </ul>
              
              <p>In the meantime, feel free to explore our <a href="https://prismwriting.com/portfolio" class="btn">Portfolio Samples</a></p>
              
              <div class="footer">
                <p><strong>Prism Writing</strong><br>
                Professional Content & Technical Writing Services<br>
                <a href="https://prismwriting.com">prismwriting.com</a> | hello@prismwriting.com</p>
                
                <p><em>This is an automated confirmation. Please don't reply to this email - we'll be in touch soon!</em></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  // Admin notification email template
  generateAdminNotificationEmail(data: EmailTemplateData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Lead Alert - Prism Writing</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .lead-details { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .priority { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
            .btn { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
            .btn-secondary { background: #6c757d; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 New Lead Alert!</h1>
              <p>A new potential client has submitted an inquiry</p>
            </div>
            <div class="content">
              <div class="priority">
                <strong>⚡ Action Required:</strong> New lead requires immediate attention and response within 2 hours.
              </div>
              
              <div class="lead-details">
                <h3>📋 Lead Information:</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
                <p><strong>Submitted:</strong> ${data.submittedAt}</p>
                
                ${data.message ? `
                  <h4>💬 Message:</h4>
                  <p style="background: #e9ecef; padding: 15px; border-radius: 4px; font-style: italic;">
                    "${data.message}"
                  </p>
                ` : ''}
              </div>
              
              <h3>🎯 Recommended Actions:</h3>
              <ol>
                <li>Review the lead details and message</li>
                <li>Respond within 2 hours with personalized proposal</li>
                <li>Follow up with detailed project timeline</li>
                <li>Schedule consultation call if appropriate</li>
              </ol>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://prismwriting.com/admin/leads" class="btn">View in Admin Dashboard</a>
                <a href="mailto:${data.email}?subject=Re: Your Prism Writing Inquiry" class="btn btn-secondary">Reply to Lead</a>
              </div>
              
              <p><small><em>This alert was generated automatically. Manage notification preferences in the admin dashboard.</em></small></p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  // Send client confirmation
  async sendClientConfirmation(data: EmailTemplateData): Promise<boolean> {
    const html = this.generateClientConfirmationEmail(data);
    return await this.sendEmail({
      to: data.email,
      subject: '✨ Thank you for contacting Prism Writing!',
      html,
      text: `Thank you for contacting Prism Writing, ${data.name}! We've received your inquiry and will respond within 24 hours.`,
    });
  }

  // Send admin notification
  async sendAdminNotification(data: EmailTemplateData): Promise<boolean> {
    const adminEmail = process.env.BUSINESS_EMAIL || 'hello@prismwriting.com';
    const html = this.generateAdminNotificationEmail(data);
    return await this.sendEmail({
      to: adminEmail,
      subject: `🚨 New Lead Alert: ${data.name} from ${data.company || 'N/A'}`,
      html,
      text: `New lead from ${data.name} (${data.email}). Message: ${data.message || 'No message provided'}`,
    });
  }

  // Send both emails (client confirmation + admin notification)
  async sendContactFormEmails(data: EmailTemplateData): Promise<{ clientSent: boolean; adminSent: boolean }> {
    const [clientSent, adminSent] = await Promise.all([
      this.sendClientConfirmation(data),
      this.sendAdminNotification(data),
    ]);

    return { clientSent, adminSent };
  }
}

export const emailService = new EmailService();
export default EmailService;
