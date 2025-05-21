import { getDbConnection } from "./db";


export async function getUserPlan(email:string){
    const sql = await getDbConnection();
    const query = await sql`SELECT price_id FROM users WHERE email = ${email}`;
    return query?.[0]?.price_id || null;
}