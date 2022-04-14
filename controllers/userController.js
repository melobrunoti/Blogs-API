const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authentication');
const { validateUser } = require('../middlewares/validations');
const userService = require('../services/userService');

require('dotenv').config();

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const newUser = await userService.createUser({ displayName, email, password, image });

    if (!newUser) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    
    const token = jwt.sign({ data: newUser }, process.env.JWT_SECRET, jwtConfig);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something got wrong' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something got wrong' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const users = await userService.getById(id);
    if (!users) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something got wrong' });
  }
});

router.delete('/me', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user.data;
    await userService.deleteUser({ id });
  
    res.status(204).end();
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something got wrong' });
  }
});

module.exports = router;