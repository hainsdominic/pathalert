const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true,
  },
  guardians: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
    },
  ],
  token: {
    type: String,
  },
  alerts: [
    {
      device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true,
      },
      date: { type: Date, required: true },
      safe: { type: Boolean, required: true },
      lat: { type: String },
      lon: { type: String },
    },
  ],
});

module.exports = User = mongoose.model('Device', DeviceSchema);
