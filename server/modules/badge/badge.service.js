import { badgeRepository } from './badge.repository.js';

export class BadgeService {
  constructor(badgeRepo = badgeRepository) {
    this.badgeRepo = badgeRepo;
  }

  async getAllBadges() {
    return this.badgeRepo.findAll();
  }

  async awardBadge(userId, badgeId) {
    await this.badgeRepo.awardBadgeToUser(userId, badgeId);
    return { success: true, message: 'Badge awarded' };
  }
}

export const badgeService = new BadgeService();
export default badgeService;
