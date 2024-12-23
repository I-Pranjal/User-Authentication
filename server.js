import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './models/users.js';


const app = express();
app.use(bodyParser.json());
app.use(cors());

console.log('Hello user');

mongoose
  .connect('mongodb://127.0.0.1:27017/userSync')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));



// Define a validation schema for Users
const userSchema = Joi.object({
  name: Joi.string().max(30).required(),
  password: Joi.string().min(8).required(),
});

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  // Backend validation before saving
  const { error } = userSchema.validate({ name, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Hashing the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ name, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error in registration' });
  }
});


// --------------------------------------------------------------------------------------------------------------------------------------------

// Login Route
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, role: user.role },
      'nitjsr',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
});

// Middleware for Protected Routes
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, 'nitjsr'); 
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};



// Start Server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
