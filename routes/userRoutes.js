const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Registrasi dan Login
router.post('/register', userController.register);
router.post('/login', userController.login);

// Hanya bisa diakses jika menggunakan token
router.get('/users', authMiddleware, userController.getAllUsers);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;
