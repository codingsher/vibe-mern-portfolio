import express from 'express';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projects.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes (require authentication)
router.post('/', isAuthenticated, createProject);
router.put('/:id', isAuthenticated, updateProject);
router.delete('/:id', isAuthenticated, deleteProject);

export default router; 