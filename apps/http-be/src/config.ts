import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

const config = {
    JWT_PASSWORD: process.env.JWT_PASSWORD || "123random",
    PORT: process.env.PORT || 8080,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "",
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "",
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || "",
    JWT_SECRET: process.env.JWT_SECRET || "secret123",
    NODE_ENV: process.env.NODE_ENV || "dev",
    TOTP_SECRET: process.env.TOTP_SECRET || "123123",
};

export default config;
