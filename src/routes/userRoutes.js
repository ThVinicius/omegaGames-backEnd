import { Router } from "express";
<<<<<<< HEAD
import { getHome, postGame } from "../controllers/userControllers.js";
import validateUser from "../middlewares/authMiddlewares/validadeUser.js";
=======
import {
  getHome,
  postGame,
  getUser,
  changeRating
} from "../controllers/userControllers.js";
import validateUser from "../middlewares/authMiddlewares/validadeUser.js";
import paramsValidate from "../middlewares/userMiddlewares/paramsValidate.js";
import changeRatingValidate from "../middlewares/userMiddlewares/changeRatingValidate.js";
>>>>>>> db23ff8b6124d00962f8d8ce1d61489ff89d26d5

const router = Router();

router.get("/games", getHome);
<<<<<<< HEAD
router.post("/cart/:id", validateUser, postGame);
=======
router.post("/cart/:id", paramsValidate, validateUser, postGame);
router.get("/user", validateUser, getUser);
router.put(
  "/rating/:id",
  paramsValidate,
  changeRatingValidate,
  validateUser,
  changeRating
);
>>>>>>> db23ff8b6124d00962f8d8ce1d61489ff89d26d5

export default router;
