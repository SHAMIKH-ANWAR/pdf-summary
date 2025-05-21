import { getDbConnection } from "./db";


export async function getPriceIdForActiveUser(email:string){
    const sql = await getDbConnection();
    const query = await sql`SELECT price_id,status  FROM users WHERE email = ${email}`;
    console.log('query',query);
    return { price_id: query?.[0]?.price_id, status: query?.[0]?.status };
}