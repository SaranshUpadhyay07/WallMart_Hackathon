import User from '../Model/user.js';

// Add boxes (donate or increment boxes)
export const addBoxes = async (req, res) => {
  try {
    const { number, boxes } = req.body;
    if (!number || typeof boxes !== 'number') {
      return res.status(400).json({ error: 'number and boxes are required' });
    }
    let user = await User.findOne({ number });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.totalBoxesRecycled += boxes;
    user.boxesAvailableToClaim += boxes;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Claim boxes (use boxes)
export const claimBoxes = async (req, res) => {
  try {
    const { number, boxes } = req.body;
    if (!number || typeof boxes !== 'number') {
      return res.status(400).json({ error: 'number and boxes are required' });
    }
    const user = await User.findOne({ number });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.boxesAvailableToClaim < boxes) {
      return res.status(400).json({ error: 'Not enough boxes available to claim' });
    }
    user.boxesAvailableToClaim -= boxes;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user to get details
export const loginUser = async (req, res) => {
  try {
    const { number, password } = req.body;
    if (!number || !password) {
      return res.status(400).json({ error: 'number and password are required' });
    }
    const user = await User.findOne({ number });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const { password: _, ...userDetails } = user.toObject();
    res.json(userDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create user
export const createUser = async (req, res) => {
  try {
    const { name, number, password } = req.body;
    if (!name || !number || !password) {
      return res.status(400).json({ error: 'name, number, and password are required' });
    }
    // Check if user already exists
    let user = await User.findOne({ number });
    if (user) {
      return res.status(409).json({ error: 'User with this number already exists' });
    }
    user = await User.create({ name, number, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by number (for admin to check details)
export const getUserByNumber = async (req, res) => {
  try {
    const { number } = req.query;
    if (!number) {
      return res.status(400).json({ error: 'A number is required' });
    }
    const user = await User.findOne({ number }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users (for dashboard)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
