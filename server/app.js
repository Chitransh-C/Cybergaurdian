import express from 'express';
import cors from 'cors';
import config from './config/env.config.js';

// Shared Middleware
import requestLogger from './shared/middleware/request-logger.js';
import errorMiddleware from './shared/middleware/error.middleware.js';
import { NotFoundError } from './shared/errors/domain.errors.js';

// Domain Module Routers (Hybrid Monolith)
import healthRoutes from './modules/health/health.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/user.routes.js';
import courseRoutes from './modules/course/course.routes.js';
import progressRoutes from './modules/progress/progress.routes.js';
import badgeRoutes from './modules/badge/badge.routes.js';
import labRoutes from './modules/lab/lab.routes.js';
import mentorRoutes from './modules/mentor/mentor.routes.js';

/**
 * Express Application Factory
 * Adheres to Single Responsibility Principle: configures the HTTP pipeline and mounts modules.
 */
export function createApp() {
  const app = express();

  // 1. Core Global Middleware
  app.use(cors(config.cors));
  app.use(express.json());
  app.use(requestLogger);

  // 2. Register Hybrid Monolith Module Routes
  const apiRouter = express.Router();
  apiRouter.use(healthRoutes);
  apiRouter.use(authRoutes);
  apiRouter.use(userRoutes);
  apiRouter.use(courseRoutes);
  apiRouter.use(progressRoutes);
  apiRouter.use(badgeRoutes);
  apiRouter.use(labRoutes);
  apiRouter.use(mentorRoutes);

  app.use('/api', apiRouter);

  // 3. Fallback Route (404)
  app.use((req, res, next) => {
    next(new NotFoundError('API Route', req.originalUrl));
  });

  // 4. Centralized Error Middleware (RFC 7807 problem details)
  app.use(errorMiddleware);

  return app;
}

export default createApp;
