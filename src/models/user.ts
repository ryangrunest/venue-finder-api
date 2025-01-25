import mongoose, { Document, Schema } from 'mongoose';
import { IEvent } from './events';

export enum IUserType {
  Artist = "artist",
  Venue = "venue",
}

export interface IUser extends Document {
  username: string;
  password: string;
  type: IUserType;
  events: IEvent[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true, enum: Object.values(IUserType) },
  events: [
    {
      date: { type: Date, required: true },
      venueId: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      isOver18: { type: Boolean, required: true },
      isOver21: { type: Boolean, required: true },
      notes: { type: String, required: true },
    },
  ]
});

export default mongoose.model<IUser>('User', UserSchema);