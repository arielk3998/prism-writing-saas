import { NextRequest, NextResponse } from 'next/server';
import { PaymentService } from '@/lib/payments-simple';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd' } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      );
    }

    const result = await PaymentService.createPaymentIntent(amount, currency);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      clientSecret: result.paymentIntent?.client_secret,
      paymentIntentId: result.paymentIntent?.id
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
