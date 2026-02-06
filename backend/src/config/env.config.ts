import dotenv from "dotenv";

dotenv.config({quiet:true});

export const ENV = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    
    // URLS
    DB_RUL: process.env.DB_RUL,
    FRONTEND_URL: process.env.FRONTEND_URL,

    // KEYS
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
};
