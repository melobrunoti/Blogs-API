const Joi = require('joi');

const updateScheme = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  categoryIds: Joi.array(),
});

module.exports = { updateScheme };