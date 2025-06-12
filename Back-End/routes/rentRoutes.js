import express from 'express';
import * as ctrl from '../controllers/rentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/', protect, ctrl.createRent);
router.get('/my', protect, ctrl.getMyRents);

// Admin routes
router.get('/', protect, adminOnly, ctrl.getAllRents);
router.get('/:id', protect, adminOnly, ctrl.getRent);
router.put('/:id', protect, adminOnly, ctrl.updateRent);
router.delete('/:id', protect, adminOnly, ctrl.deleteRent);

export default router;
