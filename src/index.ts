import App from "./app";
import "./db";
import envConfig from "./config/env.config";

App.startup(envConfig.SERVER_PORT);
