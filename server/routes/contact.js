import { Router } from 'express';
import { 
  submitContact, 
  getContacts, 
  getContact, 
  markAsRead, 
  deleteContact 
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public routes
router.post('/',          contactLimiter, submitContact);

// Admin routes
router.get('/',           protect, getContacts);
router.get('/:id',        protect, getContact);
router.patch('/:id/read', protect, markAsRead);
router.delete('/:id',     protect, deleteContact);

export default router;
