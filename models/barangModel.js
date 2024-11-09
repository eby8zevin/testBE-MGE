const db = require('../config/db');

const Barang = {
  create: (nama, kode, stok, harga, foto, callback) => {
    db.query(
      'INSERT INTO barang (nama_barang, kode_barang, stok, harga, foto) VALUES (?, ?, ?, ?, ?)',
      [nama, kode, stok, harga, foto],
      callback
    );
  },

  getAll: (callback) => {
    db.query('SELECT * FROM barang', callback);
  },

  getByKode: (kode, callback) => {
    db.query('SELECT * FROM barang WHERE kode_barang = ?', [kode], callback);
  },

  updateStok: (kode, stok, callback) => {
    db.query('UPDATE barang SET stok = ? WHERE kode_barang = ?', [stok, kode], callback);
  },

  updateHarga: (kode, harga, tanggal, callback) => {
    db.query(
      'INSERT INTO harga_barang (kode_barang, harga, tanggal_berlaku) VALUES (?, ?, ?)',
      [kode, harga, tanggal],
      callback
    );
  },

  getHargaByTanggal: (tanggal, callback) => {
    db.query(
      'SELECT b.nama_barang, h.harga FROM harga_barang h JOIN barang b ON h.kode_barang = b.kode_barang WHERE h.tanggal_berlaku = ?',
      [tanggal],
      callback
    );
  },

  getStokByTanggal: (tanggal, callback) => {
    db.query(
      'SELECT b.nama_barang, SUM(stok) AS total_stok FROM barang b WHERE b.tanggal_berlaku = ? GROUP BY b.nama_barang',
      [tanggal],
      callback
    );
  },
};

module.exports = Barang;
