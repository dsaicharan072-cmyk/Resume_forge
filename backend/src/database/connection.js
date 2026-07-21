/**
 * @file connection.js
 * @description Establishes connection to the MongoDB database using Mongoose.
 * 
 * Purpose: Centralize database connection logic.
 * Input: None (reads from process.env)
 * Output: Promise resolving to the mongoose connection instance
 * Time Complexity: O(1) for connection setup
 * Space Complexity: O(1)
 * Edge Cases: Handles connection failures and logs errors appropriately.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
