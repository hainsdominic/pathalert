const express = require('express');
const router = express.Router();

const Device = require('../../models/Device');

// @route GET api/guardians/:id
// @desc Returns an array of guardians for a given id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const device = await Device.findById(id).populate('guardians');

    res.json(device.guardians);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/guardians/:deviceId/:id
// @desc Removes a specified guardian and returns an array of guardians for a given id
// @access Public
router.delete('/:deviceId/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deviceId = req.params.deviceId;
    let device = await Device.findById(deviceId).populate('guardians');

    const guardians = device.guardians;

    device.guardians = guardians.filter(
      (guardian) => guardian._id.toString() !== id
    );

    await device.save();

    res.json(device.guardians);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/guardians/:deviceId/:id
// @desc Add a guardian and returns an array of guardians for a given id
// @access Public
router.post('/:deviceId/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deviceId = req.params.deviceId;
    let device = await Device.findById(deviceId);

    if (device.guardians?.indexOf(id) === -1) {
      device.guardians.push(id);
    }

    await device.save();

    res.json();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
