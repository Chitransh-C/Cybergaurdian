import mysql from 'mysql2/promise';
import config from '../config/env.config.js';

/**
 * Database Migrator Service
 * Manages DDL migrations and schema integrity.
 */
export class DatabaseMigrator {
  static async runMigrations() {
    console.log(`[Migrator] Ensuring database '${config.database.name}' exists...`);

    // Connect to server to ensure database exists
    const rootConn = await mysql.createConnection({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password
    });

    await rootConn.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.database.name}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await rootConn.end();

    const conn = await mysql.createConnection({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
      multipleStatements: true
    });

    try {
      console.log(`[Migrator] Running schema migrations...`);

      // 1. Users Table
      await conn.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          callsign VARCHAR(100) NOT NULL,
          clearance VARCHAR(100) DEFAULT 'LEVEL 1 // CADET DEFENDER',
          tier VARCHAR(50) DEFAULT 'tier1',
          xp INT DEFAULT 850,
          streak INT DEFAULT 7,
          joined_date VARCHAR(50) DEFAULT 'October 2026',
          public_key VARCHAR(100) DEFAULT '0x9e8a71d849204f7d290b821a',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_users_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 2. Courses Table
      await conn.query(`
        CREATE TABLE IF NOT EXISTS courses (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          tagline TEXT,
          category VARCHAR(100),
          level VARCHAR(50),
          estimated_time VARCHAR(50),
          total_modules INT DEFAULT 1,
          xp_reward INT DEFAULT 850,
          status VARCHAR(50) DEFAULT 'AVAILABLE',
          color VARCHAR(50) DEFAULT 'cyan',
          icon VARCHAR(50) DEFAULT 'terminal',
          skills JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 3. Modules Table
      await conn.query(`
        CREATE TABLE IF NOT EXISTS modules (
          id VARCHAR(100) PRIMARY KEY,
          course_id VARCHAR(100) NOT NULL,
          module_number INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          badge VARCHAR(100),
          badge_icon VARCHAR(100),
          description TEXT,
          briefing TEXT,
          command_reference JSON,
          tasks JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
          INDEX idx_modules_course (course_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 4. Badges Table
      await conn.query(`
        CREATE TABLE IF NOT EXISTS badges (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          category VARCHAR(50) DEFAULT 'UNLOCKED',
          status VARCHAR(50) DEFAULT 'UNLOCKED',
          mitre VARCHAR(50),
          hash_code VARCHAR(100),
          icon VARCHAR(50),
          description TEXT,
          req_text VARCHAR(100) NULL,
          progress VARCHAR(20) NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 5. User Progress Table
      await conn.query(`
        CREATE TABLE IF NOT EXISTS user_progress (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          course_id VARCHAR(100) NOT NULL,
          module_id VARCHAR(100) NOT NULL,
          is_completed BOOLEAN DEFAULT TRUE,
          completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY uq_user_course_module (user_id, course_id, module_id),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
          FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 6. User Badges Table
      await conn.query(`
        CREATE TABLE IF NOT EXISTS user_badges (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          badge_id VARCHAR(100) NOT NULL,
          date_earned VARCHAR(50) DEFAULT 'October 2026',
          unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY uq_user_badge (user_id, badge_id),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 7. Lab Command Audit Logs Table
      await conn.query(`
        CREATE TABLE IF NOT EXISTS lab_command_logs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NULL,
          command VARCHAR(500) NOT NULL,
          exit_code INT DEFAULT 0,
          cwd VARCHAR(255) DEFAULT '/home/student',
          success BOOLEAN DEFAULT TRUE,
          output_snippet TEXT,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
          INDEX idx_logs_user (user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 8. Quiz attempts
      await conn.query(`
        CREATE TABLE IF NOT EXISTS quiz_attempts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          course_id VARCHAR(100) NOT NULL,
          module_id VARCHAR(100) NOT NULL,
          correct BOOLEAN NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          INDEX idx_quiz_user (user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      console.log(`[Migrator] Schema migrations applied successfully.`);
    } finally {
      await conn.end();
    }
  }
}

export default DatabaseMigrator;
