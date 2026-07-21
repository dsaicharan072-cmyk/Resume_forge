/**
 * @file errorHandler.js
 * @description Global error handling middleware.
 * 
 * Purpose: Catch all unhandled synchronous/asynchronous errors in the app and return a formatted response.
 * Input: Error object, req, res, next
 * Output: Standardized JSON error response
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * Edge Cases: Handles Mongoose validation errors, Cast errors, and generic unknown errors.
 */

const { sendError } = require('../shared/utils/responseFormatter');
const logger = require('../shared/utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    return sendError(res, 404, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    return sendError(res, 400, message);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return sendError(res, 400, message);
  }

  // Generic Error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';

  sendError(res, statusCode, message);
};

module.exports = errorHandler;
