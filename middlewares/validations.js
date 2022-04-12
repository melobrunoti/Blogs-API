const { loginScheme } = require('../helpers/loginScheme');
const { userScheme } = require('../helpers/userScheme');

const validateUser = (req, res, next) => {
  const { error } = userScheme.validate(req.body);

  if (error) {
      return res.status(400).json({ message: error.message });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginScheme.validate(req.body);

  if (error) {
      return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = {
  validateUser,
  validateLogin,
};