const { Category } = require('../models');

const create = async (category) => {
  const newCategory = await Category.create(category);

  return newCategory;
};

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getById = async (id) => {
  const categories = await Category.findOne({ where: id });

  return categories;
};

module.exports = {
  create,
  getAll,
  getById,
};