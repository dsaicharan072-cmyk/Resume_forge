/**
 * @file server.js
 * @description Entry point for the backend application. Initializes environment variables, connects to the database, and starts the Express server.
 */

const http = require('http');
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
