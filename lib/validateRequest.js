function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        let errObj = new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
        errObj.statusCode = 400
        next(errObj);
    } else {
        req.body = value;
        next();
    }
}

module.exports = validateRequest