import { labService } from './lab.service.js';
import asyncHandler from '../../shared/middleware/async.handler.js';

export class LabController {
  static logCommand = asyncHandler(async (req, res) => {
    await labService.recordCommandLog(req.body);
    return res.json({ success: true });
  });

  static getHistory = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit || '50', 10);
    const logs = await labService.getCommandHistory(limit);
    return res.json({
      success: true,
      logs
    });
  });
}

export default LabController;
