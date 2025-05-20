import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { handleSubscriptionActivated, handleSubscriptionCancelled } from '@/lib/payments';

export const POST = async (req: NextRequest) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const body = await req.text();
  const signature = req.headers.get('x-razorpay-signature')!;

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex');

  if (expectedSignature !== signature) {
    console.error('⚠️ Signature verification failed!');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(body);

  try {
    switch (event.event) {
      case 'payment.authorized':
        console.log('🟡 Payment authorized:', event.payload.payment.entity);
        break;

      case 'payment.failed':
        console.log('❌ Payment failed:', event.payload.payment.entity);
        break;

      case 'payment.captured':
        console.log('✅ Payment captured:', event.payload.payment.entity);
        // Mark subscription/payment success in NeonDB
        break;

      case 'subscription.activated':
        console.log('🚀 Subscription activated:', event.payload.subscription.entity);
       
        // Mark user as active in DB
        break;

      case 'subscription.pending':
        console.log('⏳ Subscription pending:', event.payload.subscription.entity);
        break;

      case 'subscription.paused':
        console.log('⏸️ Subscription paused:', event.payload.subscription.entity);
        break;

      case 'subscription.cancelled':
        console.log('🛑 Subscription cancelled:', event.payload.subscription.entity);
        handleSubscriptionCancelled(event.payload.subscription.entity);
        // Revoke access, notify user
        break;

      case 'subscription.completed':
        console.log('✅ Subscription completed:', event.payload.subscription.entity);
        break;

      case 'subscription.updated':
        console.log('🔄 Subscription updated:', event.payload.subscription.entity);
        break;

      case 'payment_link.paid':
        console.log('💰 Payment Link Paid:', event.payload.payment_link.entity);
        break;

      case 'payment_link.partially_paid':
        console.log('💸 Payment Link Partially Paid:', event.payload.payment_link.entity);
        break;

      case 'payment_link.expired':
        console.log('⌛ Payment Link Expired:', event.payload.payment_link.entity);
        break;

      case 'payment_link.cancelled':
        console.log('❎ Payment Link Cancelled:', event.payload.payment_link.entity);
        break;

      default:
        console.log(`🔔 Unhandled event: ${event.event}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 });
  }
};
