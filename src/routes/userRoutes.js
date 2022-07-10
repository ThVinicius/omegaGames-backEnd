import { Router } from "express";
import {
  getHome,
  postGame,
  getUser,
  changeRating,
} from "../controllers/userControllers.js";
import validateUser from "../middlewares/authMiddlewares/validadeUser.js";
import paramsValidate from "../middlewares/userMiddlewares/paramsValidate.js";
import changeRatingValidate from "../middlewares/userMiddlewares/changeRatingValidate.js";

const router = Router();

router.get("/games", getHome);

router.post("/cart/:id", paramsValidate, validateUser, postGame);
router.get("/user", validateUser, getUser);
router.put(
  "/rating/:id",
  paramsValidate,
  changeRatingValidate,
  validateUser,
  changeRating
);

export default router;
