import { MongoError } from "mongodb";
import { UserCreateDTO } from "./../dtos/user.dto";
import User from "../models/User";
import bcrypt from "bcrypt";
import { Error } from "mongoose";
import ValidationError, { FieldError } from "../errors/validation";

class UserService {
    async findAll() {
        return User.find().exec();
    }

    async findById(id: string) {
        return User.findById(id);
    }
    async create(userdata: UserCreateDTO) {
        let err = new ValidationError();
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

                    err.errors.push(
                        new FieldError(
                            field_name,
                            `Já existe outro usuario com este ${field_name}`
                        )
                    );
                    return err;
                }
            } else if (e instanceof Error) {
                const field_validation = e.message
                    .split("validation failed:")[1]
                    .split(":");
                const field_validation_name = field_validation[0].trim();
                const field_validation_message = field_validation[1].trim();
                err.errors.push(
                    new FieldError(
                        field_validation_name,
                        field_validation_message
                    )
                );
                return err;
            }
        }
    }
}

export default new UserService();
