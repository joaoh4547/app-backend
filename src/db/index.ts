import mongoose from "mongoose";
import envConfig from "../config/env.config";

(async () => {
    await mongoose.connect(envConfig.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: envConfig.DB_NAME,
        auth: {
            user: envConfig.DB_USER,
            password: envConfig.DB_PASS,
        },
    });

    console.log("Database Conectado");
})();
