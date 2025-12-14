const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db_con'); // MongoDB connection
const router = require('./router'); // Contact routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'https://port-front-kappa.vercel.app', // your Vercel frontend URL
  methods: ['GET', 'POST']
}));
app.use(express.json());

// API routes
app.use('/api/contact', router);

// Root route for testing backend
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
