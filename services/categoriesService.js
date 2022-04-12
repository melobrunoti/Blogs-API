const { Category } = require('../models');

const create = async (category) => {
  const newCategory = await Category.create(category);

  return newCategory;
};

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  create,
  getAll,
};