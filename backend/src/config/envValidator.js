/**
 * @file envValidator.js
 * @description Validates environment variables on startup.
 * 
 * Purpose: Ensure all required environment variables are present before starting the server.
 * Input: process.env
 * Output: Validated env object or throws error
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * Edge Cases: Missing variables immediately crash the app to prevent runtime errors.
 */

const Joi = require('joi');

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string().required().description('MongoDB Connection URI'),
  JWT_SECRET: Joi.string().required().description('JWT Secret Key'),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  CLOUDINARY_CLOUD_NAME: Joi.string().optional(),
  CLOUDINARY_API_KEY: Joi.string().optional(),
  CLOUDINARY_API_SECRET: Joi.string().optional(),
}).unknown(true);

const validateEnv = () => {
  const { error, value } = envSchema.validate(process.env);
  
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
  
  return value;
};

module.exports = validateEnv;
