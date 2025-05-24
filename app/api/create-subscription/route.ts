// app/api/create-subscription/route.ts

import { auth } from "@clerk/nextjs/server";
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
    const { userId } = await auth();
    console.log("Clerk user ID:", userId);
    if(!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
     const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then(res => res.json());

    const firstName = user.first_name || "";
    const lastName = user.last_name || "";

    const userEmail = user.email_addresses?.[0]?.email_address;

    console.log("firstName:", firstName);
    console.log("lastName:", lastName);

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 12, // or 1 for yearly
      customer_notify: 1,
      notes: {
        userEmail: userEmail || "user@example.com",
        name: `${firstName}  ${lastName}`,
        clerkUserId:userId
      },
    });

    return NextResponse.json({ short_url: subscription.short_url });
  } catch (err) {
    console.error("Error creating subscription", err);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
