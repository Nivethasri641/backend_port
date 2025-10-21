const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('../db_con.js');  // stays in root
const contactRoutes = require('./router/contactroute.js'); // router inside src

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend.vercel.app'],
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
