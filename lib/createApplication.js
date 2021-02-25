const createError = require("./createError")
require('cross-fetch/polyfill')
require("node-fetch")

async function createApplication(req, benefitType, next){
    let createApplicationRequest
    const userProfile = req.locals.userData
    try{
        createApplicationRequest = await fetch(
            `${process.env.CURAM_API}/redirect/prescreen/intake`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    guid: req.locals.guid,
                    "Authorization": "Bearer " + req.locals.token

                },
                body: JSON.stringify({
                    benefitType,
                    reasonForSeparation: req.body.reasonForSeparation,
                    incomeDetails: req.body.incomeDetails,
                    outOfWork: req.body.outOfWork,
                    person: {
                        sin: `${userProfile.personSin ? userProfile.personSin : ""}`,
                        firstName: userProfile.personFirstName,
                        lastName: userProfile.personLastName,
                        dateOfBirth: userProfile.personDateOfBirth,
                        gender: userProfile.personGender,
                        emailAddress: userProfile.personEmailAddress,
                        phoneNumber: `${
                            userProfile.personPhoneNumber ? userProfile.personPhoneNumber : ""
                        }`,
                        address: {
                            lineItem1: userProfile.personAddressLineItem1,
                            lineItem2:
                                userProfile.personAddressLineItem2 === "NULL"
                                    ? ""
                                    : userProfile.personAddressLineItem2,
                            city: userProfile.personAddressCity,
                            province: userProfile.personAddressProvince,
                            postalcode: userProfile.personAddressPostalcode,
                        },
                    },
                    bankingInfo: {
                        directDepositTransitNumber: `${
                            userProfile.directDepositTransitNumber
                                ? userProfile.directDepositTransitNumber
                                : ""
                        }`,
                        directDepositFiNumber: `${
                            userProfile.directDepositFiNumber
                                ? userProfile.directDepositFiNumber
                                : ""
                        }`,
                        directDepositAccountNumber: `${
                            userProfile.directDepositAccountNumber
                                ? userProfile.directDepositAccountNumber
                                : ""
                        }`,
                    }
                })
            }
        )
    }catch (e){
        return next(createError("Curam failed to create an application", 500))
    }

    if(createApplicationRequest.ok){
        if(req.locals.benefitApplicationLinks){
            req.locals.benefitApplicationLinks[benefitType] = createApplicationRequest.url
        }
        else {
            req.locals.benefitApplicationLinks = {
                [benefitType]: createApplicationRequest.url
            }
        }
    }else{
        return next(createError("Curam failed to create an application " + await createApplicationRequest.text(), 500))
    }

}

module.exports = createApplication