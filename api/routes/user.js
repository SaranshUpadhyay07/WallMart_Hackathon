import express from 'express';
import { addBoxes, claimBoxes, getUserByNumber, createUser, getAllUsers } from '../controller/userController.js';

const router = express.Router();

// Add boxes (donate)
router.post('/add', addBoxes);

// Claim boxes (use)
router.post('/use', claimBoxes);

// Get user by number
router.get('/', getUserByNumber);

// Create user
router.post('/create', createUser);

// Get all users for dashboard
router.get('/all', getAllUsers);

export default router;
