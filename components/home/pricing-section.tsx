// "use client"

// import { cn } from "@/lib/utils"
// // import Link from "next/link"
// import { ArrowRight, CheckIcon } from "lucide-react"
// import { Button } from "../ui/button"
// import { pricingPlans } from "@/utils/constants"
// // import { isDev } from "@/utils/helpers"

// type PriceType = {
//     id:string,
//     name:string,
//     price:number,
//     items:string[],
//     description:string,
//     paymentLink:string,
//     priceId:string
// }


// const PricingCard = ({name,price,description,items,id,paymentLink,priceId}:PriceType)=>{
//     const handleSubscribe = async () => {
//     try {
//       const res = await fetch("/api/create-subscription", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ planId: priceId }),
//       });

//       const data = await res.json();
//       if (data.short_url) {
//         window.location.href = data.short_url;
//       } else {
//         alert("Error creating subscription");
//       }
//     } catch (error) {
//       console.error("Subscription error", error);
//       alert("Something went wrong.");
//     }
//   };
//     return(
//         <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all hover:duration-300">
//             <div className={cn("relative flex-col  flex gap-4 lg:gap-8 z-10 p-8  border-[1px] border-gray-500/20 rounded-2xl ",
//                 id === 'pro' && 'border-rose-500 gap-5 border-2'
//             )}>
//             <div className="flex justify-between items-center gap-4">
//                 <div>
//                 <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
//                 <p className="text-base-content/80 mt-2">{description}</p>
//                 </div>
//             </div>
//             <div className="flex gap-2">
//                 <p className="text-5xl tracking-tight font-extrabold">₹{price}</p>
//                 <div className="flex flex-col justify-end mb-[4px]">
//                     <p className="text-xs uppercase font-semibold">INR</p>
//                     <p className="text-xs">/month</p>
//                 </div>
//             </div>
//             <div className="space-y-2.5 leading-relaxed text-base flex-1">
//                 {items.map((item,idx)=>(
//                     <li key={idx} className="flex items-center gap-2">
//                         <CheckIcon className="w-4 h-4 text-rose-500"/>
//                         <span>{item}</span>
//                     </li>
//                 ))}
//             </div>
//             <div className="space-y-2 flex justify-center w-full">
//                 <Button onClick={handleSubscribe} className={cn("w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from=rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
//                     id === 'pro' ? 'bg-rose-900 border-rose-100' : 'bg-rose-500 border-rose-500'
//                 )}>Buy Now <ArrowRight size={18}/></Button>
//             </div>
//             </div>
//         </div>
//     )
// }

// export default function PricingSection(){
//   return(
//     <section className="relative overflow-hidden" id="pricing">
//       <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
//         <div className="flex items-center justify-center w-full pb-12">
//             <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">Pricing</h2>
//         </div>
//         <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
//             {pricingPlans.map((plan)=>(
//                 <PricingCard key={plan.id} {...plan}/>
//             ))}
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { cn } from "@/lib/utils"
import { ArrowRight, CheckIcon, X } from "lucide-react"
import { Button } from "../ui/button"
import { pricingPlans } from "@/utils/constants"

type PriceType = {
  id: string
  name: string
  price: number
  items: string[]
  description: string
  paymentLink: string
  priceId: string
}

type UserSubscription = {
  priceId: string | null
  status: string | null
  subscriptionId: string | null
} | null

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  priceId,
  userSubscription,
}: PriceType & { userSubscription: UserSubscription }) => {
  const handleSubscribe = async () => {
    try {
      console.log("Subscribing to plan:", priceId)
      const res = await fetch("/api/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ planId: priceId }),
      })

      const data = await res.json()
      if (data.short_url) {
        window.location.href = data.short_url
      } else {
        alert("Error creating subscription")
      }
    } catch (error) {
      console.error("Subscription error", error)
      alert("Something went wrong.")
    }
  }

  const handleCancelSubscription = async () => {
    try {
      const res = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          priceId: userSubscription?.priceId,
          subscriptionId: userSubscription?.subscriptionId,
        }),
      })

      const data = await res.json()
      if (data.success) {
        alert("Subscription cancelled successfully")
        window.location.reload()
      } else {
        alert("Error cancelling subscription")
      }
    } catch (error) {
      console.error("Cancellation error", error)
      alert("Something went wrong.")
    }
  }

  // Check if user has this specific plan
  const hasThisPlan = userSubscription?.priceId === priceId && userSubscription?.status !== "cancelled"

  // Check if user has any active subscription
  const hasActiveSubscription = userSubscription?.priceId && userSubscription?.status !== "cancelled"

  // Check if user has pro plan
  const hasProPlan =
    userSubscription?.priceId === pricingPlans.find((p) => p.id === "pro")?.priceId &&
    userSubscription?.status !== "cancelled"

  // Check if user has basic plan
  const hasBasicPlan =
    userSubscription?.priceId === pricingPlans.find((p) => p.id === "basic")?.priceId &&
    userSubscription?.status !== "cancelled"

  const getButtonContent = () => {
    // If user has this exact plan
    if (hasThisPlan) {
      return (
        <div className="space-y-2">
          <div className="text-center text-sm text-green-600 font-medium mb-2">✓ Current Plan</div>
          <Button
            onClick={handleCancelSubscription}
            variant="outline"
            className="w-full rounded-full flex items-center justify-center gap-2 border-red-300 text-red-600 hover:bg-red-50"
          >
            <X size={16} />
            Cancel {name} Subscription
          </Button>
        </div>
      )
    }

    // If user has pro plan and this is basic plan
    if (hasProPlan && id === "basic") {
      return (
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-2">You have Pro subscription</div>
          <Button disabled className="w-full rounded-full bg-gray-300 text-gray-500 cursor-not-allowed">
            Downgrade Not Available
          </Button>
        </div>
      )
    }

    // If user has basic plan and this is pro plan
    if (hasBasicPlan && id === "pro") {
      return (
        <div className="space-y-2">
          <div className="text-center text-sm text-blue-600 font-medium mb-2">Upgrade Available</div>
          <Button
            onClick={handleSubscribe}
            className="w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 border-rose-500"
          >
            Upgrade to Pro <ArrowRight size={18} />
          </Button>
        </div>
      )
    }

    // Default buy now button
    return (
      <Button
        onClick={handleSubscribe}
        className={cn(
          "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
          id === "pro" ? "bg-rose-900 border-rose-100" : "bg-rose-500 border-rose-500",
        )}
      >
        Buy Now <ArrowRight size={18} />
      </Button>
    )
  }

  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all hover:duration-300">
      <div
        className={cn(
          "relative flex-col flex gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2",
          hasThisPlan && "border-green-500 border-2 bg-green-50/30",
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
          {hasThisPlan && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Active</div>
          )}
        </div>
        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">₹{price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">INR</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-rose-500" />
              <span>{item}</span>
            </li>
          ))}
        </div>
        <div className="space-y-2 flex justify-center w-full">{getButtonContent()}</div>
      </div>
    </div>
  )
}

export default function PricingSection({ userSubscription }: { userSubscription: UserSubscription }) {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">Pricing</h2>
        </div>
        {userSubscription?.priceId && userSubscription?.status !== "cancelled" && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <CheckIcon className="w-4 h-4" />
              You have an active subscription
            </div>
          </div>
        )}
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} userSubscription={userSubscription} />
          ))}
        </div>
      </div>
    </section>
  )
}
