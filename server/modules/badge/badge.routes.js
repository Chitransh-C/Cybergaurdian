import { Router } from 'express';
import { BadgeController } from './badge.controller.js';

const router = Router();

router.get('/badges', BadgeController.getAll);

export default router;
