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

module.exports = router;