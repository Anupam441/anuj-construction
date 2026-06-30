import { Router } from 'express';
import { 
  getServices, 
  getAllServices, 
  getService, 
  createService, 
  updateService, 
  deleteService 
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/',          getServices);
router.get('/:id',       getService);

// Admin routes
router.get('/admin/all', protect, getAllServices);
router.post('/',         protect, createService);
router.put('/:id',       protect, updateService);
router.delete('/:id',    protect, deleteService);

export default router;