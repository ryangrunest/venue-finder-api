import { Router, Request, Response } from 'express';
import { getUserById, loginUser, registerNewUser } from '../controllers/authController';

const router = Router();

// Register a new user
router.post('/register', (req: Request, res: Response) => {
  registerNewUser(req, res)
})

// Login a user
router.post('/login', (req: Request, res: Response) => {
  loginUser(req, res)
})

// get user by id
router.get('/:id', (req: Request, res: Response) => {
  getUserById(req, res)
})

export default router;