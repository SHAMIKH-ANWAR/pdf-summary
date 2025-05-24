import { type NextRequest, NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs/server"
import Razorpay from "razorpay"


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_SECRET_KEY || "",
})
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { priceId,subscriptionId } = await request.json();
    console.log("priceId", priceId);
    console.log("subscriptionId", subscriptionId);
    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }
    // const {subscriptionId} = await request.json();

    const result = await razorpay.subscriptions.cancel(subscriptionId);
    if (result.status !== "cancelled") {
      return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 })
    }


    console.log("request",request.body);
    

    console.log("Cancelling subscription for user:", user.id, "priceId:", priceId, "subscriptionId:", subscriptionId)

    // For now, just return success
    // Replace this with your actual cancellation logic
    return NextResponse.json({
      success: true,
      message: "Subscription cancelled successfully",
    })
  } catch (error) {
    console.error("Error cancelling subscription:", error)
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 })
  }
}
