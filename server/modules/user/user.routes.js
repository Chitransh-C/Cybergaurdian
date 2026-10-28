import { Router } from 'express';
import { UserController } from './user.controller.js';

const router = Router();

router.get('/user/profile/:userId', UserController.getProfile);
router.put('/user/profile/:userId', UserController.updateProfile);

export default router;
