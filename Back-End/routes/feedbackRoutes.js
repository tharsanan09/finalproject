import express from 'express';
import { createFeedback, getAllFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/', createFeedback); // Submit feedback
router.get('/', getAllFeedback);  // Get all feedback

export default router;
