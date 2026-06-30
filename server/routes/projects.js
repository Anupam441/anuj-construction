import { Router } from 'express';
import { 
  getProjects, 
  getAllProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/',          getProjects);
router.get('/:id',       getProject);

// Admin routes
router.get('/admin/all', protect, getAllProjects);
router.post('/',         protect, createProject);
router.put('/:id',       protect, updateProject);
router.delete('/:id',    protect, deleteProject);

export default router;