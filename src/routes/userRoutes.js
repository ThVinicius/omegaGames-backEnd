import { Router } from "express";
import { getHome, postGame } from "../controllers/userControllers.js";
import validateUser from "../middlewares/authMiddlewares/validadeUser.js";

const router = Router();

router.get("/games", getHome);
router.post("/cart/:id", validateUser, postGame);

export default router;
