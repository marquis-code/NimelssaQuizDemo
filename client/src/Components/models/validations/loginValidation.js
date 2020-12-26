const Joi = require("@hapi/joi");

const loginSchema = Joi.object({
  matric: Joi.number().required(),

  password: Joi.string()
  .min(8)
  .max(250)
  .required()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,12}$/)
});

module.exports = { loginSchema };



