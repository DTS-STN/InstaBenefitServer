const createError = require("../lib/createError")
require('cross-fetch/polyfill')
require("node-fetch")


async function getEligibility(req, next){
    let eligibilityRequest
    try{
        eligibilityRequest = await fetch(
        `${process.env.BENEFIT_SERVICE_API}/benefits/eligible`,
        {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req.body)
            }
        )
    }catch (e){
        return next(createError("Benefit service returned an error", 500))
    }
    if(eligibilityRequest.ok){
        return await eligibilityRequest.json()
    }else{
        return next(createError("Benefit service returned an error " + await eligibilityRequest.text(), 500))
    }
}

module.exports = getEligibility