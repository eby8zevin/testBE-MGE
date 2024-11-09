const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../controllers/barangController').upload.single('foto');

// Menambahkan barang
router.post('/barang', authMiddleware, upload, barangController.createBarang);

// Mengupdate stok barang
router.put('/barang/stok', authMiddleware, barangController.updateStok);

// Mengupdate harga barang
router.put('/barang/harga', authMiddleware, barangController.updateHarga);

// Mendapatkan stok per tanggal
router.get('/barang/stok', authMiddleware, barangController.getStokPerTanggal);

// Mendapatkan harga per tanggal
router.get('/barang/harga', authMiddleware, barangController.getHargaPerTanggal);

// Mengambil data barang
router.get('/barang', authMiddleware, barangController.getAllBarang);

module.exports = router;
