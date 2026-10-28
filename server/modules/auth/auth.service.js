import { userRepository } from '../user/user.repository.js';
import Hasher from '../../shared/utils/hasher.util.js';
import { UnauthorizedError, ConflictError, ValidationError } from '../../shared/errors/domain.errors.js';
import { signToken, verifyToken } from '../../shared/utils/token.util.js';

/**
 * Authentication Service
 * Adheres to SRP by managing authentication, registration, and clearance provisioning.
 */
export class AuthService {
  constructor(userRepo = userRepository) {
    this.userRepo = userRepo;
  }

  async login(email, password) {
    if (!email) {
      throw new ValidationError('Email is required for clearance verification');
    }

    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      // Auto-register demo user if first time accessing enclave
      const hash = await Hasher.hash(password || 'cybercadet2026');
      const callsign = email.split('@')[0] || 'Cadet-Defender';

      const newUser = await this.userRepo.create({
        email,
        passwordHash: hash,
        callsign,
        clearance: 'LEVEL 1 // CADET DEFENDER',
        tier: 'tier1',
        xp: 850,
        streak: 1
      });

      return {
        isNew: true,
        user: newUser,
        token: signToken(newUser),
        message: 'Cadet profile newly provisioned in enclave'
      };
    }

    if (!password) {
      throw new UnauthorizedError('Password is required for clearance verification');
    }

    const match = await Hasher.compare(password, user.password_hash);
    if (!match) {
      throw new UnauthorizedError('Invalid clearance credentials');
    }

    const { password_hash, ...safeUser } = user;
    return {
      isNew: false,
      user: safeUser,
      token: signToken(safeUser),
      message: 'Access Granted. Clearance verified.'
    };
  }

  async register(registrationDto) {
    const { email, password, callsign, tier = 'tier1' } = registrationDto;

    if (!email || !password) {
      throw new ValidationError('Email and password are required for enclave enrollment');
    }

    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new ConflictError('Cadet with this email already enrolled in enclave');
    }

    const hash = await Hasher.hash(password);
    const handle = callsign?.trim() || email.split('@')[0] || 'Agent-Cadet';
    const clearance = tier === 'tier3'
      ? 'LEVEL 3 // ZERO-DAY SPECIALIST'
      : tier === 'tier2'
      ? 'LEVEL 2 // SOC ANALYST'
      : 'LEVEL 1 // CADET DEFENDER';

    const newUser = await this.userRepo.create({
      email,
      passwordHash: hash,
      callsign: handle,
      clearance,
      tier,
      xp: 850,
      streak: 1
    });

    return {
      user: newUser,
      token: signToken(newUser),
      message: 'Cadet successfully enrolled'
    };
  }

  async session(token) {
    const claims = verifyToken(token);
    if (!claims?.sub) {
      throw new UnauthorizedError('Session token is missing or expired');
    }
    const user = await this.userRepo.findById(claims.sub);
    if (!user) {
      throw new UnauthorizedError('Session token does not match an enrolled cadet');
    }
    return { user };
  }
}

export const authService = new AuthService();
export default authService;
