import { Router } from 'express';
import { 
  getTestimonials, 
  getAllTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/',          getTestimonials);

// Admin routes
router.get('/admin/all', protect, getAllTestimonials);
router.post('/',         protect, createTestimonial);
router.put('/:id',       protect, updateTestimonial);
router.delete('/:id',    protect, deleteTestimonial);

export default router;