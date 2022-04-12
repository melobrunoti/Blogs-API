const { User } = require('../models');

const createUser = async (user) => {
  const { email } = user;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    return false;
  }

  const newUser = await User.create(user);

  return newUser;
};

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

module.exports = {
  createUser,
  getAll,
};