const express = require('express');

const router = express.Router();
const categoriesService = require('../services/categoriesService');
const authMiddleware = require('../middlewares/authentication');
const { validateCategory } = require('../middlewares/validations');

router.post('/', authMiddleware, validateCategory, async (req, res) => {
  const { name } = req.body;

    const category = await categoriesService.create({ name });
    res.status(201).json(category);
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something got wrong' });
  }
});

module.exports = router;