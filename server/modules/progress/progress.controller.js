import { progressService } from './progress.service.js';
import asyncHandler from '../../shared/middleware/async.handler.js';

export class ProgressController {
  static recordTask = asyncHandler(async (req, res) => {
    const { userId, xpGained } = req.body;
    const result = await progressService.recordTaskCompletion(userId, xpGained);
    return res.json({
      success: true,
      ...result
    });
  });

  static recordQuiz = asyncHandler(async (req, res) => {
    const { userId, courseId, moduleId, correct } = req.body;
    const result = await progressService.recordQuiz(userId, courseId, moduleId, correct);
    return res.json({ success: true, ...result });
  });

  static completeModule = asyncHandler(async (req, res) => {
    const { userId, courseId, moduleId } = req.body;
    const result = await progressService.completeModule(userId, courseId, moduleId);
    return res.json({
      success: true,
      ...result
    });
  });
}

export default ProgressController;
