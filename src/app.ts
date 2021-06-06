import Express, { Application } from "express";
import morgan from "morgan";
import router from "./routes/";

class App {
    private app: Application;

    constructor() {
        this.app = Express();
        this.middlewares();
    }

    async middlewares() {
        this.app.use(morgan("dev")).use(Express.json());
        this.app.use("/api", router);
    }

    static startup(port: number | string) {
        new App().app.listen(port, () => {
            console.log(`App Listen on Port: ${port}`);
        });
    }
}

export default App;
