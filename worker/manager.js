const axios = require('axios');
const mongoose = require('mongoose');
const Status = require('../database/schema/statusModel');
const Monitors = require('../database/schema/monitors');

async function monitorStatus() {
    let websites = await Monitors.find({});
    for (const site of websites) {
        const startTime = Date.now();

        try {
            const response = await axios.get(site.website); // Access site.website
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            const status = new Status({
                website: site.website, // Access site.website
                displayName: site.displayName, // Access site.displayName
                statusCode: response.status,
                responseTime: `${responseTime}ms`,
                timeChecked: new Date(),
                UniqueId: site.uniqueId // Made to handle multiple Status Pages with monitors of the same name
            });

            await status.save(); // Save the status to MongoDB
            console.log(status);
        } catch (error) {
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            const status = new Status({
                website: site.website, // Access site.website
                displayName: site.displayName, // Access site.displayName
                statusCode: error.response ? error.response.status : 'Error',
                responseTime: `${responseTime}ms`,
                timeChecked: new Date(),
                error: error.message,
                UniqueId: site.uniqueId
            });

            await status.save(); // Save the error status to MongoDB
            console.log(status);
        }
    }
}

// Set the monitoring interval to every 5 seconds
const intervalId = setInterval(() => {
    monitorStatus().catch(console.error); // Handle any errors from monitorStatus
}, 5000);
