const express = require('express');
const shortid = require('shortid');
const Url = require('../models/Url');
const log = require('../../logging-middleware/log');

const router = express.Router();

router.post('/shorten', async (req, res) => {
  const { originalUrl, customCode, validityMins } = req.body;

  try {
    const shortCode = customCode || shortid.generate();
    const existing = await Url.findOne({ shortCode });

    if (existing) {
      log('backend', 'error', 'controller', `Shortcode ${shortCode} already exists`);
      return res.status(400).json({ error: 'Shortcode already taken' });
    }

    const expiresAt = validityMins
      ? new Date(Date.now() + validityMins * 60000)
      : null;

    const url = new Url({ originalUrl, shortCode, expiresAt });
    await url.save();

    log('backend', 'info', 'controller', `Shortened URL created: ${shortCode}`);
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
return res.json({ shortCode, shortUrl: `${baseUrl}/${shortCode}` });
  } catch (err) {
    log('backend', 'error', 'handler', `Error in shorten: ${err.message}`);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) {
      log('backend', 'warn', 'controller', `Shortcode ${shortCode} not found`);
      return res.status(404).json({ error: 'Not found' });
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      log('backend', 'warn', 'controller', `Shortcode ${shortCode} expired`);
      return res.status(410).json({ error: 'URL expired' });
    }

    log('backend', 'info', 'controller', `Redirecting to: ${url.originalUrl}`);
    return res.redirect(url.originalUrl);
  } catch (err) {
    log('backend', 'error', 'handler', `Error in redirect: ${err.message}`);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
