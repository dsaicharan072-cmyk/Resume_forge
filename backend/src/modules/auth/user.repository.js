/**
 * @file user.repository.js
 * @description Repository for User entity. Handles all database interactions for users.
 * 
 * Purpose: Isolate database logic from business logic.
 * Input: Data objects for creation/querying
 * Output: Mongoose Documents or null
 * Time Complexity: O(1) database operation overhead (actual time depends on MongoDB)
 * Space Complexity: O(1)
 * Edge Cases: Handles database errors during queries.
 */

const User = require('../../database/models/User');

class UserRepository {
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findUserByEmail(email, includePassword = false) {
    const query = User.findOne({ email });
    if (includePassword) {
      query.select('+password');
    }
    return await query.exec();
  }

  async findUserById(id) {
    return await User.findById(id).select('-password');
  }
}

module.exports = new UserRepository();
