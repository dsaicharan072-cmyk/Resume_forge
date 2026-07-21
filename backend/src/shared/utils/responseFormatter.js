/**
 * @file responseFormatter.js
 * @description Utility for standardizing API responses.
 * 
 * Purpose: Ensure all API responses follow a consistent format `{ success, data, error, message }`.
 * Input: res object, status code, payload, message
 * Output: Express response
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * Edge Cases: undefined payloads.
 */

const sendSuccess = (res, statusCode = 200, data = {}, message = '') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, statusCode = 500, error = 'Internal Server Error') => {
  return res.status(statusCode).json({
    success: false,
    error,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
