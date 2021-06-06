import { config } from "dotenv";

config();

export default {
    DB_URL: process.env.DB_URL,
    SERVER_PORT: process.env.SERVER_PORT || (3333 as number),
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
};
