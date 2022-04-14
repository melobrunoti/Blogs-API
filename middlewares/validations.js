const { categoryScheme } = require('../helpers/categoryScheme');
const { loginScheme } = require('../helpers/loginScheme');
const { userScheme } = require('../helpers/userScheme');
const { postScheme } = require('../helpers/postScheme');
const categoriesService = require('../services/categoriesService');
const postService = require('../services/blogPostsService');
const { updateScheme } = require('../helpers/updateScheme');

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
     const categories = await categoriesService.getById(id);
     if (!categories) {
       result = false;
     }
    }));
    if (!result) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
};

const validateUserId = async (req, res, next) => {
  const { id: getId } = req.params;
  const post = await postService.getById(getId);
  const { id } = req.user.data;

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

 if (post.userId !== id) {
  return res.status(401).json({ message: 'Unauthorized user' });
 }  

 next();
};

const validateUpdatePost = (req, res, next) => {
  const { categoryIds } = req.body;
  const { error } = updateScheme.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  if (categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }
  next();
};

module.exports = {
  validateUser,
  validateLogin,
  validateCategory,
  validatePost,
  validateCategoryExists,
  validateUpdatePost,
  validateUserId,
};