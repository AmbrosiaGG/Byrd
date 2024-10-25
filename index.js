const express = require('express')
const session = require("express-session")
const requestIp = require('request-ip');

const config = require('./config.js')
const logger = require('./utilities/logger.js')
global.config = config
global.logger = logger

const chalk = require('chalk')
const package = require('./package.json')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: config.web.secret,
    cookie: { secure: true, sameSite: 'strict' },
    resave: false,
    saveUninitialized: false // This would fuck shit up real bad
}));



/* Routers */
app.use("/assets", express.static("assets"))
app.use("/node_modules", express.static("node_modules"))
app.use((req, res, next) => {
    global.logger(`${new Date().toISOString()} - ${req.method} ${requestIp.getClientIp(req)}`)
    next()
})
app.use("/", require('./routers/client/index.js'))
app.use("/api", require('./routers/api/index.js'))
app.use("/api", require('./routers/dashboard/index.js'))

app.use((req, res, next) => {
    global.logger(`${new Date().toISOString()} - ${req.method} ${req.url}`)
    next()
})

app.listen(config.web.port, () => {
    global.logger("Ambrosia Byrd 🐦")
    global.logger('Byrd '+package.version.toString().replace("^", "").replace("V",''))
    global.logger('Express '+package.version.toString().replace("^", "").replace("V",''))
    global.logger('- Local 127.0.0.1:'+config.web.port)

    require('./database/index.js')
    require('./worker/manager')
})