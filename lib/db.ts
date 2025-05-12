"use server";
import { neon } from "@neondatabase/serverless";

export async function getDbConnection() {
    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL is not defined in the environment variables.");
        throw new Error("DATABASE_URL is not defined in the environment variables.");
    }
    console.log("Connecting to the database using DATABASE_URL:", process.env.DATABASE_URL);
    const sql = neon(process.env.DATABASE_URL);
    return sql;
}