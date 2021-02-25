const fetchMock = require("fetch-mock")
const createApplication = require("./createApplication")
afterEach(() => {
    fetchMock.restore()
})
it("successfully creates an application and stores the url in the req locals", async () =>{
    fetchMock.postOnce(
        `${process.env.CURAM_API}/redirect/prescreen/intake`,
        {
            status: 200,
            redirectUrl: "http://some-url.com",
        }
    )

    const req = {
        locals: {
            userData: {
                "guid": "9aff6e2e-fbf3-4b4e-acc4-46df8491e323",
                "personAddressLineItem2": null,
                "personPhoneNumber": 6132345678,
                "personAddressLineItem1": "584 TRIANGLE ST",
                "personEmailAddress": "Linda.Smith@fakemail.ca",
                "personAddressCity": "Ottawa",
                "personGender": "SX2",
                "directDepositAccountNumber": 9999999,
                "directDepositTransitNumber": 99999,
                "personAddressPostalcode": "K2V0M1",
                "personAddressProvince": "ON",
                "personDateOfBirth": "24/10/1980",
                "directDepositFiNumber": 999,
                "personSin": 812814343,
                "personLastName": "Smith",
                "personFirstName": "Linda"
            }
        },
        body: {
            reasonForSeparation: "fsdf",
            incomeDetails: "sdfsd",
            outOfWork: "csdfsd"
        }
    }
    const nextFnMock = jest.fn()

    await createApplication(req, "maternity", nextFnMock)

    expect(req.locals.benefitApplicationLinks["maternity"]).toEqual("http://some-url.com")
})
it("calls next with error when curam throws error", async () =>{
    fetchMock.postOnce(
        `${process.env.CURAM_API}/redirect/prescreen/intake`,
        {
            throws: new Error("hello")
        }
    )

    const req = {
        locals: {
            userData: {
                "guid": "9aff6e2e-fbf3-4b4e-acc4-46df8491e323",
                "personAddressLineItem2": null,
                "personPhoneNumber": 6132345678,
                "personAddressLineItem1": "584 TRIANGLE ST",
                "personEmailAddress": "Linda.Smith@fakemail.ca",
                "personAddressCity": "Ottawa",
                "personGender": "SX2",
                "directDepositAccountNumber": 9999999,
                "directDepositTransitNumber": 99999,
                "personAddressPostalcode": "K2V0M1",
                "personAddressProvince": "ON",
                "personDateOfBirth": "24/10/1980",
                "directDepositFiNumber": 999,
                "personSin": 812814343,
                "personLastName": "Smith",
                "personFirstName": "Linda"
            }
        },
        body: {
            reasonForSeparation: "fsdf",
            incomeDetails: "sdfsd",
            outOfWork: "csdfsd"
        }
    }
    const nextFnMock = jest.fn()

    await createApplication(req, "maternity", nextFnMock)

    expect(nextFnMock.mock.calls.length).toEqual(1)
    expect(nextFnMock.mock.calls[0][0].message).toEqual("Curam failed to create an application")
    expect(nextFnMock.mock.calls[0][0].statusCode).toEqual(500)
})
it("calls next with error when curam returns non ok status code", async () => {
    fetchMock.postOnce(
        `${process.env.CURAM_API}/redirect/prescreen/intake`,
        {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: "hello"
        }
    )

    const req = {
        locals: {
            userData: {
                "guid": "9aff6e2e-fbf3-4b4e-acc4-46df8491e323",
                "personAddressLineItem2": null,
                "personPhoneNumber": 6132345678,
                "personAddressLineItem1": "584 TRIANGLE ST",
                "personEmailAddress": "Linda.Smith@fakemail.ca",
                "personAddressCity": "Ottawa",
                "personGender": "SX2",
                "directDepositAccountNumber": 9999999,
                "directDepositTransitNumber": 99999,
                "personAddressPostalcode": "K2V0M1",
                "personAddressProvince": "ON",
                "personDateOfBirth": "24/10/1980",
                "directDepositFiNumber": 999,
                "personSin": 812814343,
                "personLastName": "Smith",
                "personFirstName": "Linda"
            }
        },
        body: {
            reasonForSeparation: "fsdf",
            incomeDetails: "sdfsd",
            outOfWork: "csdfsd"
        }
    }

    const nextFnMock = jest.fn()

    await createApplication(req, "maternity", nextFnMock)

    expect(nextFnMock.mock.calls.length).toEqual(1)
    expect(nextFnMock.mock.calls[0][0].message).toEqual("Curam failed to create an application hello")
    expect(nextFnMock.mock.calls[0][0].statusCode).toEqual(500)

})