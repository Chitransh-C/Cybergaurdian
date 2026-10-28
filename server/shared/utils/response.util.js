/**
 * Standardized API Response Utilities
 * Enforces unified API output structure across all module controllers.
 */
export class ApiResponse {
  static success(res, data = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static created(res, data = null, message = 'Created successfully') {
    return this.success(res, data, message, 201);
  }

  static error(res, message = 'Internal Server Error', statusCode = 500, details = null) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      details,
      timestamp: new Date().toISOString()
    });
  }
}

export default ApiResponse;
