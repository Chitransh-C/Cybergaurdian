import { AppError } from './app.error.js';

export class NotFoundError extends AppError {
  constructor(resource = 'Resource', id = null) {
    const msg = id ? `${resource} with identifier '${id}' not found` : `${resource} not found`;
    super(msg, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Invalid authentication credentials or clearance denied') {
    super(message, 401);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details = null) {
    super(message, 400, details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
  }
}
