import express from 'express';
import {
  postFeedback,
  getMyFeedback,
  getAllFeedback,
  updateFeedback,
  deleteFeedback
} from '../controllers/feedbackController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

//  User can post feedback
router.post('/', protect, postFeedback);

//  User view own feedback
router.get('/my', protect, getMyFeedback);

//  Admin: View all feedback
router.get('/', protect, adminOnly, getAllFeedback);

//  Admin: Edit feedback
router.put('/:id', protect, adminOnly, updateFeedback);

//  Admin: Delete feedback
router.delete('/:id', protect, adminOnly, deleteFeedback);

export default router;
