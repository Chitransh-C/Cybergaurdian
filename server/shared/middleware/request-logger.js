/**
 * Request Logging Middleware
 * Provides structured HTTP access observability.
 */
export function requestLogger(req, res, next) {
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const color = statusCode >= 500 ? '\x1b[31m' : statusCode >= 400 ? '\x1b[33m' : '\x1b[32m';
    const reset = '\x1b[0m';
    console.log(`[HTTP] ${color}${method}${reset} ${originalUrl} ${color}${statusCode}${reset} - ${duration}ms (${ip})`);
  });

  next();
}

export default requestLogger;
