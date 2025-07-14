import express from 'express';
import { addBoxes, claimBoxes, loginUser, createUser, getAllUsers, getUserByNumber } from '../controller/userController.js';

const router = express.Router();

// Get user by number (for admin)
router.get('/', getUserByNumber);

// Add boxes (for admin)
router.post('/add', addBoxes);

// Claim boxes (for user)
router.post('/use', claimBoxes);

// Login user
router.post('/login', loginUser);

// Create user
router.post('/create', createUser);

// Get all users for dashboard
router.get('/all', getAllUsers);

export default router;
