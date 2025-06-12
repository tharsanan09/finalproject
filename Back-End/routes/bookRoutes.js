import express from 'express';
import * as ctrl from '../controllers/bookController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Public routes (users + admin)
router.get('/', ctrl.getBooks);
router.get('/:id', ctrl.getBook);

// ✅ Admin-only routes
router.post('/', protect, adminOnly, ctrl.createBook);
router.put('/:id', protect, adminOnly, ctrl.updateBook);
router.delete('/:id', protect, adminOnly, ctrl.deleteBook);

export default router;
