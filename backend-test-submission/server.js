const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const log = require('../logging-middleware/log');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/url', urlRoutes);

// Root route
app.get('/', (req, res) => {
  log('backend', 'info', 'controller', 'Root route hit');
  res.send('URL Shortener Backend Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  log('backend', 'info', 'controller', `Server started on port ${PORT}`);
});
