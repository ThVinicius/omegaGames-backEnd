import Joi from "joi";

const changeRatingSchema = Joi.object({
  initialValue: Joi.number().required(),
  newValue: Joi.number().greater(0).required()
});

export default changeRatingSchema;
