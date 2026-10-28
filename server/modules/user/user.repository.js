import pool from '../../database/connection.js';

/**
 * User Repository
 * Adheres to Repository Pattern: encapsulates persistence and data access logic for Users.
 */
export class UserRepository {
  async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, email, callsign, clearance, tier, xp, streak, joined_date, public_key, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email.trim().toLowerCase()]
    );
    return rows[0] || null;
  }

  async create(userData) {
    const { email, passwordHash, callsign, clearance, tier, xp = 850, streak = 1 } = userData;
    const [result] = await pool.query(
      `INSERT INTO users (email, password_hash, callsign, clearance, tier, xp, streak)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email.trim().toLowerCase(), passwordHash, callsign, clearance, tier, xp, streak]
    );
    return this.findById(result.insertId);
  }

  async update(id, updateData) {
    const { callsign, clearance, tier, xp } = updateData;
    await pool.query(
      `UPDATE users 
       SET callsign = COALESCE(?, callsign),
           clearance = COALESCE(?, clearance),
           tier = COALESCE(?, tier),
           xp = COALESCE(?, xp)
       WHERE id = ?`,
      [callsign, clearance, tier, xp, id]
    );
    return this.findById(id);
  }

  async addXP(id, amount) {
    await pool.query('UPDATE users SET xp = xp + ? WHERE id = ?', [amount, id]);
    const [rows] = await pool.query('SELECT xp FROM users WHERE id = ?', [id]);
    return rows[0]?.xp || 0;
  }

  async findUserBadges(userId) {
    const [rows] = await pool.query(`
      SELECT b.*, ub.date_earned, ub.unlocked_at
      FROM badges b
      INNER JOIN user_badges ub ON b.id = ub.badge_id
      WHERE ub.user_id = ?
    `, [userId]);
    return rows;
  }

  async findUserCompletedModules(userId) {
    const [rows] = await pool.query(`
      SELECT module_id, course_id, completed_at
      FROM user_progress
      WHERE user_id = ? AND is_completed = TRUE
    `, [userId]);
    return rows;
  }
}

export const userRepository = new UserRepository();
export default userRepository;
