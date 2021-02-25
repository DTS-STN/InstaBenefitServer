const fetchMock = require("fetch-mock")
const createNotification = require("./createNotification")

afterEach(() => {
    fetchMock.restore()
})

it("creates a notification", async () => {
    fetchMock.postOnce(
        `${process.env.CURAM_API}/instabenefit/notifications`,
        {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    status: "succeeded"
                }
            }
        )
    const req = {
        locals: {
            benefitApplicationLinks: {
                "HFP1RI": "http://some-link.com"
            }
        }
    }

    const nextFnMock = jest.fn()

    await createNotification(req, "HFP1RI", nextFnMock)
})

it("calls next with error when error thrown", async () => {
    fetchMock.postOnce(
        `${process.env.CURAM_API}/instabenefit/notifications`,
        {
            throws: new Error("some error")
        }
    )
    const req = {
        locals: {
            benefitApplicationLinks: {
                "HFP1RI": "http://some-link.com"
            }
        }
    }

    const nextFnMock = jest.fn()

    await createNotification(req, "HFP1RI", nextFnMock)

    expect(nextFnMock.mock.calls.length).toEqual(1)
    expect(nextFnMock.mock.calls[0][0].message).toEqual("Curam failed to create a notification")
    expect(nextFnMock.mock.calls[0][0].statusCode).toEqual(500)
})

it("calls next with error when non okay response is returned", async () => {
    fetchMock.postOnce(
        `${process.env.CURAM_API}/instabenefit/notifications`,
        {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: "sfdsdf"
        }
    )
    const req = {
        locals: {
            benefitApplicationLinks: {
                "HFP1RI": "http://some-link.com"
            }
        }
    }

    const nextFnMock = jest.fn()

    await createNotification(req, "HFP1RI", nextFnMock)

    expect(nextFnMock.mock.calls.length).toEqual(1)
    expect(nextFnMock.mock.calls[0][0].message).toEqual("Curam failed to create a notification sfdsdf")
    expect(nextFnMock.mock.calls[0][0].statusCode).toEqual(500)
})