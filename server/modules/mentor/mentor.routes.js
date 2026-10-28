import { Router } from 'express';
import { MentorController } from './mentor.controller.js';

const router = Router();

router.post('/mentor/chat', MentorController.chat);

export default router;
