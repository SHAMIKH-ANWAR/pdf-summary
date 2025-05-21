import { getDbConnection } from "./db";


export async function getPriceIdForActiveUser(email:string){
    const sql = await getDbConnection();
    const query = await sql`SELECT price_id FROM users WHERE email = ${email}`;
    console.log('query',query);
    return query?.[0]?.price_id || null;
}