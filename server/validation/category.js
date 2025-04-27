const Joi = require("joi");

const validateCategory = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

module.exports = validateCategory;
