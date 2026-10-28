import pool from '../../database/connection.js';

export class BadgeRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM badges ORDER BY created_at ASC');
    return rows;
  }

  async findById(badgeId) {
    const [rows] = await pool.query('SELECT * FROM badges WHERE id = ?', [badgeId]);
    return rows[0] || null;
  }

  async awardBadgeToUser(userId, badgeId, dateEarned = 'October 2026') {
    await pool.query(`
      INSERT IGNORE INTO user_badges (user_id, badge_id, date_earned)
      VALUES (?, ?, ?)
    `, [userId, badgeId, dateEarned]);
  }
}

export const badgeRepository = new BadgeRepository();
export default badgeRepository;
