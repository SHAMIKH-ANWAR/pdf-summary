import { getPriceIdForActiveUser } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export default async function PlanBadge() {
  const user = await currentUser();
  if (!user?.id) {
    return null;
  }
  //   console.log(user);
  const email = user?.emailAddresses?.[0]?.emailAddress;
  let priceId: string | null = null;
  let planName = "Buy a plan";
  const result = await getPriceIdForActiveUser(email);
  if (email) {
    priceId = result?.price_id ?? null;
  }

  if (result?.status === "cancelled") {
    planName = "Buy a plan";
  }
  const plan = pricingPlans.find((plan) => plan.priceId === priceId);

  if (plan && result?.status !== "cancelled") {
    planName = plan.name;
  }
  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 lg:flex flex-row items-center",
        !priceId && "from-rose-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-amber-600",
          !priceId && "text-red-600"
        )}
      />
      {planName}
    </Badge>
  );
}


