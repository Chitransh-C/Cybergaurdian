import { userService } from './user.service.js';
import ApiResponse from '../../shared/utils/response.util.js';
import asyncHandler from '../../shared/middleware/async.handler.js';

export class UserController {
  static getProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const profile = await userService.getCadetProfile(userId);
    return res.json({
      success: true,
      ...profile
    });
  });

  static updateProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const updated = await userService.updateCadetProfile(userId, req.body);
    return res.json({
      success: true,
      user: updated
    });
  });
}

export default UserController;
