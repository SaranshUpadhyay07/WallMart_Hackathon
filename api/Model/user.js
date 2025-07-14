import mongoose from 'mongoose';
import connect from '../db/connect.js';

// User schema for tracking donated boxes for reuse
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true }, // number is now unique
  password: { type: String, required: true }, // Optional: if you want to add authentication
    totalBoxesRecycled: { type: Number, default: 0 },
  boxesAvailableToClaim: { type: Number, default: 0 },
  // Optionally, you can add more fields like donation history, timestamps, etc.
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
