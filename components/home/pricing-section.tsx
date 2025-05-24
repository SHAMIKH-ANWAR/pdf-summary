"use client"

import { cn } from "@/lib/utils"
// import Link from "next/link"
import { ArrowRight, CheckIcon } from "lucide-react"
import { Button } from "../ui/button"
import { pricingPlans } from "@/utils/constants"
// import { isDev } from "@/utils/helpers"

type PriceType = {
    id:string,
    name:string,
    price:number,
    items:string[],
    description:string,
    paymentLink:string,
    priceId:string
}


const PricingCard = ({name,price,description,items,id,paymentLink,priceId}:PriceType)=>{
    const handleSubscribe = async () => {
    try {
      const res = await fetch("/api/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ planId: priceId }),
      });

      const data = await res.json();
      if (data.short_url) {
        window.location.href = data.short_url;
      } else {
        alert("Error creating subscription");
      }
    } catch (error) {
      console.error("Subscription error", error);
      alert("Something went wrong.");
    }
  };
    return(
        <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all hover:duration-300">
            <div className={cn("relative flex-col  flex gap-4 lg:gap-8 z-10 p-8  border-[1px] border-gray-500/20 rounded-2xl ",
                id === 'pro' && 'border-rose-500 gap-5 border-2'
            )}>
            <div className="flex justify-between items-center gap-4">
                <div>
                <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
                <p className="text-base-content/80 mt-2">{description}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <p className="text-5xl tracking-tight font-extrabold">₹{price}</p>
                <div className="flex flex-col justify-end mb-[4px]">
                    <p className="text-xs uppercase font-semibold">INR</p>
                    <p className="text-xs">/month</p>
                </div>
            </div>
            <div className="space-y-2.5 leading-relaxed text-base flex-1">
                {items.map((item,idx)=>(
                    <li key={idx} className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-rose-500"/>
                        <span>{item}</span>
                    </li>
                ))}
            </div>
            <div className="space-y-2 flex justify-center w-full">
                <Button onClick={handleSubscribe} className={cn("w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from=rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
                    id === 'pro' ? 'bg-rose-900 border-rose-100' : 'bg-rose-500 border-rose-500'
                )}>Buy Now <ArrowRight size={18}/></Button>
            </div>
            </div>
        </div>
    )
}

export default function PricingSection(){
  return(
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
            <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">Pricing</h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
            {pricingPlans.map((plan)=>(
                <PricingCard key={plan.id} {...plan}/>
            ))}
        </div>
      </div>
    </section>
  )
}
