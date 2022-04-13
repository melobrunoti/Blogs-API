const { categoryScheme } = require('../helpers/categoryScheme');
const { loginScheme } = require('../helpers/loginScheme');
const { userScheme } = require('../helpers/userScheme');
const { postScheme } = require('../helpers/postScheme');
const categoriesService = require('../services/categoriesService');
const { Category } = require("../models");

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

const validateCategory = (req, res, next) => {
  const { error } = categoryScheme.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const validatePost = (req, res, next) => {
  const { error } = postScheme.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const validateCategoryExists = async (req, res, next) => {
  const { categoryIds } = req.body;
    let result = true;
     await Promise.all(categoryIds.map(async (id) => {
     const categories = await Category.findOne({ where: id });
     if (!categories) {
       result = false;
     }
    }));
    if (!result) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
};

module.exports = {
  validateUser,
  validateLogin,
  validateCategory,
  validatePost,
  validateCategoryExists,
};