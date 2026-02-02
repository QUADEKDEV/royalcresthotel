import { Schema, model, models } from "mongoose";

export interface IEnquire {
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
}

const EnquireSchema = new Schema<IEnquire>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

const EnquireModel =
  models.Enquire || model<IEnquire>("Enquire", EnquireSchema);

export default EnquireModel;
