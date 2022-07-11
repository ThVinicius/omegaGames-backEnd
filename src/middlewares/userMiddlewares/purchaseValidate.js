import purchaseSchema from "../../schemas/userSchemas/purchaseSchema.js";
export default function purchaseValidate(req, res, next) {
  const { error } = purchaseSchema.validate(req.body);

  if (error) return res.sendStatus(400);

  next();
}
