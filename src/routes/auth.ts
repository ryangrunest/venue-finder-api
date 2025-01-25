import { Router } from 'express';
import { getUserById, loginUser, registerNewUser } from '../controllers/authController';

const router = Router();

// Register a new user
router.post('/register', registerNewUser)

// Login a user
router.post('/login', loginUser)

// get user by id
router.get('/:id', getUserById)

export default router;