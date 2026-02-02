import { Schema, model, models, Document } from "mongoose";

export interface IEnquire {
  firstname: string;
  lastname: string;
  email: string;
  subject:string;
  message:string;
}

const HistorySchema = new Schema<IEnquire>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    subject:{ type: String, required: true },
    message:{ type: String, required: true },
  },
  { timestamps: true },
);
const EnquireModel = models.History || model<IEnquire>("History", HistorySchema);
export default EnquireModel;
