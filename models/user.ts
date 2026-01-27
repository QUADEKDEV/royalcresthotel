import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true ,select:false},
  },
  { timestamps: true }
);

const UserModel = models.User || model("User", UserSchema);
export default UserModel;