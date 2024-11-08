const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');
const auth = require('../middleware/auth');

router.post('/barang', auth, barangController.createBarang);

module.exports = router;
