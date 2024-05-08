import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {type: String, requried: true, unique: true},
    email: {type: String, requried: true, select: false, unique: true},
    password: {type: String, requried: true, select: false},
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);