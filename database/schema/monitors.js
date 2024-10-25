const mongoose = require('mongoose');

const monitorSchema = new mongoose.Schema({
  website: { type: String, required: true },
  displayName: { type: String, required: true },
  belongsTo: { type: String, required: true },
  created: { type: Date, required: true }, // Life time percentage (im gonna kill myself)
  uniqueId: { type: String, required: true }
});

const Monitors = mongoose.model('Monitors', monitorSchema);

module.exports = Monitors;
