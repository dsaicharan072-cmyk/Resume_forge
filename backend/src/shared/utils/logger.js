/**
 * @file logger.js
 * @description Winston logger configuration.
 * 
 * Purpose: Centralized application logging for debugging and monitoring.
 * Input: Log messages, metadata
 * Output: Console output and optionally file output
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * Edge Cases: Handles non-string log objects gracefully.
 */

const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'resume-forge-backend' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ level, message, timestamp, stack }) => {
            if (stack) {
              return `${timestamp} ${level}: ${message}\n${stack}`;
            }
            return `${timestamp} ${level}: ${message}`;
          }
        )
      ),
    }),
  ],
});

module.exports = logger;
