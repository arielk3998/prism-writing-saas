import Stripe from 'stripe';
import { prisma } from './prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20'
});

export class PaymentService {
  static async createPaymentIntent(amount: number, currency = 'usd') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe uses cents
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return { success: true, paymentIntent };
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      return { success: false, error: 'Failed to create payment intent' };
    }
  }
  
  static async createSubscription(customerId: string, priceId: string) {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });
      return { success: true, subscription };
    } catch (error) {
      console.error('Subscription creation failed:', error);
      return { success: false, error: 'Failed to create subscription' };
    }
  }
  
  static async createCustomer(email: string, name: string) {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
      });
      return { success: true, customer };
    } catch (error) {
      console.error('Customer creation failed:', error);
      return { success: false, error: 'Failed to create customer' };
    }
  }
  
  static async recordPayment(data: {
    userId: string;
    amount: number;
    currency: string;
    stripePaymentId: string;
    status: string;
  }) {
    try {
      const payment = await prisma.payment.create({
        data: {
          userId: data.userId,
          amount: data.amount,
          currency: data.currency,
          stripePaymentId: data.stripePaymentId,
          status: data.status as any,
          processedAt: new Date(),
        }
      });
      return { success: true, payment };
    } catch (error) {
      console.error('Payment recording failed:', error);
      return { success: false, error: 'Failed to record payment' };
    }
  }
}
