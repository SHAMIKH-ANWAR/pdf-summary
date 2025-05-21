// app/api/create-subscription/route.ts

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId } = body;

    

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 12, // or 1 for yearly
      customer_notify: 1,
      notes: {
        userEmail: "user@example.com", // Replace with actual user info if logged in
      },
    });

    return NextResponse.json({ short_url: subscription.short_url });
  } catch (err) {
    console.error("Error creating subscription", err);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
