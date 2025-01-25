import express from 'express';
import { addEventToArtist } from '../controllers/artistController';

const router = express.Router();

router.post('/add-event', addEventToArtist);

export default router;