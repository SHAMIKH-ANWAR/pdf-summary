import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  const { planId } = await req.json();

  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12, // or 1 for yearly
      notes: {
        email: 'user@example.com', // replace with real user data
        name: 'User Name',
      },
    });

    return NextResponse.json({ short_url: subscription.short_url });
  } catch (err) {
    console.error('Subscription creation failed:', err);
    return NextResponse.json({ error: 'Subscription creation failed' }, { status: 500 });
  }
}
