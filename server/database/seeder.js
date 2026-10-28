import mysql from 'mysql2/promise';
import config from '../config/env.config.js';
import Hasher from '../shared/utils/hasher.util.js';
import { INITIAL_USERS } from './seed-data/users.seed.js';
import { INITIAL_COURSES } from './seed-data/courses.seed.js';
import { INITIAL_BADGES } from './seed-data/badges.seed.js';

/**
 * Database Seeder Service
 * Populates essential bootstrap data idempotently.
 */
export class DatabaseSeeder {
  static async seed() {
    console.log(`[Seeder] Seeding initial data...`);
    const conn = await mysql.createConnection({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name
    });

    try {
      // 1. Seed Users
      for (const u of INITIAL_USERS) {
        const hash = await Hasher.hash(u.password);
        await conn.query(`
          INSERT INTO users (email, password_hash, callsign, clearance, tier, xp, streak, joined_date, public_key)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            callsign = VALUES(callsign),
            clearance = VALUES(clearance),
            tier = VALUES(tier),
            xp = VALUES(xp);
        `, [u.email, hash, u.callsign, u.clearance, u.tier, u.xp, u.streak, u.joinedDate, u.publicKey]);
      }
      console.log(`[Seeder] Seeded ${INITIAL_USERS.length} users.`);

      // 2. Seed Courses & Modules
      for (const c of INITIAL_COURSES) {
        await conn.query(`
          INSERT INTO courses (id, title, tagline, category, level, estimated_time, total_modules, xp_reward, status, color, icon, skills)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            tagline = VALUES(tagline),
            skills = VALUES(skills);
        `, [
          c.id, c.title, c.tagline, c.category, c.level, c.estimatedTime,
          c.totalModules, c.xpReward, c.status, c.color, c.icon,
          JSON.stringify(c.skills)
        ]);

        if (c.modules && c.modules.length > 0) {
          for (const m of c.modules) {
            await conn.query(`
              INSERT INTO modules (id, course_id, module_number, title, badge, badge_icon, description, briefing, command_reference, tasks)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON DUPLICATE KEY UPDATE
                title = VALUES(title),
                badge = VALUES(badge),
                description = VALUES(description),
                tasks = VALUES(tasks);
            `, [
              m.id, c.id, m.moduleNumber, m.title, m.badge, m.badgeIcon,
              m.description, m.briefing,
              JSON.stringify(m.commandReference),
              JSON.stringify(m.tasks)
            ]);
          }
        }
      }
      console.log(`[Seeder] Seeded courses and modules.`);

      // 3. Seed Badges
      for (const b of INITIAL_BADGES) {
        await conn.query(`
          INSERT INTO badges (id, title, category, status, mitre, hash_code, icon, description, req_text, progress)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            status = VALUES(status),
            description = VALUES(description);
        `, [b.id, b.title, b.category, b.status, b.mitre, b.hashCode, b.icon, b.description, b.reqText, b.progress]);
      }
      console.log(`[Seeder] Seeded ${INITIAL_BADGES.length} badges.`);

      // 4. Seed Neo's Unlocked Badges & Progress
      const [users] = await conn.query(`SELECT id FROM users WHERE email = 'neo@cyberguard.academy'`);
      if (users.length > 0) {
        const neoId = users[0].id;
        const neoBadges = ['root-sentinel', 'packet-warden', 'firewall-architect'];
        for (const bId of neoBadges) {
          await conn.query(`
            INSERT IGNORE INTO user_badges (user_id, badge_id, date_earned)
            VALUES (?, ?, 'October 2026')
          `, [neoId, bId]);
        }

        const completedMods = ['mod-1', 'mod-2', 'mod-3', 'mod-4'];
        for (const mId of completedMods) {
          await conn.query(`
            INSERT IGNORE INTO user_progress (user_id, course_id, module_id, is_completed)
            VALUES (?, 'course-linux-basics', ?, TRUE)
          `, [neoId, mId]);
        }
      }
      console.log(`[Seeder] Seeded cadet baseline progress.`);
    } finally {
      await conn.end();
    }
  }
}

export default DatabaseSeeder;
