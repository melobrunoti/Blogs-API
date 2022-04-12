const express = require('express');
/* const jwt = require('jsonwebtoken'); */
const loginService = require('../services/loginService');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const userLogin = await loginService.login({ email, password });
  
    if (!userLogin) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
  
    res.status(200).json({ userLogin });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something got wrong' });
  }
});

module.exports = router;