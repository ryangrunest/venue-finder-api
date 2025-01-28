import { Response, Request } from "express";
import Event from "../models/events";

export const addEvent = async (req: Request, res: Response) => {
  try {
    const { date, venueId, startTime, endTime, isOver18, isOver21, notes } = req.body;

    const event = new Event({
      date,
      venueId,
      startTime,
      endTime,
      isOver18,
      isOver21,
      notes
    });

    const newEvent = await event.save();

    res.json(newEvent);
  } catch (err: any) {
    res.status(500).json({ message: err.message ?? 'Error adding event' });
  }
}