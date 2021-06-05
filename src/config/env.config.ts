import { config } from "dotenv";

interface Env {
    DB_URL: string | undefined;
    SERVER_PORT: number | undefined;
    DB_NAME: string | undefined;
}

const data = config();

export default (data.parsed as unknown as Env) || null;
