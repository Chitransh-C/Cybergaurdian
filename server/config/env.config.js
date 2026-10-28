import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load root .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Validated Environment & Configuration Singleton
 * Adheres to SRP by encapsulating all configuration extraction and validation.
 */
class EnvironmentConfig {
  constructor() {
    this.port = parseInt(process.env.PORT || '5000', 10);
    this.nodeEnv = process.env.NODE_ENV || 'development';
    
    // Database configuration
    this.database = {
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      name: process.env.DB_NAME || 'cyberguardian',
      url: process.env.DATABASE_URL || '',
      connectionLimit: 10
    };

    // Security & Auth configuration
    this.security = {
      jwtSecret: process.env.JWT_SECRET || 'cyberguardian_secret_key_2026',
      saltRounds: 10
    };

    // Client CORS
    this.cors = {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    };

    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
    const openaiKey = process.env.OPENAI_API_KEY || '';
    this.ai = {
      provider: process.env.AI_PROVIDER || (openaiKey && !geminiKey ? 'openai' : 'gemini'),
      apiKey: geminiKey || openaiKey,
      model: process.env.AI_MODEL || (openaiKey && !geminiKey ? 'gpt-4o-mini' : 'gemini-2.5-flash')
    };
  }

  isProduction() {
    return this.nodeEnv === 'production';
  }
}

export const config = new EnvironmentConfig();
export default config;
