const Joi = require("@hapi/joi");

const complainSchema = Joi.object({
  level: Joi.number(),
  matric: Joi.number().required(),
  complain: Joi.string().required()
});

module.exports = { complainSchema };



