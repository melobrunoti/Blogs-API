const Joi = require('joi');

const loginScheme = Joi.object({
  email: Joi.string().min(1).email().required(),
  password: Joi.string().min(1).required(),
});

module.exports = { loginScheme };