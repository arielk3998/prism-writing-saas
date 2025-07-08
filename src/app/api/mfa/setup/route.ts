import { NextRequest, NextResponse } from 'next/server'
import { updateUserMFAConfig } from '@/lib/mfa'

export async function POST(request: NextRequest) {
  try {
    const { userId, method } = await request.json()

    if (!userId || !method) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Update user's MFA configuration
    const config = { emailEnabled: false, smsEnabled: false, authenticatorEnabled: false, backupCodesEnabled: true }
    
    switch (method) {
      case 'email':
        config.emailEnabled = true
        break
      case 'sms':
        config.smsEnabled = true
        break
      case 'authenticator':
        config.authenticatorEnabled = true
        break
      default:
        return NextResponse.json(
          { error: 'Invalid MFA method' },
          { status: 400 }
        )
    }

    updateUserMFAConfig(userId, config)

    return NextResponse.json({
      success: true,
      message: `${method.toUpperCase()} MFA has been enabled`
    })

  } catch (error) {
    console.error('MFA setup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
