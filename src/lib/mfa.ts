import crypto from 'crypto'

export interface MFACode {
  code: string
  expiresAt: Date
  attempts: number
  userId: string
}

export interface MFAConfig {
  emailEnabled: boolean
  smsEnabled: boolean
  authenticatorEnabled: boolean
  backupCodesEnabled: boolean
}

// In-memory store for MFA codes (in production, use Redis or database)
const mfaCodes = new Map<string, MFACode>()
const userMfaConfig = new Map<string, MFAConfig>()

export function generateMFACode(): string {
  return crypto.randomInt(100000, 999999).toString()
}

export function generateBackupCodes(): string[] {
  const codes = []
  for (let i = 0; i < 10; i++) {
    codes.push(crypto.randomBytes(4).toString('hex').toUpperCase())
  }
  return codes
}

export function storeMFACode(userId: string, code: string): void {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
  mfaCodes.set(userId, {
    code,
    expiresAt,
    attempts: 0,
    userId
  })
}

export function verifyMFACode(userId: string, inputCode: string): { valid: boolean; expired?: boolean; tooManyAttempts?: boolean } {
  const storedCode = mfaCodes.get(userId)
  
  if (!storedCode) {
    return { valid: false }
  }

  if (Date.now() > storedCode.expiresAt.getTime()) {
    mfaCodes.delete(userId)
    return { valid: false, expired: true }
  }

  storedCode.attempts++

  if (storedCode.attempts > 3) {
    mfaCodes.delete(userId)
    return { valid: false, tooManyAttempts: true }
  }

  if (storedCode.code === inputCode) {
    mfaCodes.delete(userId)
    return { valid: true }
  }

  return { valid: false }
}

export function getUserMFAConfig(userId: string): MFAConfig {
  return userMfaConfig.get(userId) || {
    emailEnabled: true,
    smsEnabled: false,
    authenticatorEnabled: false,
    backupCodesEnabled: true
  }
}

export function updateUserMFAConfig(userId: string, config: Partial<MFAConfig>): void {
  const current = getUserMFAConfig(userId)
  userMfaConfig.set(userId, { ...current, ...config })
}

export async function sendMFACodeByEmail(email: string, code: string): Promise<boolean> {
  // In production, integrate with email service like SendGrid, AWS SES, or Nodemailer
  console.log(`MFA Code for ${email}: ${code}`)
  
  // Simulate email sending
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000)
  })
}

export async function sendMFACodeBySMS(phone: string, code: string): Promise<boolean> {
  // In production, integrate with SMS service like Twilio, AWS SNS
  console.log(`MFA Code for ${phone}: ${code}`)
  
  // Simulate SMS sending
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000)
  })
}

export function generateQRCodeURL(email: string, secret: string): string {
  const issuer = 'Prism Writing'
  const label = `${issuer}:${email}`
  const otpauth = `otpauth://totp/${encodeURIComponent(label)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauth)}`
}

export function generateTOTPSecret(): string {
  return crypto.randomBytes(20).toString('hex')
}

export function verifyTOTP(secret: string, token: string): boolean {
  // Simple TOTP verification (in production, use a proper TOTP library like 'otplib')
  const window = Math.floor(Date.now() / 30000)
  const expectedToken = crypto.createHmac('sha1', Buffer.from(secret, 'hex'))
    .update(Buffer.from(window.toString()))
    .digest('hex')
    .slice(-6)
  
  return expectedToken === token
}
