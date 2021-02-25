const fetchMock = require("fetch-mock")
const getEligibility = require("./getEligibility")

afterEach(() => {
    fetchMock.restore()
})

it("successfully gets elegibility data", async () => {
    fetchMock.postOnce(
        `${process.env.BENEFIT_SERVICE_API}/benefits/eligible`,
        {
            headers: {
                "Content-Type": "application/json"
            },
            body: [
                1, 3
            ]
        }
    )

    const req = {
        body: {
            hello: "hello"
        }
    }

    const nextMockFn = jest.fn()

    const benefitsEligible = await getEligibility(req, nextMockFn)

    expect(benefitsEligible).toEqual([1,3])
})

it("calls next with error when eligibility route throws error", async () =>{
    fetchMock.postOnce(
        `${process.env.BENEFIT_SERVICE_API}/benefits/eligible`,
        {
            throws: new Error("hello")
        }
    )

    const req = {
        body: {
            hello: "hello"
        }
    }

    const nextMockFn = jest.fn()

    await getEligibility(req, nextMockFn)

    expect(nextMockFn.mock.calls.length).toEqual(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual("Benefit service returned an error")
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(500)
})

it("calls next with error when eligibility route returns non ok status code", async () =>{
    fetchMock.postOnce(
        `${process.env.BENEFIT_SERVICE_API}/benefits/eligible`,
        {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: "hello"
        }
    )

    const req = {
        body: {
            hello: "hello"
        }
    }

    const nextMockFn = jest.fn()

    await getEligibility(req, nextMockFn)

    expect(nextMockFn.mock.calls.length).toEqual(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual("Benefit service returned an error hello")
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(500)
})