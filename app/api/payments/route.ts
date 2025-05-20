import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

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
      case 'payment.captured':
        const paymentInfo = event.payload.payment.entity;
        console.log('✅ Payment captured:', paymentInfo);
        // Save to NeonDB, mark user active, etc.
        break;

      case 'subscription.cancelled':
        const subscriptionInfo = event.payload.subscription.entity;
        console.log('⚠️ Subscription cancelled:', subscriptionInfo);
        // Update DB, disable user access, etc.
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
