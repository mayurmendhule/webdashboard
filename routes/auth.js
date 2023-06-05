const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register new user
router.post('/registers', async (req, res) => {
  try {
    const { username, password, userType } = req.body;
    const newUser = new User({ username, password, userType });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

router.get('/user', (req, res) => {
  // Placeholder logic to fetch user details
  // You can use the user ID or any other identifier to fetch the user from the database
  const userId = req.userId; // Assuming you have the user ID stored in the request object
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json({ user });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch user details' });
    });
});

module.exports = router;

