const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { phoneNumber, password, emergencyContactOne, emergencyContactTwo, emergencyContactThree, emergencyContactFour, emergencyContactFive } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ phoneNumber, password: hashedPassword, emergencyContactOne, emergencyContactTwo, emergencyContactThree, emergencyContactFour, emergencyContactFive });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/allusers', async (req, res) => {
  
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
router.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Login successful, but no token is sent back
    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


