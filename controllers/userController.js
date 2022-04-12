const express = require('express');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
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
    
    const token = jwt.sign({ data: newUser }, process.env.JWT, jwtConfig);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;