import mongoose, { Document, Schema } from 'mongoose';

export enum IUserType {
  Artist = "artist",
  Venue = "venue",
}

export interface IUser extends Document {
  username: string;
  email: string,
  headline: string,
  website: string,
  description: string
  password: string;
  type: IUserType;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  headline: { type: String, unique: true },
  website: { type: String, unique: true },
  description: { type: String, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true, enum: Object.values(IUserType) },
});

export default mongoose.model<IUser>('User', UserSchema);