const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const barangRoutes = require('./routes/barangRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/user', barangRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
