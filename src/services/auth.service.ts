import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import User from "../models/User";
import { UserAuth } from "./../dtos/auth.dto";
import { NotFound } from "./../errors/validation";

class AuthService {
    async auth(authData: UserAuth) {
        const user = await User.findOne({ email: authData.email }).exec();

        if (!user) {
            return new NotFound("Usuario e/ou senha incorretos");
        }

        const mathPassword = await bcrypt.compare(
            authData.password,
            user.password
        );
        if (!mathPassword) {
            return new NotFound("Usuario e/ou senha incorretos");
        }
        const userData = user.toJSON();
        delete userData.password;

        return {
            token: `Bearer ${sign({ user: userData }, "123456", {
                algorithm: "HS512",
            })}`,
        };
    }
}

export default new AuthService();
