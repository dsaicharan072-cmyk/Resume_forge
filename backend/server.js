/**
 * @file server.js
 * @description Entry point for the backend application. Initializes environment variables, connects to the database, and starts the Express server.
 */

// Load environment variables (requires dotenv)
try {
  require('dotenv').config();
} catch (e) {
  console.warn('Warning: dotenv module not found. Make sure to install dependencies.');
}

const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/database/connection');

const PORT = process.env.PORT || 5000;

// Connect to Database
// To prevent crashing if Mongoose isn't installed during testing, we wrap in try/catch.
try {
  connectDB();
} catch (e) {
  console.error('Failed to initialize database connection. Have you installed mongoose?', e.message);
}

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
