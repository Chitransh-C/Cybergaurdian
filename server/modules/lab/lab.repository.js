import pool from '../../database/connection.js';

export class LabRepository {
  async logCommand(logData) {
    const { userId, command, exitCode = 0, cwd = '/home/student', success = true, output = '' } = logData;
    const snippet = output ? output.substring(0, 500) : '';

    const [result] = await pool.query(
      `INSERT INTO lab_command_logs (user_id, command, exit_code, cwd, success, output_snippet)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId || null, command, exitCode, cwd, success, snippet]
    );
    return result.insertId;
  }

  async getRecentLogs(limit = 50) {
    const [rows] = await pool.query(
      'SELECT * FROM lab_command_logs ORDER BY executed_at DESC LIMIT ?',
      [limit]
    );
    return rows;
  }
}

export const labRepository = new LabRepository();
export default labRepository;
