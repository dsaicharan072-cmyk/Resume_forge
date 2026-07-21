/**
 * @file auth.controller.js
 * @description Controllers for authentication routes.
 * 
 * Purpose: Handle HTTP requests and responses, delegating logic to AuthService.
 * Input: HTTP Request (req), Response (res)
 * Output: JSON responses with status codes
 * Time Complexity: O(1) for controller routing
 * Space Complexity: O(1)
 * Edge Cases: Catches async errors and sends structured error response.
 */

const authService = require('./auth.service');

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const result = await authService.register({ name, email, password });
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(401).json({ success: false, error: error.message });
    }
  }

  async logout(req, res) {
    try {
      // In a stateless JWT setup, logout is typically handled client-side 
      // by deleting the token. If cookies are used, clear the cookie here.
      res.status(200).json({ success: true, data: {}, message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error during logout' });
    }
  }
}

module.exports = new AuthController();
