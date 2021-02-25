const convertToUrlEncodedForm = require("./convertToUrlEncodedForm")

it("properly encoded data", () => {
    let dataToConvert = {
        hello: "hi",
        bye: "goodbye"
    }

    const data = convertToUrlEncodedForm(dataToConvert)
    expect(data).toBe("hello=hi&bye=goodbye")
})