/**
 * @file auth.service.js
 * @description Business logic for user authentication (register, login, tokens).
 * 
 * Purpose: Handle auth logic independently from HTTP request objects.
 * Input: User credentials (name, email, password)
 * Output: Auth token and user object, or throws error
 * Time Complexity: O(1) for token generation, bcrypt comparison is O(log N) effectively depending on rounds
 * Space Complexity: O(1)
 * Edge Cases: User already exists, invalid credentials.
 */

const jwt = require('jsonwebtoken');
const userRepository = require('./user.repository');

class AuthService {
  async register(userData) {
    const { name, email, password } = userData;

    // Check if user exists
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create user
    const user = await userRepository.createUser({ name, email, password });

    // Generate token
    const token = this.generateToken(user._id);
    return { user: { id: user._id, name: user.name, email: user.email }, token };
  }

  async login(email, password) {
    // Check if user exists (include password for comparison)
    const user = await userRepository.findUserByEmail(email, true);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user._id);
    return { user: { id: user._id, name: user.name, email: user.email }, token };
  }

  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
  }
}

module.exports = new AuthService();
