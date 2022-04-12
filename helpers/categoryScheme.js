const Joi = require('joi');

const categoryScheme = Joi.object({
  name: Joi.string().min(1).required(),
});

module.exports = { categoryScheme };