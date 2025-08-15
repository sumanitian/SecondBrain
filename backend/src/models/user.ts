import { Document, Schema, model } from "mongoose";
import { lowercase } from "zod";
import { required } from "zod/v4/core/util.cjs";

interface User extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<User>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
    },
    { timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;