/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-06-30.basil',
});

export interface PaymentRequest {
  amount: number;
  currency?: string;
  description?: string;
  metadata?: Record<string, string>;
  customerId?: string;
  paymentMethodId?: string;
}

export interface SubscriptionRequest {
  customerId: string;
  priceId: string;
  trialPeriodDays?: number;
  metadata?: Record<string, string>;
}

export interface CreateCustomerRequest {
  email: string;
  name?: string;
  phone?: string;
  metadata?: Record<string, string>;
}

export class PaymentService {
  // Create Stripe customer
  static async createCustomer(data: CreateCustomerRequest): Promise<Stripe.Customer> {
    try {
      const customer = await stripe.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
        metadata: data.metadata || {},
      });

      return customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  // Create payment intent
  static async createPaymentIntent(data: PaymentRequest): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(data.amount * 100), // Convert to cents
        currency: data.currency || 'usd',
        description: data.description,
        metadata: data.metadata || {},
        customer: data.customerId,
        payment_method: data.paymentMethodId,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  // Confirm payment
  static async confirmPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new Error('Failed to confirm payment');
    }
  }

  // Create subscription
  static async createSubscription(data: SubscriptionRequest): Promise<Stripe.Subscription> {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: data.customerId,
        items: [{ price: data.priceId }],
        trial_period_days: data.trialPeriodDays,
        metadata: data.metadata || {},
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      return subscription;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('Failed to create subscription');
    }
  }

  // Cancel subscription
  static async cancelSubscription(subscriptionId: string, immediately: boolean = false): Promise<Stripe.Subscription> {
    try {
      if (immediately) {
        return await stripe.subscriptions.cancel(subscriptionId);
      } else {
        return await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
        });
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw new Error('Failed to cancel subscription');
    }
  }

  // Process successful payment
  static async processSuccessfulPayment(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    try {
      // Update payment record in database
      await prisma.payment.updateMany({
        where: { stripePaymentId: paymentIntent.id },
        data: {
          status: 'SUCCEEDED',
          processedAt: new Date(),
          metadata: JSON.stringify(paymentIntent.metadata),
        },
      });

      // If this was for an order, update order status
      const payment = await prisma.payment.findFirst({
        where: { stripePaymentId: paymentIntent.id },
        include: { order: true },
      });

      if (payment?.order) {
        await prisma.order.update({
          where: { id: payment.orderId! },
          data: { status: 'IN_PROGRESS' },
        });
      }

      console.log(`Payment ${paymentIntent.id} processed successfully`);
    } catch (error) {
      console.error('Error processing successful payment:', error);
    }
  }

  // Process failed payment
  static async processFailedPayment(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    try {
      await prisma.payment.updateMany({
        where: { stripePaymentId: paymentIntent.id },
        data: {
          status: 'FAILED',
          metadata: JSON.stringify({
            ...paymentIntent.metadata,
            failure_reason: paymentIntent.last_payment_error?.message,
          }),
        },
      });

      console.log(`Payment ${paymentIntent.id} failed`);
    } catch (error) {
      console.error('Error processing failed payment:', error);
    }
  }

  // Handle webhook events
  static async handleWebhook(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.text();
      const signature = request.headers.get('stripe-signature');

      if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
      }

      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!webhookSecret) {
        return NextResponse.json({ error: 'No webhook secret' }, { status: 500 });
      }

      const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.processSuccessfulPayment(event.data.object as Stripe.PaymentIntent);
          break;

        case 'payment_intent.payment_failed':
          await this.processFailedPayment(event.data.object as Stripe.PaymentIntent);
          break;

        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          await this.processSubscriptionUpdate(event.data.object as Stripe.Subscription);
          break;

        case 'customer.subscription.deleted':
          await this.processSubscriptionCancellation(event.data.object as Stripe.Subscription);
          break;

        case 'invoice.payment_succeeded':
          await this.processInvoicePayment(event.data.object as Stripe.Invoice);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return NextResponse.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      return NextResponse.json({ error: 'Webhook failed' }, { status: 400 });
    }
  }

  // Process subscription updates
  static async processSubscriptionUpdate(subscription: Stripe.Subscription): Promise<void> {
    try {
      const statusMap: Record<string, string> = {
        'active': 'ACTIVE',
        'canceled': 'CANCELLED',
        'past_due': 'PAST_DUE',
        'unpaid': 'UNPAID',
        'trialing': 'TRIALING',
      };

      await prisma.subscription.upsert({
        where: { stripeSubscriptionId: subscription.id },
        update: {
          status: statusMap[subscription.status] as 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'TRIALING' | 'UNPAID',
          currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
          cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
        },
        create: {
          userId: subscription.metadata?.userId || '',
          planId: subscription.items.data[0]?.price?.id || '',
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          status: statusMap[subscription.status] as 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'TRIALING' | 'UNPAID',
          currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
          cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
        },
      });

      console.log(`Subscription ${subscription.id} updated`);
    } catch (error) {
      console.error('Error processing subscription update:', error);
    }
  }

  // Process subscription cancellation
  static async processSubscriptionCancellation(subscription: Stripe.Subscription): Promise<void> {
    try {
      await prisma.subscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: 'CANCELLED' },
      });

      console.log(`Subscription ${subscription.id} cancelled`);
    } catch (error) {
      console.error('Error processing subscription cancellation:', error);
    }
  }

  // Process invoice payment
  static async processInvoicePayment(invoice: Stripe.Invoice): Promise<void> {
    try {
      if ((invoice as any).subscription) {
        // Update subscription payment
        await prisma.payment.create({
          data: {
            userId: (invoice as any).metadata?.userId || '',
            subscriptionId: (invoice as any).metadata?.subscriptionId,
            stripePaymentId: (invoice as any).payment_intent as string,
            amount: (invoice.amount_paid || 0) / 100,
            currency: invoice.currency.toUpperCase(),
            status: 'SUCCEEDED',
            description: `Subscription payment for ${invoice.lines.data[0]?.description}`,
            processedAt: new Date(),
          },
        });
      }

      console.log(`Invoice ${invoice.id} payment processed`);
    } catch (error) {
      console.error('Error processing invoice payment:', error);
    }
  }

  // Create customer portal session
  static async createPortalSession(customerId: string, returnUrl: string): Promise<string> {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });

      return session.url;
    } catch (error) {
      console.error('Error creating portal session:', error);
      throw new Error('Failed to create portal session');
    }
  }

  // Create checkout session
  static async createCheckoutSession(data: {
    priceId: string;
    customerId?: string;
    successUrl: string;
    cancelUrl: string;
    trialPeriodDays?: number;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Checkout.Session> {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: data.priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        customer: data.customerId,
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        subscription_data: {
          trial_period_days: data.trialPeriodDays,
          metadata: data.metadata || {},
        },
      });

      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }
  }

  // Refund payment
  static async refundPayment(paymentIntentId: string, amount?: number): Promise<Stripe.Refund> {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined, // Convert to cents if specified
      });

      // Update payment record
      await prisma.payment.updateMany({
        where: { stripePaymentId: paymentIntentId },
        data: {
          status: 'REFUNDED',
          refundedAt: new Date(),
          refundAmount: (refund.amount || 0) / 100,
        },
      });

      return refund;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund');
    }
  }

  // Get customer's payment methods
  static async getPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });

      return paymentMethods.data;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw new Error('Failed to fetch payment methods');
    }
  }

  // Create payment method
  static async attachPaymentMethod(paymentMethodId: string, customerId: string): Promise<Stripe.PaymentMethod> {
    try {
      const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      return paymentMethod;
    } catch (error) {
      console.error('Error attaching payment method:', error);
      throw new Error('Failed to attach payment method');
    }
  }
}
