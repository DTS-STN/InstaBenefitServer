
const createError = function (message, statusCode){
    const errObj = new Error(message)
    errObj.statusCode = statusCode
    return errObj
}

module.exports = createError