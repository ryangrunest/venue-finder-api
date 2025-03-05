import express, { Request, Response } from 'express';
import { addEvent } from '../controllers/eventController';

const router = express.Router();

router.post('/add-event', (req: Request, res: Response) => { addEvent(req, res) })

export default router;