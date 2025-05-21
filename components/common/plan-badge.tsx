import { getPriceIdForActiveUser } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server"



export default async function PlanBadge() {
    const user = await currentUser();
    if(!user?.id){
        return null
    }
    const email = user?.emailAddresses?.[0]?.emailAddress;
    let priceId:string | null = null;
    if(email){
        priceId = await getPriceIdForActiveUser(email);
    }
    let planName = 'Buy a plan';
    const plan = pricingPlans.find((plan)=>plan.priceId === priceId);
    
    if(plan){
        planName = plan.name;
    }
    return (
        <div>{planName}</div>
    )
}