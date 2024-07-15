const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  topic: String,
  message: {
    value: Number,
    unit: String,
    sensorId: String,
    location: String,
    status: String,
    timestamp: String,
  },
}, {
  timestamps: true
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
