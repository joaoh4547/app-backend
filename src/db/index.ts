import mongoose from "mongoose";
import envConfig from "../config/env.config";

(async () => {
    await mongoose.connect(envConfig.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: envConfig.DB_NAME,
    });

    console.log("Database Conectado");
})();
