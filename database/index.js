const mongoose = require('mongoose');

mongoose.connect(global.config.database, {
})
// Connection event handlers
const db = mongoose.connection;

db.on('connected', () => {
    global.logger('Mongoose connected to MongoDB', 'ready');
});

db.on('error', (err) => {
    global.logger(`Mongoose connection error: ${err}`, 'error');
});

db.on('disconnected', () => {
    global.logger('Mongoose disconnected from MongoDB', 'warn');
});

const gracefulExit = () => {
    db.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
};

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);