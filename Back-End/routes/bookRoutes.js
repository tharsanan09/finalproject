import express from 'express';
import * as ctrl from '../controllers/bookController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/Upload.js';
import { createBook } from '../controllers/bookController.js';


const router = express.Router();

//  Public routes (users + admin)
router.get('/', ctrl.getBooks);
router.get('/:id', ctrl.getBook);

//  Admin-only routes
router.post('/', protect, adminOnly, ctrl.createBook);
router.put('/:id', protect, adminOnly, ctrl.updateBook);
router.delete('/:id', protect, adminOnly, ctrl.deleteBook);
router.post('/', protect, adminOnly, upload.single('image'), createBook);


export default router;
