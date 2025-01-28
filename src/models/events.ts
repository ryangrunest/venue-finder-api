import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  name: string;
  date: string;
  venueId: string;
  userId: string;
  startTime: string;
  endTime: string;
  isOver18: boolean;
  isOver21: boolean;
  notes: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  venueId: { type: String, required: false },
  userId: { type: String, required: true },
  startTime: { type: String, required: true }, // 24 hour format
  endTime: { type: String, required: true }, // 24 hour format
  isOver18: { type: Boolean, required: true },
  isOver21: { type: Boolean, required: true },
  notes: { type: String, required: false }
});

export default mongoose.model<IEvent>('Event', EventSchema);