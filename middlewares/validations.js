const { userScheme } = require('../helpers/userScheme');

const validateLogin = (req, res, next) => {
  const { error } = userScheme.validate(req.body);

  if (error) {
      return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = {
  validateLogin,
};