const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const faker = require('faker');

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
// @access Public
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

// @route POST api/auth
// @desc Seeding the db for test purposes
// @access Public
router.get('/seed', async (req, res) => {
  try {
    // The user you want to seed
    const testUser = await Device.findById('60edc81bb599c6cb67bb62e4');

    // Creates users with fake names and adds them to the testUser's guardians
    for (let i = 0; i < 5; i++) {
      const newDevice = new Device({
        deviceName: faker.name.findName(),
      });
      await newDevice.save();

      testUser.guardians.push(newDevice.id);
    }

    await testUser.save();

    res.send('OK');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
