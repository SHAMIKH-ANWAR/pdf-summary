import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";
// import { User } from "@clerk/nextjs/server";

export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT price_id,status  FROM users WHERE email = ${email}`;
  // console.log("query", query);
  return { price_id: query?.[0]?.price_id, status: query?.[0]?.status };
}

export async function getRazorpaySubscriptionIdForActiveUser(userId: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT razorpay_payment_id FROM payments WHERE user_id = ${userId}`;
  // console.log("query", query);
  return query?.[0]?.razorpay_payment_id};
}

export async function getPriceIdForActiveUserByUserId(userId: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT price_id, status FROM users WHERE clerk_user_id = ${userId}`;
  // console.log("query", query);
  return { price_id: query?.[0]?.price_id, status: query?.[0]?.status };
}


export async function hasActivePlan(email: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT price_id,status FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL`;
  return query?.[0]?.price_id !== null;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  // console.log("uploadCount", uploadCount);
  const priceInfo = await getPriceIdForActiveUserByUserId(userId);
  // console.log("priceInfo", priceInfo);

  // If user has no active subscription
  if (!priceInfo || !priceInfo.price_id) {
    console.warn("No active subscription found. Blocking uploads.");
    return { hasReachedLimit: true, uploadLimit: 0 };
  }

  // Determine if the user is on 'pro' or 'basic'
  const userPlan = pricingPlans.find((plan) => plan.priceId === priceInfo.price_id);
  const uploadLimit = userPlan?.id === "pro" ? 1000 : 5;

  // console.log("Upload Limit for user:", uploadLimit);

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}


export async function getSubscriptionStatus(user: any) {
  const hasSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );
  return hasSubscription;
}