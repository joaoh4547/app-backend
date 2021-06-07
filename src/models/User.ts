import { prop, getModelForClass } from "@typegoose/typegoose";

class User {
    @prop({ required: true })
    first_name: string;
    @prop({ required: false })
    last_name: string;
    @prop({
        required: true,
        validate: {
            validator: (value) => {
                return value.match(
                    /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                );
            },
            message: "Email invalido",
        },
        unique: true,
    })
    email: string;

    @prop({})
    password: string;
}

export default getModelForClass(User, { schemaOptions: { timestamps: true } });
