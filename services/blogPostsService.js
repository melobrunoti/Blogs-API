const { BlogPost } = require('../models');

const create = async (userId, title, categoryIds, content) => {
  const newPost = await BlogPost.create({ userId, title, content });

  await newPost.setCategories(categoryIds);

  return newPost;
};

module.exports = {
  create,
};