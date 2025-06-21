import express from 'express';
import {
  createRent,
  getMyRents,
  getAllRents,
  getRentById,
  updateRent,
  approveRent,
  rejectRent,
  markAsReturned,
} from '../controllers/rentController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ===== User Routes =====
// User creates rent request
router.post('/', protect, createRent);

// User views own rents
router.get('/mine', protect, getMyRents);

// ===== Admin Routes =====
// Admin views all rents
router.get('/', protect, adminOnly, getAllRents);

// Admin views rent by ID
router.get('/:id', protect, adminOnly, getRentById);

// Admin updates rent info (e.g. status, return date)
router.put('/:id', protect, adminOnly, updateRent);


// Admin approves rent (sets rentDate, expectedReturnDate, makes book unavailable)
router.put('/approve/:id', protect, adminOnly, approveRent);

// Admin rejects rent request
router.put('/reject/:id', protect, adminOnly, rejectRent);

// Admin marks book as returned (sets returnDate, calculates late fee, makes book available)
router.put('/return/:id', protect, adminOnly, markAsReturned);

export default router;
