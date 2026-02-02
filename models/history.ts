import { Schema, model, models, Document } from "mongoose";

export interface IHistory {
  roomId: string;
  email: string;
  days: string[];
  paymentReference:string;
}

const HistorySchema = new Schema<IHistory>(
  {
    roomId: { type: String, required: true },
    email: { type: String, required: true },
    days: { type: [String], default: [] },
    paymentReference: { type: String,},
  },
  { timestamps: true },
);
const HistoryModel = models.History || model<IHistory>("History", HistorySchema);
export default HistoryModel;
