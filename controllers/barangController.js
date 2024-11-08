const db = require('../models/database');
const generateKodeBarang = require('../utils/generateKodeBarang');

exports.createBarang = async (req, res) => {
    const { nama_barang, stok, harga } = req.body;
    
    const [latestBarang] = await db.query('SELECT COUNT(id) AS counter FROM barang');
    const counter = latestBarang[0].counter + 1;

    const kode_barang = generateKodeBarang(counter);

    await db.query(
        'INSERT INTO barang (nama_barang, kode_barang, stok, harga) VALUES (?, ?, ?, ?)', 
        [nama_barang, kode_barang, stok, harga]
    );
    res.status(201).send('Barang created');
};

exports.updateStok = async (req, res) => {
    const { id, jumlah } = req.body;
    await db.query('UPDATE barang SET stok = stok + ? WHERE id = ?', [jumlah, id]);
    res.send('Stok updated');
};

exports.getHargaByDate = async (req, res) => {
    const { tanggal } = req.query;
    const result = await db.query(
        'SELECT b.nama_barang, h.harga FROM barang b JOIN harga_history h ON b.id = h.barang_id WHERE h.tanggal_berlaku = ?',
        [tanggal]
    );
    res.json(result);
};

exports.getStokByDate = async (req, res) => {
    const { tanggal } = req.query;
    const result = await db.query(
        'SELECT nama_barang, stok FROM barang WHERE tanggal_berlaku = ?',
        [tanggal]
    );
    res.json(result);
};
