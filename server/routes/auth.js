import { Router } from 'express';
import { login, logout, getMe, changePassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login',          authLimiter, login);
router.post('/logout',         protect,     logout);
router.get('/me',              protect,     getMe);
router.put('/change-password', protect,     changePassword);

export default router;