const { BlogPost, PostCategory } = require('../models');

const create = async (userId, title, categoryIds, content) => {
  const newPost = await BlogPost.create({ userId, title, content });

  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId: newPost.id, categoryId });
  }));
/*   await newPost.setCategories(categoryIds); */

  return newPost;
};

module.exports = {
  create,
};