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
let authAvailable = false;

app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: '100kb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'chandni-chowk-api' }));
app.use('/api/auth', (_req, res, next) => {
  if (!authAvailable) return res.status(503).json({ message: 'Authentication is unavailable. Configure MongoDB and JWT_SECRET.' });
  return next();
}, authRoutes);
app.use('/api/payments', paymentRoutes);
app.use((_req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ message: 'Something went wrong on the server.' }); });

async function start() {
  if (mongoUri && process.env.JWT_SECRET) {
    try {
      await mongoose.connect(mongoUri);
      authAvailable = true;
      console.log('MongoDB connected.');
    } catch (error) {
      console.error('MongoDB connection failed; authentication is unavailable:', error.message);
    }
  } else {
    console.warn('MongoDB or JWT_SECRET is not configured; authentication is unavailable.');
  }
  app.listen(port, () => console.log(`API running at http://localhost:${port}`));
}

start();
