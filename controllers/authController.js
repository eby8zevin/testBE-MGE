const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/database');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Username or password incorrect');
    }
};
