import { currentUser } from "@clerk/nextjs/server"
import { getPriceIdForActiveUserByUserId } from "@/lib/user"
import PricingSection from "./pricing-section"

export async function PricingSectionContainer() {
  // Fetch user data on the server
  const user = await currentUser()

  let userSubscription = null

  if (user?.id) {
    const result = await getPriceIdForActiveUserByUserId(user.id)
    userSubscription = {
      priceId: result?.price_id ?? null,
      status: result?.status ?? null,
    }
  }

  return <PricingSection userSubscription={userSubscription} />
}
