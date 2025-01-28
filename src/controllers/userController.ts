import { Response, Request } from "express";
import User from '../models/user';

export const updateUser = async (req: Request, res: Response) => {
  try {
    // get user from db
    const { id } = req.body;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(updatedUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message ?? 'Error updating user' });
  }
};