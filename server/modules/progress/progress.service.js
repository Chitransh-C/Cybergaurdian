import { progressRepository } from './progress.repository.js';
import { userRepository } from '../user/user.repository.js';
import { ValidationError, NotFoundError } from '../../shared/errors/domain.errors.js';

export class ProgressService {
  constructor(progRepo = progressRepository, userRepo = userRepository) {
    this.progRepo = progRepo;
    this.userRepo = userRepo;
  }

  async recordTaskCompletion(userId, xpGained = 100) {
    if (!userId) {
      throw new ValidationError('userId is required to credit mission XP');
    }
    const currentXp = await this.userRepo.addXP(userId, xpGained);
    return { xp: currentXp };
  }

  async completeModule(userId, courseId, moduleId) {
    if (!userId || !courseId || !moduleId) {
      throw new ValidationError('userId, courseId, and moduleId are required');
    }

    await this.progRepo.markModuleCompleted(userId, courseId, moduleId);
    // Award 250 module completion bonus XP
    const currentXp = await this.userRepo.addXP(userId, 250);

    return {
      message: 'Module completion registered and bonus XP credited',
      xp: currentXp
    };
  }

  async recordQuiz(userId, courseId, moduleId, correct) {
    if (!userId || !courseId || !moduleId) {
      throw new ValidationError('userId, courseId, and moduleId are required');
    }
    await this.progRepo.recordQuizAttempt(userId, courseId, moduleId, !!correct);
    const xp = correct ? await this.userRepo.addXP(userId, 25) : await this.userRepo.findById(userId).then((user) => user?.xp || 0);
    return { xp, correct: !!correct };
  }
}

export const progressService = new ProgressService();
export default progressService;
