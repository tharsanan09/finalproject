import express from 'express';
import * as ctrl from '../controllers/userController.js';
const router = express.Router();
router.get('/', ctrl.getUsers);
router.get('/:id', ctrl.getUser);
router.put('/:id', ctrl.updateUser);
router.delete('/:id', ctrl.deleteUser);
export default router;