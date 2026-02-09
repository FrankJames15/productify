import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js"
import { ENV } from "../../env.config.js";

if (!ENV.DATABASE_URL) throw new Error("DB_URL is not set in environment variables");

// initialize PostgreSQL connection pool
const pool = new Pool({
    connectionString: ENV.DATABASE_URL
})

// log when an error occurs
pool.on("error", (err) => {
    console.error("Database connection error: ", err)
})

// log when first connection is made
pool.on("connect", () => {
    console.log("Database connection successfull")
})

export const db = drizzle({
    client: pool,
    schema
})