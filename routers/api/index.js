const express = require('express')
const router = express.Router()

/* Schemas */
const monitors = require('../../database/schema/monitors')
const statusModel = require('../../database/schema/statusModel')
const statusPages = require('../../database/schema/statusPages')

function randString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

router.post('/monitor/:page/make', async (req, res) => {
    console.log(req.body)
    const newMon = new monitors({ website: req.body.url, displayName: req.body.name, created: Date.now(), belongsTo: req.params.page, uniqueId: randString(6)+"-"+randString(6)+"-"+randString(6) })
    res.send({ type: "success", title: "Successfully created monitor", message: "Your monitor has been created successfully" })
    newMon.save()
})

router.post('/pages/create', async (req, res) => {
    const monitors = monitors.find({ belongsTo: req.params.page})
    let monitorUnique = ""
    monitors.forEach((mon) => { 
        unique = mon.uniqueId
        monitorsUnique = { uniqueId: unique }
    })
    const newPage = new statusPages({
        slug: req.body.slug,
        madeBy: "John Doe" || req.session.name,
        assignedMonitors: [
            monitorUnique
        ]
    })
})

router.post('/monitors/:page/get', async (req, res) => {
    const monitors = monitors.find({ belongsTo: req.params.page})
    res.json({
        monitors: monitors
    })
})

module.exports = router