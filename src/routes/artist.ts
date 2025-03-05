import express, { Request, Response } from 'express';
import { addEventToArtist } from '../controllers/artistController';

const router = express.Router();

router.post('/add-event', (req: Request, res: Response) => {
  addEventToArtist(req, res);
});


export default router;