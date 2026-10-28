import bcrypt from 'bcryptjs';
import config from '../../config/env.config.js';

/**
 * Password & Hash Service
 * Encapsulates cryptographic operations adhering to Single Responsibility Principle.
 */
export class Hasher {
  static async hash(plaintext) {
    const salt = await bcrypt.genSalt(config.security.saltRounds);
    return bcrypt.hash(plaintext, salt);
  }

  static async compare(plaintext, hash) {
    if (!plaintext || !hash) return false;
    return bcrypt.compare(plaintext, hash);
  }
}

export default Hasher;
