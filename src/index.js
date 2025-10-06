const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('../db_con.js');
const contactRoutes = require('../router/contactroute.js');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
