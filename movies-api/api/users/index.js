import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Register or authenticate user
router.post('/', asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, msg: 'Username and password are required.' });
    }

    if (req.query.action === 'register') {
      await registerUser(req, res);
    } else {
      await authenticateUser(req, res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Internal server error.' });
  }
}));

// Register a new user with password validation
async function registerUser(req, res) {
  const { username, password } = req.body;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      msg: 'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.'
    });
  }

  try {
    await User.create({ username, password });
    res.status(201).json({ success: true, msg: 'User successfully created.' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, msg: 'Username already exists.' });
    }
    throw err; // Let outer catch handle it
  }
};

// Authenticate existing user
async function authenticateUser(req, res) {
  const { username, password } = req.body;

  const user = await User.findByUserName(username);
  if (!user) {
    return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
  }

  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    const token = jwt.sign({ username: user.username }, process.env.SECRET);
    res.status(200).json({ success: true, token: 'BEARER ' + token });
  } else {
    res.status(401).json({ success: false, msg: 'Wrong password.' });
  }
};

export default router;
