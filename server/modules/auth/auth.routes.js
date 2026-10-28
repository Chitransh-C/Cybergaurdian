import { Router } from 'express';
import { AuthController } from './auth.controller.js';

const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.get('/auth/session', AuthController.session);

export default router;
