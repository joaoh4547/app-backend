import { MongoError } from "mongodb";
import { UserCreateDTO } from "./../dtos/user.dto";
import User from "../models/User";
import bcrypt from "bcrypt";
import ValidationError, { FieldError } from "../errors/validation";

class UserService {
    async findAll() {
        return User.find().exec();
    }

    async create(userdata: UserCreateDTO) {
        try {
            userdata.password = await bcrypt.hash(userdata.password, 8);
            const user = (await User.create(userdata)).toJSON();
            delete user.password;
            return user;
        } catch (e) {
            if (e instanceof MongoError) {
                if (e.code === 11000) {
                    var field = e.message
                        .split("dup key")[1]
                        .split(":")[1]
                        .replace("{", "");

                    const field_name = field.trim();

                    let err = new ValidationError();
                    err.errors.push(
                        new FieldError(
                            field_name,
                            `Já existe outro usuario com este ${field_name}`
                        )
                    );
                    return err;
                }
            }
        }
    }

    async findById(id: string) {
        return User.findById(id);
    }
}

export default new UserService();
