const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model('Device', DeviceSchema);
