// logging-middleware/log.js

const axios = require('axios');
const { LOG_API_URL } = require('./constants');
const validateLogInput = require('./validator');

// The log function to use in any app
async function log(stack, level, pkg, message) {
  try {
    // Validate inputs
    validateLogInput(stack, level, pkg, message);

    // Send log to API
    const response = await axios.post(LOG_API_URL, {
      stack,
      level,
      package: pkg,
      message
    });

    console.log('[LOG SENT]', response.data.message || 'Success');
    return response.data;
  } catch (err) {
    console.error('[LOG ERROR]', err.message);
  }
}

module.exports = log;
