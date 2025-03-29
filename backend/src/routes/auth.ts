import express from 'express';
import { login, register, getProfile, updateProfile } from '../controllers/auth.js';
import { isAuthenticated } from '../middleware/auth.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);

// Protected routes (require authentication)
router.get('/profile', isAuthenticated, getProfile);
router.put('/profile', isAuthenticated, updateProfile);

export default router; 