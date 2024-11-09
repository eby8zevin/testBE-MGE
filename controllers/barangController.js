const Barang = require('../models/barangModel');
const multer = require('multer');
const path = require('path');

// Konfigurasi multer untuk upload foto barang
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
exports.upload = upload; 

// 1. Menambahkan barang
exports.createBarang = (req, res) => {
  const { nama_barang, stok, harga } = req.body;
  const foto = req.file ? req.file.path : null;

  const counter = Math.floor(Math.random() * 100000); // Counter barang
  const kode_barang = `BRG/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${counter.toString().padStart(5, '0')}`;

  Barang.create(nama_barang, kode_barang, stok, harga, foto, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Barang added successfully', kode_barang });
  });
};

// 2. Mengupdate stok barang
exports.updateStok = (req, res) => {
  const { kode_barang, stok } = req.body;
  Barang.updateStok(kode_barang, stok, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Stok updated successfully' });
  });
};

// 3. Mengupdate harga barang
exports.updateHarga = (req, res) => {
  const { kode_barang, harga, tanggal_berlaku } = req.body;
  Barang.updateHarga(kode_barang, harga, tanggal_berlaku, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Harga updated successfully' });
  });
};

// 4. Mendapatkan stok per tanggal
exports.getStokPerTanggal = (req, res) => {
  const { tanggal } = req.query;
  Barang.getStokByTanggal(tanggal, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// 5. Mendapatkan harga per tanggal
exports.getHargaPerTanggal = (req, res) => {
  const { tanggal } = req.query;
  Barang.getHargaByTanggal(tanggal, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// 6. Mengambil data barang
exports.getAllBarang = (req, res) => {
  Barang.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
