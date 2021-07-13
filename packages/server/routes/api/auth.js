const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const Device = require('../../models/Device');

// Rate limiter for new id route
const rateLimiter = rateLimit({
  windowMs: 60 * 30 * 1000, // 30 minutes
  max: 10, // 10 requests per 30mins
  handler: function (req, res) {
    return res.status(429).json({ errors: [{ msg: 'Try again later.' }] });
  },
});

// @route POST api/auth
// @desc Register device and return new id
// @access Private
router.post('/', rateLimiter, async (req, res) => {
  try {
    // Create the new id
    const { deviceName } = req.body;
    const newDevice = new Device({
      deviceName,
    });

    await newDevice.save();

    res.json(newDevice.id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
