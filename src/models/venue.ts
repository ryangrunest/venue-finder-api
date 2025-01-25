import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the music venue document
export interface IVenue extends Document {
  name: string;
  location: string;
  capacity: number;
  genres: string[];
  associatedUserId: string; // account who owns this venue
  // latitude
  // longitude
  // address
  // city
  // state
  // zipCode
  // website
  // phone
  // email
  // social media
  // opening hours
  // closing hours
  // averageTicketPrice
  // rating
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
}

// Define the schema for the music venue
const venueSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  genres: { type: [String], required: true },
});

// Create the Mongoose model for the music venue
const Venue = mongoose.model<IVenue>('Venue', venueSchema);

export default Venue;