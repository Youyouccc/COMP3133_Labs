// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST API to insert a new user into MongoDB
router.post('/', async (req, res) => {
  const { username, email, city, website, zipCode, phone } = req.body;

  try {
    // Create a new User instance with validation
    const newUser = new User({
      username,
      email,
      city,
      website,
      zipCode,
      phone
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

module.exports = router;
