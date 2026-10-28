import { authService } from './auth.service.js';
import asyncHandler from '../../shared/middleware/async.handler.js';

export class AuthController {
  static login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return res.json({
      success: true,
      message: result.message,
      user: result.user,
      token: result.token
    });
  });

  static register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    return res.status(201).json({
      success: true,
      message: result.message,
      user: result.user,
      token: result.token
    });
  });

  static session = asyncHandler(async (req, res) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    const result = await authService.session(token);
    return res.json({ success: true, user: result.user });
  });
}

export default AuthController;
