import express from 'express';
import { addEvent } from '../controllers/eventController';

const router = express.Router();

router.post('/add-event', addEvent)

export default router;