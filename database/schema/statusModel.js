const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  website: { type: String, required: true },
  displayName: { type: String, required: true },
  statusCode: { type: String, required: true },
  responseTime: { type: String, required: true },
  timeChecked: { type: Date, required: true },
  error: { type: String, default: null },
  uniqueId: { type: String, required: true }
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
