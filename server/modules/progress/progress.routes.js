import { Router } from 'express';
import { ProgressController } from './progress.controller.js';

const router = Router();

router.post('/progress/task', ProgressController.recordTask);
router.post('/progress/module', ProgressController.completeModule);
router.post('/progress/quiz', ProgressController.recordQuiz);

export default router;
