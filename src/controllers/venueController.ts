import { Request, Response } from 'express';
import Venue, { IVenue } from '../models/venue';

// Get all venues
// returns an array of all venues
export const getAllVenues = async (req: Request, res: Response) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err: any) {
    throw new Error('Error retrieving venues!');
  }
}

// Find venues by name
// returns an array of venues with the specified name
export const searchByName = async (req: Request, res: Response) => {
  try {
    const venue = await Venue.find({ name: req.body.name });
    if (!venue) {
      throw new Error('Venue not found');
    }
    res.status(200).json(venue);
  } catch (err: any) {
    res.status(404).json({ message: err.message ?? "Error retrieving venue!" });
  }
}

// Find venues by city
// returns an array of venues within the specified city
export const searchByCity = async (req: Request, res: Response) => {
  try {
    const venue = await Venue.find({ location: req.body.location });
    if (!venue) {
      throw new Error('Venue not found');
    }
    res.status(200).json(venue);
  } catch (err: any) {
    res.status(404).json({ message: err.message ?? "Error retrieving venue!" });
  }
}

// Create a new venue
export const createNewVenue = async (req: Request, res: Response) => {
  const venue = new Venue({
    name: req.body.name,
    location: req.body.location,
    capacity: req.body.capacity,
    genres: req.body.genres,
  });

  try {
    const newVenue = await venue.save();
    res.status(201).json(newVenue);
  } catch (err: any) {
    res.status(404).json({ message: err.message ?? "Error creating venue!" });
  }
};

// update venue by id
export const updateVenueById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, location, capacity, genres } = req.body;
    const updateData: Partial<IVenue> = {};
    if (name) updateData.name = name;
    if (location) updateData.location = location;
    if (capacity) updateData.capacity = capacity;
    if (genres) updateData.genres = genres;

    const updatedVenue = await Venue.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedVenue);

  } catch (err: any) {
    res.status(404).json({ message: err.message ?? "Error updating venue!" });
  }
};