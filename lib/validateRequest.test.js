const validateRequest = require("./validateRequest")
const Joi = require("joi")



it("validates schema and calls next function", () => {
    const schema = Joi.object({
        hello: Joi.string().required()
    })
    const req = {
        body: {
            hello: "hello"
        }
    }
    const mockNext = jest.fn()

    validateRequest(req, mockNext, schema)

    expect(mockNext.mock.calls.length).toBe(1)
    expect(mockNext.mock.calls[0]).toEqual([])
})

it("returns calls next with error if schema is not valid", () => {
    const schema = Joi.object({
        hello: Joi.string().required()
    })
    const req = {
        body: {}
    }
    const mockNext = jest.fn()

    validateRequest(req, mockNext, schema)

    expect(mockNext.mock.calls.length).toBe(1)
    expect(mockNext.mock.calls[0][0].message).toBe("Validation error: \"hello\" is required")
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400)

})