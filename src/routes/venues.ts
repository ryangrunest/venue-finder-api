import { Router } from 'express';
import { createNewVenue, getAllVenues, searchByCity, searchByName, updateVenueById } from '../controllers/venueController';

const router = Router();

// Get all venues
// returns an array of all venues
router.get('/', getAllVenues)

// Find venues by name
// returns an array of venues with the specified name
router.post('/search-by-name', searchByName)

// Find venues by city
// returns an array of venues within the specified city
router.post('/search-by-city', searchByCity)

// Create a new venue
router.post('/', createNewVenue)

// update venue by id
router.put('/update/:id', updateVenueById);

export default router;