import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().trim().max(17).required(),
  email: Joi.string().email().required(),
  picture: Joi.string()
    .pattern(/(https?:\/\/.*\.(?:png|jpg))/)
    .required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});

export default registerSchema;
