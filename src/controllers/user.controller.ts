import { Request, Response } from "express";
import { HTTPStatus } from "../utils/http.status";
import { UserCreateDTO, UserUpdateDTO } from "./../dtos/user.dto";
import ValidationError, { NotFound } from "../errors/validation";
import UserService from "./../services/user.service";

class UserController {
    async findAll(_: Request, res: Response) {
        const users = await UserService.findAll();
        return res.json(users);
    }

    async findById(req: Request, res: Response) {
        const id = req.params.id;
        const user = await UserService.findById(id);

        return res.json(user);
    }

    async create(req: Request, res: Response) {
        const userdata: UserCreateDTO = req.body;
        const user = await UserService.create(userdata);

        if (user instanceof ValidationError) {
            return res.status(HTTPStatus.BAD_REQUEST).json(user);
        }
        return res.status(HTTPStatus.CREATED).json(user);
    }

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const datauser = req.body as UserUpdateDTO;
        const data = await UserService.update({ id, ...datauser });
        if (data instanceof NotFound) {
            return res.status(HTTPStatus.NOT_FOUND).json(data);
        }
        return res.status(HTTPStatus.OK).json(data);
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        await UserService.delete(id);
        return res.status(HTTPStatus.NO_CONTENT).json();
    }
}

export default new UserController();
