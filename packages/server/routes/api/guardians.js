const express = require('express');
const router = express.Router();
const { Expo } = require('expo-server-sdk');

const Device = require('../../models/Device');

let expo = new Expo();

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
    res.sendStatus(500).send('Server Error');
  }
});

// @route POST api/guardians/notify/:deviceId
// @desc Notify all the guardians of a device
// @access Public
router.post('/alerts/:deviceId', async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const { lat, lon, safe } = req.body;

    const device = await Device.findById(deviceId).populate('guardians');

    const pushTokens = device.guardians.map((guardian) => guardian.token);

    for (const guardian of device.guardians) {
      let currentGuardian = await Device.findById(guardian._id);

      currentGuardian.alerts.push({
        device: deviceId,
        date: new Date(),
        safe,
        lat,
        lon,
      });

      await currentGuardian.save();
    }

    // Create the messages that you want to send to clients
    let messages = [];
    for (let pushToken of pushTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
      messages.push({
        to: pushToken,
        sound: 'default',
        title: `${device.deviceName} is ${safe ? 'safe' : 'not safe'}!`,
        body: 'Go into the app to see its localisation',
      });
    }

    let chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
      try {
        await expo.sendPushNotificationsAsync(chunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500).send('Server Error');
  }
});

// @route GET api/guardians/alerts/:id
// @desc Returns an array of alerts for a given id
// @access Public
router.get('/alerts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const device = await Device.findById(id).populate('alerts.device');

    res.json(device.alerts);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500).send('Server Error');
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
    res.sendStatus(500).send('Server Error');
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
    res.sendStatus(500).send('Server Error');
  }
});

module.exports = router;
