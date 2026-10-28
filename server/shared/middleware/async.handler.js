/**
 * Higher-order wrapper function to capture unhandled promise rejections in route handlers
 * and forward them directly to the centralized error middleware.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
