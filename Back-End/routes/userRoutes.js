// import express from 'express';

// import * as ctrl from '../controllers/userController.js';
// const router = express.Router();
// router.get('/', ctrl.getUsers);
// router.get('/:id', ctrl.getUser);
// router.put('/:id', ctrl.updateUser);
// router.delete('/:id', ctrl.deleteUser);
// export default router;

import express from 'express';
import {
  getMyProfile,
  updateMyProfile,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Normal user - View own profile
router.get('/me', protect, getMyProfile);
router.put('/me', protect, updateMyProfile);


// Admin-only routes
router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, adminOnly, getUser);
router.put('/:id', protect, adminOnly, updateUser);
router.delete('/:id', protect, adminOnly, deleteUser);


export default router;
