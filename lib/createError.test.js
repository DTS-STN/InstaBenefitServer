const createError = require("./createError")

it("creates error object and returns it", () =>{
    const errObj = createError("hello", 400)
    expect(errObj.message).toBe("hello")
    expect(errObj.statusCode).toBe(400)
})