import Joi from "joi";

const purchaseSchema = Joi.array().items(
  Joi.object({
    _id: Joi.string().length(24).required(),
    userRating: Joi.number().valid(0).strict().required(),
    name: Joi.string().trim().required(),
    price: Joi.number().required(),
    url: Joi.string().uri().required()
  })
);

export default purchaseSchema;
