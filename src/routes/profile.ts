import { Router } from "express";
import { updateUser } from "../controllers/userController";

const router = Router();

// update a user
router.put("/update", updateUser);

export default router;