import { dbConnection } from '../../database/connection.js';
import ApiResponse from '../../shared/utils/response.util.js';
import asyncHandler from '../../shared/middleware/async.handler.js';
import pool from '../../database/connection.js';

export class HealthController {
  static getHealth = asyncHandler(async (req, res) => {
    const dbStatus = await dbConnection.testConnection();
    return res.json({
      status: 'ONLINE',
      service: 'CyberGuardian Enclave Hybrid Monolith',
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  });

  static getDbStats = asyncHandler(async (req, res) => {
    const [[{ userCount }]] = await pool.query('SELECT COUNT(*) as userCount FROM users');
    const [[{ courseCount }]] = await pool.query('SELECT COUNT(*) as courseCount FROM courses');
    const [[{ moduleCount }]] = await pool.query('SELECT COUNT(*) as moduleCount FROM modules');
    const [[{ badgeCount }]] = await pool.query('SELECT COUNT(*) as badgeCount FROM badges');
    const [[{ logCount }]] = await pool.query('SELECT COUNT(*) as logCount FROM lab_command_logs');

    return res.json({
      success: true,
      database: 'cyberguardian',
      stats: {
        users: userCount,
        courses: courseCount,
        modules: moduleCount,
        badges: badgeCount,
        commandLogs: logCount
      }
    });
  });
}

export default HealthController;
