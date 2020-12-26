const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).max(64).required(),

  matric: Joi.number().required(),
  
  email: Joi.string()
  .email()
  .trim()
  .required()
  .regex(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/),

  password: Joi.string()
  .min(8)
  .max(250)
  .required()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,12}$/),

  confirmPassword: Joi.string()
  .min(8)
  .max(250)
  .required()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,12}$/),

  role: Joi.string(),
});

module.exports = { registerSchema };



