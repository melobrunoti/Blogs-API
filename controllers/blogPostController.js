const express = require('express');

const router = express.Router();
const postService = require('../services/blogPostsService');
const authMiddleware = require('../middlewares/authentication');
/* const { createPostAndCategory } = require('../services/postCategoriesService'); */
const { validateCategoryExists, validatePost } = require('../middlewares/validations');

router.post('/', authMiddleware, validatePost, validateCategoryExists, async (req, res) => {
  const { id: userId } = req.user.data;
  const { title, content, categoryIds } = req.body;

    const newPost = await postService.create(userId, title, categoryIds, content);

    res.status(201).json(newPost);
});

module.exports = router;