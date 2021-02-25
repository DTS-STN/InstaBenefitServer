const createError = require("./createError")
require('cross-fetch/polyfill')
require("node-fetch")

async function getNotifications(req, next){
    let notificationRequest
    try {
        notificationRequest = await fetch(
            `${process.env.CURAM_API}/instabenefit/notifications`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + req.locals.token,
                    guid: req.locals.guid
                }
            }
        )
    }catch (e){
        return next(createError("Failed to retrieve notifications from curam", 500))
    }

    if(notificationRequest.ok){
        const notificationData = await notificationRequest.json()
        req.locals.notifications = notificationData.data.map(value => {
            return value.title
        })
    }else{
        return next(createError("Failed to retrieve notifications from curam " + await notificationRequest.text(), 500))
    }
}

module.exports = getNotifications