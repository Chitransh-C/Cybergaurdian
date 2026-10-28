import { userRepository } from './user.repository.js';
import { NotFoundError } from '../../shared/errors/domain.errors.js';

/**
 * User Service
 * Encapsulates domain logic for Cadet management.
 */
export class UserService {
  constructor(userRepo = userRepository) {
    this.userRepo = userRepo;
  }

  async getCadetProfile(userId) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError('Cadet User', userId);
    }

    const badges = await this.userRepo.findUserBadges(userId);
    const completedModules = await this.userRepo.findUserCompletedModules(userId);

    return {
      user,
      badges,
      completedModules: completedModules.map(m => m.module_id)
    };
  }

  async updateCadetProfile(userId, updateData) {
    const existing = await this.userRepo.findById(userId);
    if (!existing) {
      throw new NotFoundError('Cadet User', userId);
    }
    return this.userRepo.update(userId, updateData);
  }

  async awardXP(userId, amount) {
    const existing = await this.userRepo.findById(userId);
    if (!existing) {
      throw new NotFoundError('Cadet User', userId);
    }
    return this.userRepo.addXP(userId, amount);
  }
}

export const userService = new UserService();
export default userService;
