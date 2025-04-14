import postgres from "postgres";

import { Quote } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchQuotes() {
    try {
        return await sql<Quote[]>`SELECT * FROM quote ORDER BY date DESC`; 
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch quotes data");
    }
}

export async function fetchQuoteById(id: string) {
    try {
        return await sql<Quote[]>`SELECT * from quote WHERE id = ${id}`;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error ("Failed to fetch quote data");
    }
}