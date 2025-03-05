import { Router, Request, Response } from 'express';
import { createNewVenue, getAllVenues, searchByCity, searchByName, updateVenueById } from '../controllers/venueController';

const router = Router();

// Get all venues
// returns an array of all venues
router.get('/', (req: Request, res: Response) => { getAllVenues(req, res) })

// Find venues by name
// returns an array of venues with the specified name
router.post('/search-by-name', (req: Request, res: Response) => { searchByName(req, res) })

// Find venues by city
// returns an array of venues within the specified city
router.post('/search-by-city', (req: Request, res: Response) => { searchByCity(req, res) })

// Create a new venue
router.post('/', (req: Request, res: Response) => { createNewVenue(req, res) })

// update venue by id
router.put('/update/:id', (req: Request, res: Response) => { updateVenueById(req, res) })

export default router;