import Joi from "joi";

const paramsSchema = Joi.object({ id: Joi.string().length(24).required() });

export default paramsSchema;
