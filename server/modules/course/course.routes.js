import { Router } from 'express';
import { CourseController } from './course.controller.js';

const router = Router();

router.get('/courses', CourseController.getAll);
router.get('/courses/:courseId', CourseController.getById);

export default router;
