const { BlogPost, Category, User } = require('../models');

const create = async (userId, title, categoryIds, content) => {
  const newPost = await BlogPost.create({ userId, title, content });

  await newPost.setCategories(categoryIds);

  return newPost;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = {
  create,
  getAll,
};