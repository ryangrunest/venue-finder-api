import { Router, Request, Response } from "express";
import { getAllTours, getToursByUserId, getToursByTourName, createTour } from "../controllers/tourController";

const router = Router();

// Get all tours
router.get('/', (req: Request, res: Response) => { getAllTours(req, res) });
// get all tours by user id
router.get('/user/:userId', (req: Request, res: Response) => { getToursByUserId(req, res) });

// get tour by name
router.post('/find-by-name', (req: Request, res: Response) => { getToursByTourName(req, res) });

// add event date to tour
// router.post('/:tourId/add-event', addEventToTour);

// create a new tour
router.post('/create', (req: Request, res: Response) => { createTour(req, res) });

export default router;

