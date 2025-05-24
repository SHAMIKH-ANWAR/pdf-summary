

import { currentUser } from "@clerk/nextjs/server"
import { getPriceIdForActiveUser, getRazorpaySubscriptionIdForActiveUser } from "@/lib/user"
import { pricingPlans } from "@/utils/constants"
import Header from "./header"

export async function HeaderContainer() {
  // Fetch user data on the server
  const user = await currentUser()

  if (!user?.id) {
    // Pass null values to indicate no user is logged in
    return <Header userPlanData={null} />
  }

  const email = user?.emailAddresses?.[0]?.emailAddress
  let priceId: string | null = null
  let planName = "Buy a plan"
  let status: string | null = null
  let subscriptionId: string | null = null
  if (email) {
    const result = await getPriceIdForActiveUser(email);
     subscriptionId = await getRazorpaySubscriptionIdForActiveUser(user?.id);
     console.log("subscriptionId", subscriptionId);
    priceId = result?.price_id ?? null
    status = result?.status ?? null

    if (result?.status === "cancelled") {
      planName = "Buy a plan"
    } else {
      const plan = pricingPlans.find((plan) => plan.priceId === priceId)
      if (plan) {
        planName = plan.name
      }
    }
  }

  // Pass the user plan data to the client component
  return (
    <Header
      userPlanData={{
        subscriptionId,
        priceId,
        planName,
        status,
      }}
    />
  )
}
