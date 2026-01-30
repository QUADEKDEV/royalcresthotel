import { Schema, model, models, Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
  roomNumber:number;
  description: string;
  price: number;
  capacity: number;
  size: string;
  image: string;
  amenities: string[];
  category:"Classic" | "Wellness" | "Penthouse"| "Signature";
}

const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    roomNumber: { type: Number, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    size: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    amenities: { type: [String], default: [] },
  },
  { timestamps: true },
);
const RoomModel = models.Room || model<IRoom>("Room", RoomSchema);
export default RoomModel;
