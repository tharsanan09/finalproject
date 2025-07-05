import express from 'express';
import {
  createRent,
  getMyRents,
  getAllRents,
  getRentById,
  updateRent,
  approveRent,
  rejectRent,
  markAsReturned
} from '../controllers/rentController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ===== USER ROUTES =====
router.post('/', protect, createRent);
router.get('/mine', protect, getMyRents);


// ===== ADMIN ROUTES =====
router.get('/', protect, adminOnly, getAllRents);
router.get('/:id', protect, adminOnly, getRentById);
router.put('/:id', protect, adminOnly, updateRent);
router.put('/approve/:id', protect, adminOnly, approveRent);
router.put('/reject/:id', protect, adminOnly, rejectRent);
router.put('/return/:id', protect, adminOnly, markAsReturned);


export default router;
