const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.register = (req, res) => {
  const { username, password } = req.body;
  User.create(username, password, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'User registered successfully' });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ message: 'User not found' });

    const user = results[0];
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid Password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.delete(id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'User deleted successfully' });
  });
};
