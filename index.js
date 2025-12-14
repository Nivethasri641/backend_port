const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db_con');
const router = require('./router');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'https://port-front-kappa.vercel.app', // Vercel frontend
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// API routes
app.use('/api', router);

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running on Render!');
});

// Render requires dynamic port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
