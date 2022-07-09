import paramsSchema from "../../schemas/userSchemas/paramsSchema.js";

export default function paramsValidate(req, res, next) {
  const { error } = paramsSchema.validate(req.params);

  if (error) return res.sendStatus(500);

  next();
}
