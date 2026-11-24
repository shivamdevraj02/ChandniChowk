const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 30001;
const mongoUri = process.env.MONGO_URI;
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: '100kb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'chandni-chowk-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use((_req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ message: 'Something went wrong on the server.' }); });

async function start() {
  if (!mongoUri || !process.env.JWT_SECRET) {
    console.error('Missing MONGO_URI or JWT_SECRET. Copy .env.example to .env and add your values.');
    process.exit(1);
  }
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected.');
    app.listen(port, () => console.log(`API running at http://localhost:${port}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

start();
