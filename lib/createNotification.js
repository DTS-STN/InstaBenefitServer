const createError = require("./createError")
require('cross-fetch/polyfill')
require("node-fetch")


async function createNotification(req, benefitType, next){
    const notification = `Based on the data received from other sources, you can apply for EI Maternity benefit. If you wish to proceed please <a href=${req.locals.benefitApplicationLinks[benefitType]}>Click Here</a>. Your actual eligibility will be determined after submission of application.`
    let notificationCreationRequest
    try{
        notificationCreationRequest = await fetch(
            `${process.env.CURAM_API}/instabenefit/notifications`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    guid: req.locals.guid,
                    "Authorization": "Bearer " + req.locals.token
                },
                body: JSON.stringify({
                    benefitType,
                    description: notification
                })
            }
        )
    }catch (e){
        return next(createError("Curam failed to create a notification", 500))
    }

    if(!notificationCreationRequest.ok){
        let message = await notificationCreationRequest.text()
        return next(createError("Curam failed to create a notification " + message, 500))
    }
}

module.exports = createNotification