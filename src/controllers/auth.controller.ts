import { NotFound } from "./../errors/validation";
import { Request, Response } from "express";
import authService from "../services/auth.service";
import { UserAuth } from "../dtos/auth.dto";
import { HTTPStatus } from "../utils/http.status";

class AuthController {
    async auth(req: Request, res: Response) {
        const authData: UserAuth = req.body;
        const data = await authService.auth(authData);
        if (data instanceof NotFound) {
            return res.status(HTTPStatus.BAD_REQUEST).json(data);
        }
        return res.json(data);
    }
}

export default new AuthController();
