import { currentUser } from "@clerk/nextjs/server"
import { getPriceIdForActiveUserByUserId, getRazorpaySubscriptionIdForActiveUser } from "@/lib/user"
import PricingSection from "./pricing-section"

export async function PricingSectionContainer() {
  // Fetch user data on the server
  const user = await currentUser()

  let userSubscription = null

  if (user?.id) {
    const result = await getPriceIdForActiveUserByUserId(user.id)
    const subscriptionId = await getRazorpaySubscriptionIdForActiveUser(user.id);
    userSubscription = {
      priceId: result?.price_id ?? null,
      status: result?.status ?? null,
      subscriptionId: subscriptionId ?? null,
    }
  }

  return <PricingSection userSubscription={userSubscription} />
}
