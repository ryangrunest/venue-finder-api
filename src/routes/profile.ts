import { Request, Response, Router } from "express";
import { updateUser } from "../controllers/userController";

const router = Router();

// update a user
router.put("/update", (req: Request, res: Response) => updateUser(req, res));

export default router;