require("node-fetch")
const createError = require("../lib/createError")
require('cross-fetch/polyfill')
const convertToUrlEncodedForm = require("../lib/convertToUrlEncodedForm")

async function auth(req, res, next){
    // get bearer token
    req.locals = {}
    const auth = req.headers["authorization"]
    if(!auth || typeof auth !== "string"){
        next(createError("Not Authorized: No bearer token present", 403))
    }else{
        const authElems = auth.split(" ")
        if(authElems.length !== 2){
            return next(createError("Not Authorized: Auth header is not valid", 403))
        }else if(authElems[0] !== "Bearer"){
            return next(createError("Not Authorized: Auth header must be a Bearer token", 403))
        }
        let validateTokenReq
        try {
            validateTokenReq = await fetch(
                `${process.env.KEYCLOAK_ENDPOINT}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "application/json",
                        "Accept-Encoding": "gzip"
                    },
                    body: convertToUrlEncodedForm({
                        token: authElems[1],
                        client_id: process.env.KEYCLOAK_CLIENT_ID,
                        client_secret: process.env.KEYCLOAK_CLIENT_SECRET
                    })
                }
            )
        }catch (e){
            return next(createError("Token endpoint unable to be reached: " + e.message, 500))
        }

        if(validateTokenReq.ok){
            const requestBody = await validateTokenReq.json()
            if(requestBody.active){
                req.locals.guid = requestBody.guid
                req.locals.token = authElems[1]
                next()
            } else {
                next(createError("Not Authorized: token is not valid", 403))
            }
        }else {
            next(
                createError(
                    "Token endpoint returned an error " + await validateTokenReq.text(),
                    500
                )
            )
        }
    }
}

module.exports = auth