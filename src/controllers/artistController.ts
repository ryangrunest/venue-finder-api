import { Response, Request } from "express";
import User from '../models/user';

export const addEventToArtist = async (req: Request, res: Response) => {
  try {

    // get user from db
    const user = await User.findById(req.body.userId);
    const { date, venueId, startTime, endTime, isOver18, isOver21, notes } = req.body;

    // if not a user
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isArtist = user?.type === 'artist';

    // if not an artist
    if (!isArtist) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    // if an artist
    if (isArtist) {
      // Add an event to the user
      user.events.push({ date, venueId, startTime, endTime, isOver18, isOver21, notes });
      await user.save();

      res.json({ username: user.username, id: user._id, type: user.type, events: user.events });

    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message ?? 'Error adding event' });
  }
};
