import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  role: "admin" | "staff" | "guest";
}

const UserSchema = new Schema<IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: {type: String,enum: ["admin", "staff", "guest"],default: "guest",},
  },
  { timestamps: true },
);

const UserModel = models.User || model("User", UserSchema);
export default UserModel;