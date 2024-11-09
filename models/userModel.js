const db = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = {
  create: (username, password, callback) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      callback
    );
  },

  findByUsername: (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  },

  getAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  },
};

module.exports = User;
