import { Router } from 'express';
import { LabController } from './lab.controller.js';

const router = Router();

router.post('/lab/log', LabController.logCommand);
router.get('/lab/history', LabController.getHistory);

export default router;
