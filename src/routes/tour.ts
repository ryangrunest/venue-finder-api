import { Router } from "express";
import { getAllTours, getToursByUserId, getToursByTourName, createTour, addEventToTour } from "../controllers/tourController";

const router = Router();

// Get all tours
router.get('/', getAllTours)

// get all tours by user id
router.get('/user/:userId', getToursByUserId);

// get tour by name
router.post('/find-by-name', getToursByTourName);

// add event date to tour
router.post('/:tourId/add-event', addEventToTour);

// create a new tour
router.post('/create', createTour);

export default router;

