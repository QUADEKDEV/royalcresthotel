import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  phone:string;
  password: string;
  isAdmin:boolean;
}

const UserSchema = new Schema<IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const UserModel = models.User || model("User", UserSchema);
export default UserModel;