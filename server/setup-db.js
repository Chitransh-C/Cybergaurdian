import { DatabaseMigrator } from './database/migrator.js';
import { DatabaseSeeder } from './database/seeder.js';
import config from './config/env.config.js';
import { dbConnection } from './database/connection.js';

async function run() {
  console.log(`\n======================================================`);
  console.log(`  CYBERGUARDIAN // SCHEMA MIGRATION & SEEDING`);
  console.log(`======================================================`);
  console.log(`Target: ${config.database.user}@${config.database.host}:${config.database.port}/${config.database.name}`);

  try {
    // 1. Run Migrations (DDL)
    await DatabaseMigrator.runMigrations();

    // 2. Run Seeder
    await DatabaseSeeder.seed();

    console.log(`\n[+] Database initialization completed successfully.\n`);
  } catch (err) {
    console.error(`[-] Migration/Seeding failed:`, err);
    process.exit(1);
  } finally {
    await dbConnection.close();
    process.exit(0);
  }
}

run();
