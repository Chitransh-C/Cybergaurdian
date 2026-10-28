import { AppError } from '../errors/app.error.js';
import config from '../../config/env.config.js';

/**
 * Centralized Application Error Handling Middleware
 * Adheres to SRP by managing all uncaught operational and runtime errors.
 */
export function errorMiddleware(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let details = err.details || null;

  // Handle specific MySQL driver errors gracefully
  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'Resource with provided unique identifier already exists';
  } else if (err.code === 'ECONNREFUSED') {
    statusCode = 503;
    message = 'Database service temporarily unavailable';
  }

  // Log error stack during development
  if (!config.isProduction() && statusCode === 500) {
    console.error(`[Error Handler] 500 Internal Error:`, err);
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    details,
    stack: config.isProduction() ? undefined : err.stack,
    timestamp: new Date().toISOString()
  });
}

export default errorMiddleware;
