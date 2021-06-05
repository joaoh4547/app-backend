import { prop, getModelForClass } from "@typegoose/typegoose";

class User {
    @prop({ required: true })
    first_name: string;
    @prop({ required: false })
    last_name: string;
    @prop({
        validate: {
            validator: (v) => {
                return v.match(
                    /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                );
            },
            message: "Email invalido",
        },
        unique: true,
    })
    email: string;

    @prop({ select: false })
    password: string;
}

export default getModelForClass(User, { schemaOptions: { timestamps: true } });
