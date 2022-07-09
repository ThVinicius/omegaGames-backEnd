import changeRatingSchema from "../../schemas/userSchemas/changeRatingSchema.js";

export default function changeRatingValidate(req, res, next) {
  const { error } = changeRatingSchema.validate(req.body);

  if (error) return res.sendStatus(400);

  next();
}
