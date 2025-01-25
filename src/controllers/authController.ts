import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

// register a new user
export const registerNewUser = async (req: Request, res: Response) => {
  const { username, password, type } = req.body;
  console.log('made it here')

  try {
    if (type !== 'artist' && type !== 'venue') {
      throw new Error('Invalid user type!');
    }

    console.log('made it past type check');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, type });
    const newUser = await user.save();

    const token = jwt.sign({ id: newUser._id, username: newUser.username }, secret, { expiresIn: '1h' });
    res.json({ token, user: { username: newUser.username, id: newUser._id, type: newUser.type, events: newUser.events } });

  } catch (err) {
    res.status(500).send('Error registering user!');
  }
}

// login a user
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found!');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials!');

    const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1h' });
    res.json({ token, user: { username: user.username, id: user._id, type: user.type, events: user.events } });
  } catch (err: any) {
    res.status(401).send('Unable to authenticate user!');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error('User not found!');
    }

    res.status(200).json({ username: user.username, id: user._id, type: user.type, events: user.events });
  } catch (err: any) {
    res.status(404).json({ message: err.message ?? 'Error retrieving user!' });
  }
}