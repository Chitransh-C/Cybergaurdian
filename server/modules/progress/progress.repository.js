import pool from '../../database/connection.js';

export class ProgressRepository {
  async markModuleCompleted(userId, courseId, moduleId) {
    await pool.query(`
      INSERT INTO user_progress (user_id, course_id, module_id, is_completed)
      VALUES (?, ?, ?, TRUE)
      ON DUPLICATE KEY UPDATE is_completed = TRUE;
    `, [userId, courseId, moduleId]);
  }

  async recordQuizAttempt(userId, courseId, moduleId, correct) {
    await pool.query(`
      INSERT INTO quiz_attempts (user_id, course_id, module_id, correct)
      VALUES (?, ?, ?, ?)
    `, [userId, courseId, moduleId, correct ? 1 : 0]);
  }

  async isModuleCompleted(userId, moduleId) {
    const [rows] = await pool.query(
      'SELECT is_completed FROM user_progress WHERE user_id = ? AND module_id = ?',
      [userId, moduleId]
    );
    return rows.length > 0 && !!rows[0].is_completed;
  }
}

export const progressRepository = new ProgressRepository();
export default progressRepository;
