const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const login = async (user) => {
  const { email, password } = user;

  const userLogin = await User.findOne({ where: {
     [Op.and]: [{ email }, { password }] },
  });

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: userLogin }, process.env.JWT_SECRET, jwtConfig);

  if (!userLogin) {
    return false;
  }
  return token;
};

module.exports = {
  login,
};