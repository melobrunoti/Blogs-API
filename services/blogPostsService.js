const { BlogPost, Category, User } = require('../models');

const create = async (userId, title, categoryIds, content) => {
  const newPost = await BlogPost.create({ userId, title, content });

  await newPost.setCategories(categoryIds);

  return newPost;
};

const updatePost = async (id, title, content) => {
  console.log({ id });
  const post = await BlogPost.update({
    title,
    content,
  }, { where: { id } });

  if (!post) {
    return false;
  }

  const updatedPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return updatedPost;
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

const deletePost = async (id) => {
  const remove = await BlogPost.destroy({ where: id });

  if (!remove) {
    return false;
  }

  return remove;
};

module.exports = {
  create,
  getAll,
  getById,
  updatePost,
  deletePost,
};