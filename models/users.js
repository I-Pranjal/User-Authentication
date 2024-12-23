import mongoose from "mongoose";
export const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: String,
    password: String,
    role: { type: String, default: 'user' }, // Added a role field for JWT payload
  })
);