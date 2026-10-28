import config from './config/env.config.js';
import { createApp } from './app.js';
import { dbConnection } from './database/connection.js';

/**
 * Server Lifecycle & Process Manager
 * Manages HTTP listener, database readiness check, and graceful process shutdown.
 */
async function startServer() {
  console.log(`\n======================================================`);
  console.log(`  CYBERGUARDIAN // HYBRID MONOLITH BACKEND`);
  console.log(`======================================================`);
  console.log(`Checking MySQL connection to ${config.database.host}:${config.database.port}...`);

  const dbStatus = await dbConnection.testConnection();
  if (dbStatus.success) {
    console.log(`[+] Database verified: MySQL ${dbStatus.version} [${config.database.name}]`);
  } else {
    console.warn(`[!] Warning: MySQL connection check failed: ${dbStatus.error}`);
    console.warn(`[!] Running in degraded mode. Ensure MySQL service is running.`);
  }

  const app = createApp();

  const server = app.listen(config.port, () => {
    console.log(`[+] Enclave HTTP Server listening on port ${config.port}`);
    console.log(`[+] Health & Diagnostics: http://localhost:${config.port}/api/health`);
    console.log(`[+] Ready for cadet clearance verification.\n`);
  });

  // Graceful Shutdown Handlers
  const handleShutdown = async (signal) => {
    console.log(`\n[!] Received ${signal}. Initiating graceful shutdown...`);
    server.close(async () => {
      console.log(`[+] Closed HTTP listener.`);
      try {
        await dbConnection.close();
        console.log(`[+] Released MySQL connection pool.`);
      } catch (err) {
        console.error(`[-] Error closing MySQL pool:`, err.message);
      }
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

startServer().catch((err) => {
  console.error(`[-] Fatal startup error:`, err);
  process.exit(1);
});
