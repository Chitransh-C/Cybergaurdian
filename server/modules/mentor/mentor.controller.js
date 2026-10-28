import asyncHandler from '../../shared/middleware/async.handler.js';
import { ValidationError } from '../../shared/errors/domain.errors.js';
import { replyToCadet } from './mentor.service.js';

export class MentorController {
  static chat = asyncHandler(async (req, res) => {
    const { message, moduleTitle, taskText, taskHint } = req.body || {};
    if (!message || typeof message !== 'string') {
      throw new ValidationError('A message is required');
    }
    if (message.length > 2000) {
      throw new ValidationError('Message exceeds 2000 characters');
    }

    const reply = await replyToCadet({ message, moduleTitle, taskText, taskHint });
    return res.json({ success: true, ...reply });
  });
}

export default MentorController;
