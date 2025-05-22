import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";


export async function getPriceIdForActiveUser(email:string){
    const sql = await getDbConnection();
    const query = await sql`SELECT price_id,status  FROM users WHERE email = ${email}`;
    console.log('query',query);
    return { price_id: query?.[0]?.price_id, status: query?.[0]?.status };
}

export async function hasReachedUploadLimit(userId:string){
    const uploadCount = await getUserUploadCount(userId);
    const priceInfo = await getPriceIdForActiveUser(userId);
    const plan = pricingPlans.find((plan)=>plan.priceId === priceInfo?.price_id);
    const uploadLimit = isPro ? 1000 : 5;
}