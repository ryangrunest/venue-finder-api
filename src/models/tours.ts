import mongoose, { Schema, Document } from 'mongoose';
import { IEvent } from './events';

// Define the interface for the tour model
interface ITour extends Document {
  name: string;
  description: string;
  events: Array<IEvent>;
}

// Define the schema for the tour model
const tourSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  associatedUserId: { type: String, required: true }, // account who owns this tour
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
  ],
});

// Create the mongoose model for the tour
const Tour = mongoose.model<ITour>('Tour', tourSchema);

export { ITour, Tour };