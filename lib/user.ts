import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";
// import { User } from "@clerk/nextjs/server";

export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT price_id,status  FROM users WHERE email = ${email}`;
  console.log("query", query);
  return { price_id: query?.[0]?.price_id, status: query?.[0]?.status };
}

export async function getPriceIdForActiveUserByUserId(userId: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT price_id, status FROM users WHERE clerk_user_id = ${userId}`;
  console.log("query", query);
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
  const priceInfo = await getPriceIdForActiveUserByUserId(userId);
  console.log("priceInfo", priceInfo);
  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceInfo?.price_id)?.id ===
    "pro";
  console.log("isPro", isPro);
  const isBasic =
    pricingPlans.find((plan) => plan.priceId === priceInfo?.price_id)?.id === "basic"
  const uploadLimit: number = isPro ? 1000 : 5;
  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}

export async function getSubscriptionStatus(user: any) {
  const hasSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );
  return hasSubscription;
}