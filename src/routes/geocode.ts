import express, { Request, Response } from "express";
import { convertAddressToCoordinates } from "../controllers/geocodeController";

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  convertAddressToCoordinates(req, res);
});

export default router;