import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

console.log('Hello user');

mongoose
  .connect('mongodb://127.0.0.1:27017/userSync')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: String,
    password: String,
  })
);

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = new User({ name, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error in registration' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password });
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid name or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on localhost:5000');
});
