import Stripe from 'stripe';
import { prisma } from './prisma';

// Check if we have a valid Stripe key (not placeholder or empty)
const stripeKey = process.env.STRIPE_SECRET_KEY;
const isValidStripeKey = stripeKey && 
  stripeKey !== 'sk_test_YOUR_STRIPE_SECRET_KEY_HERE' && 
  stripeKey.startsWith('sk_');

const stripe = isValidStripeKey 
  ? new Stripe(stripeKey, { apiVersion: '2025-06-30.basil' })
  : null;

export class PaymentService {
  static async createPaymentIntent(amount: number, currency = 'usd') {
    try {
      if (!stripe) {
        return { 
          success: false, 
          error: 'Stripe not configured. Please set STRIPE_SECRET_KEY in environment variables.' 
        };
      }
      
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
      if (!stripe) {
        return { 
          success: false, 
          error: 'Stripe not configured. Please set STRIPE_SECRET_KEY in environment variables.' 
        };
      }
      
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
      if (!stripe) {
        return { 
          success: false, 
          error: 'Stripe not configured. Please set STRIPE_SECRET_KEY in environment variables.' 
        };
      }
      
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
          status: data.status as 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED',
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
