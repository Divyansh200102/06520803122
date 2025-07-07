const mongoose = require('mongoose');
const log = require('../../logging-middleware/log');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    log('backend', 'info', 'service', 'MongoDB connected');
  } catch (error) {
    log('backend', 'fatal', 'service', `DB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
