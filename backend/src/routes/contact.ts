import express from 'express';
import { sendContactMessage, getContactMessages, deleteContactMessage } from '../controllers/contact.js';
import { isAuthenticated } from '../middleware/auth.js';
import { validateContactForm } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/', validateContactForm, sendContactMessage);

// Protected routes (require authentication)
router.get('/', isAuthenticated, getContactMessages);
router.delete('/:id', isAuthenticated, deleteContactMessage);

export default router; 