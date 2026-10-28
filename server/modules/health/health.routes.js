import { Router } from 'express';
import { HealthController } from './health.controller.js';

const router = Router();

router.get('/health', HealthController.getHealth);
router.get('/db/status', HealthController.getDbStats);

export default router;
