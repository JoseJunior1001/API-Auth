const { pool } = require('../database/db');
const bcrypt = require('bcryptjs');

class User {
  // Create a new user
  static async create(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
        [email, hashedPassword]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const result = await pool.query(
        'SELECT id, email, created_at FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update refresh token
  static async updateRefreshToken(id, refreshToken) {
    try {
      await pool.query(
        'UPDATE users SET refresh_token = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [refreshToken, id]
      );
    } catch (error) {
      throw error;
    }
  }

  // Find user by refresh token
  static async findByRefreshToken(refreshToken) {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE refresh_token = $1',
        [refreshToken]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Compare password
  static async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}

module.exports = User;