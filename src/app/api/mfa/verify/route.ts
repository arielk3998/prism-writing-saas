import { NextRequest, NextResponse } from 'next/server'
import { verifyMFACode } from '@/lib/mfa'

export async function POST(request: NextRequest) {
  try {
    const { userId, code } = await request.json()

    if (!userId || !code) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify the MFA code
    const result = verifyMFACode(userId, code)

    return NextResponse.json(result)

  } catch (error) {
    console.error('MFA verify error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
