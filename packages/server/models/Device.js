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
    required: false,
  },
});

module.exports = User = mongoose.model('Device', DeviceSchema);
