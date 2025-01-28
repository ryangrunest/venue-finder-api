import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

// register a new user
export const registerNewUser = async (req: Request, res: Response) => {
  const { username, email, password, type } = req.body;
  console.log('made it here')

  try {
    if (type !== 'artist' && type !== 'venue') {
      throw new Error('Invalid user type!');
    }

    // TODO: add validation checks for username, email, and password

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = {
      username,
      email,
      password: hashedPassword,
      type,
      headline: '',
      website: '',
      description: '',
      events: []
    }
    const user = new User(userObject);
    const newUser = await user.save();

    const token = jwt.sign({ id: newUser._id, username: newUser.username }, secret, { expiresIn: '1h' });

    res.json({
      token, user: {
        username: newUser.username,
        email: newUser.email,
        headline: newUser.headline,
        website: newUser.website,
        description: newUser.description,
        id: newUser._id,
        type: newUser.type,
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).send('Error registering user!');
  }
}

// login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found!');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials!');

    const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1h' });

    res.json({
      token, user: {
        username: user.username,
        email: user.email,
        headline: user.headline,
        website: user.website,
        description: user.description,
        id: user._id,
        type: user.type,
      }
    });
  } catch (err: any) {
    res.status(401).send(err.message ?? 'Unable to authenticate user!');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error('User not found!');
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      headline: user.headline,
      website: user.website,
      description: user.description,
      id: user._id,
      type: user.type,
    });
  } catch (err: any) {
    res.status(404).json({ message: err.message ?? 'Error retrieving user!' });
  }
}