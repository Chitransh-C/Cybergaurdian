import { badgeService } from './badge.service.js';
import asyncHandler from '../../shared/middleware/async.handler.js';

export class BadgeController {
  static getAll = asyncHandler(async (req, res) => {
    const badges = await badgeService.getAllBadges();
    return res.json({
      success: true,
      badges
    });
  });
}

export default BadgeController;
