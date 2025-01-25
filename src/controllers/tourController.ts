import { Request, Response } from 'express';
import { Tour } from '../models/tours'

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err: any) {
    res.status(500).json({ message: err.message ?? "Error retrieving tours!" });
  }
};

export const getToursByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const tours = await Tour.find({ associatedUserId: userId });

    if (tours.length === 0) {
      res.status(404).send(`No tours found for user with id: ${userId}`);
    }

    res.json(tours);
  } catch (err: any) {
    res.status(500).json({ message: err.message ?? "Error retrieving tours!" });
  }
};

export const getToursByTourName = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const tours = await Tour.find({ name });

    if (tours.length === 0) {
      res.status(404).send(`No tours found: ${name}`);
    } else {
      res.json(tours);
    }

  } catch (err: any) {
    res.status(500).json({ message: err.message ?? "Error retrieving tours!" });
  }
};

export const addEventToTour = async (req: Request, res: Response) => {
  const { tourId } = req.params;
  const { date, venueId, startTime, endTime, isOver18, isOver21, notes } = req.body;

  try {
    const tour = await Tour.findById(tourId);

    if (!tour) {
      throw new Error('Tour not found!');
    }

    tour?.events.push({ date, venueId, startTime, endTime, isOver18, isOver21, notes });
    await tour?.save();
    res.status(200).json(tour);
  } catch (err: any) {
    res.status(404).json({ message: err.message ?? "Error adding event to tour!" });
  }
}

export const createTour = async (req: Request, res: Response) => {
  const tour = new Tour({
    name: req.body.name,
    description: req.body.description,
    eventDates: req.body.eventDates,
    associatedUserId: req.body.associatedUserId,
  });

  try {
    const newTour = await tour.save();
    res.status(201).json(newTour);
  } catch (err: any) {
    res.status(404).json({ message: err.message ?? "Error creating tour!" });
  }
}

