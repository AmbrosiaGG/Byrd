const mongoose = require('mongoose');

const assignedMonitors = new mongoose.Schema({
    websiteUniqueId: { type: String, required: true }
});
const statusPageSchema = new mongoose.Schema({
    slug: { type: String, required: true, default: null },
    madeBy: { type: String, required: true },
    assignedMonitors: [
        assignedMonitors
    ]
});

const Status = mongoose.model('StatusPage', statusPageSchema);

module.exports = Status;
