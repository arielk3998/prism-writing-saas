import { NextRequest, NextResponse } from 'next/server'
import { generateMFACode, storeMFACode, sendMFACodeByEmail } from '@/lib/mfa'

export async function POST(request: NextRequest) {
  try {
    const { userId, email } = await request.json()

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate and store MFA code
    const code = generateMFACode()
    storeMFACode(userId, code)

    // Send code via email
    const emailSent = await sendMFACodeByEmail(email, code)

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send verification code' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully'
    })

  } catch (error) {
    console.error('MFA send code error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
