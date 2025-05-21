import { currentUser } from "@clerk/nextjs/server"



export default async function PlanBadge() {
    const user = await currentUser();
    if(!user?.id){
        return null
    }
    const email = user?.emailAddresses?.[0]?.emailAddress;
    let priceId:string | null = null;
    if(email){
        priceId = await getPrice
    }
    return (
        <div>pro</div>
    )
}