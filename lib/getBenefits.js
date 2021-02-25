const createError = require("../lib/createError")
require('cross-fetch/polyfill')
require("node-fetch")

async function getBenefits(req, benefitIds, next){
    let benefitsRequest
    try{
        benefitsRequest = await fetch(`${process.env.BENEFIT_SERVICE_API}/benefits`)
    }catch (e){
        return next(createError("Failed to get data from benefit service", 500))
    }

    if(benefitsRequest.ok){
        const data = await benefitsRequest.json()
        req.locals.benefitsData = data.filter((value) => {
            return benefitIds.includes(value.id)
        })
    }else{
        return next(createError("Benefit service returned and error " + await benefitsRequest.text(), 500))
    }
}

module.exports = getBenefits

