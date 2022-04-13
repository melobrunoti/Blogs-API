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

const getById = async (id) => {

  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    return false;
  }

  return post;
};

module.exports = {
  create,
  getAll,
  getById,
};