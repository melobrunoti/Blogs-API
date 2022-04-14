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

const getById = async (id) => {
  const users = await User.findByPk(id);

  if (!users) {
    return false;
  }

  return users;
};

const deleteUser = async (id) => {
  const remove = await User.destroy({ where: id });

  if (!remove) {
    return false;
  }

  return remove;
};

module.exports = {
  createUser,
  getAll,
  getById,
  deleteUser,
};