const createError = require("../lib/createError")
require('cross-fetch/polyfill')
require("node-fetch")


async function getUserInfo(req,next){
    let userDataRequest
    try{
        userDataRequest = await fetch(`${process.env.USER_SERVICE_API}/account/v1beta1/profile/${req.locals.guid}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${req.locals.token}`,
                "Accept": "application/json"
            }
        })
    }catch (e){
        return next(createError("Failed to get data from user service", 500))
    }

    if(userDataRequest.ok){
        const data = await userDataRequest.json()
        req.locals.userData = data
    }else if(userDataRequest.status === 401){
        return next(createError("Not Authorized: token is invalid", 403))
    }else {
        return next(createError("User service returned an error " + await userDataRequest.text(), 500))
    }
}

module.exports = getUserInfo