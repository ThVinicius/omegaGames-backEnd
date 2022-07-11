import { Router } from "express";
import {
  getHome,
  postGame,
  removeGame,
  getUser,
  changeRating,
  purchase
} from "../controllers/userControllers.js";
import validateUser from "../middlewares/authMiddlewares/validadeUser.js";
import paramsValidate from "../middlewares/userMiddlewares/paramsValidate.js";
import changeRatingValidate from "../middlewares/userMiddlewares/changeRatingValidate.js";
import purchaseValidate from "../middlewares/userMiddlewares/purchaseValidate.js";

const router = Router();

router.get("/games", getHome);
router.post("/cart/:id", paramsValidate, validateUser, postGame);
router.post("/remove/:id", paramsValidate, validateUser, removeGame);
router.get("/user", validateUser, getUser);
router.put(
  "/rating/:id",
  paramsValidate,
  changeRatingValidate,
  validateUser,
  changeRating
);
router.post("/purchase", purchaseValidate, validateUser, purchase);

export default router;
