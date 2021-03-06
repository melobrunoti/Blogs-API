const express = require('express');

const router = express.Router();
const postService = require('../services/blogPostsService');
const authMiddleware = require('../middlewares/authentication');
/* const { createPostAndCategory } = require('../services/postCategoriesService'); */
const { validateCategoryExists,
validatePost, validateUpdatePost, validateUserId } = require('../middlewares/validations');

router.post('/', authMiddleware, validatePost, validateCategoryExists, async (req, res) => {
  const { id: userId } = req.user.data;
  const { title, content, categoryIds } = req.body;

    const newPost = await postService.create(userId, title, categoryIds, content);

    res.status(201).json(newPost);
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const categories = await postService.getAll();
    res.status(200).json(categories);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something got wrong' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    res.status(200).json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something got wrong' });
  }
});

router.put('/:id', authMiddleware, validateUserId, validateUpdatePost, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await postService.updatePost(+id, title, content);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    res.status(200).json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something got wrong' });
  }
});

router.delete('/:id', authMiddleware, validateUserId, async (req, res) => {
  try {
    const { id } = req.params;
    await postService.deletePost({ id });
  
    res.status(204).end();
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something got wrong' });
  }
});

module.exports = router;