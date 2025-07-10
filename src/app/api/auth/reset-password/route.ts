import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth-simple';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await AuthService.resetPassword(email);
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Password reset instructions have been sent to your email.' 
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Password reset failed' },
      { status: 500 }
    );
  }
}
