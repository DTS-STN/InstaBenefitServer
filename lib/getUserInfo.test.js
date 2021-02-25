const fetchMock = require("fetch-mock")
const getUserInfo = require("./getUserInfo")


afterEach(() => {
    fetchMock.restore()
})

it("successfully retrieves user data", async () =>{
    fetchMock.getOnce(
        `${process.env.USER_SERVICE_API}/account/v1beta1/profile/9aff6e2e-fbf3-4b4e-acc4-46df8491e323`,
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
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
        }
    )

    const req = {
        locals: {
            guid: "9aff6e2e-fbf3-4b4e-acc4-46df8491e323",
            token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQklpQmNXaDd5TEdBenBSX1FqdEhVYk0tbUJHTnVjVk9saUlXVHZ6OVJFIn0.eyJleHAiOjE2MTQyMjI2NDgsImlhdCI6MTYxNDIyMjM0OCwianRpIjoiZTdjYmI4YjgtNDM4ZS00MTVhLTgwYzAtZDBjMzFhYzA5NDU3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuZHRzLXN0bi5jb20vYXV0aC9yZWFsbXMvYmVuZWZpdC1zZXJ2aWNlLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzZkYzA2Ny1iMzZmLTRjMmItYWNjMC02ZDU3MTkzYjY1OWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiZW5lZml0LXNlcnZpY2UtZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiN2NiYzVhYTQtMmE1ZS00MjExLWE2ZjktYmU1MmU3NmRjODk2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1tYWluLmRldi5kdHMtc3RuLmNvbSIsImh0dHBzOi8vc2VydmljZWNhbmFkYXByb3RvdHlwZWZyb250ZW5kLW1haW4uZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZGV2LmR0cy1zdG4uY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIGd1aWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkxpbmRhIFNtaXRoIiwiZ3VpZCI6IjlhZmY2ZTJlLWZiZjMtNGI0ZS1hY2M0LTQ2ZGY4NDkxZTMyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpbmRhLnNtaXRoIiwiZ2l2ZW5fbmFtZSI6IkxpbmRhIiwiZmFtaWx5X25hbWUiOiJTbWl0aCIsImVtYWlsIjoibGluZGEuc21pdGhAZmFrZW1haWwuY2EifQ.HcTcPcBWbb4dllQxWobeAYdS8Bl7L7jbPbxDIFJPauno5WEHHPdrpSK7y5p5lkp-nlXe4OenzR8EKVZC9l0v-u0vXyVt-sI-SWDkZjvv15FO9CiW0NeQ2ULGlUw10n0UpAYuHoZ5vlg0KJgbVxLjzOUhZWVodF6WxwRbE7Qdy6PKFiwe0lbYFtUvLXMZfrLggoG5pS22I5wADw1vxwRLFj2utiGTwqp3LfljOPQ-jwDv4ZPbih282llTL1_l6r4GIImETd3VuyXc3vtKz1xMx6VKshKYc5jj0XXBxNjRhwckuZ5Ku21xgNisHdz0X5NmSd7LuUrWCmSsBxGE35plQQ"
        }
    }

    const nextMockFn = jest.fn()

    await getUserInfo(req, nextMockFn)

    expect(req.locals.userData).toEqual({
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
    })
})


it("calls next with error when it occurs", async () => {
    fetchMock.getOnce(
        `${process.env.USER_SERVICE_API}/account/v1beta1/profile/9aff6e2e-fbf3-4b4e-acc4-46df8491e323`,
        {
            throws: new Error("some error occured")
        }
    )

    const req = {
        locals: {
            guid: "9aff6e2e-fbf3-4b4e-acc4-46df8491e323",
            token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQklpQmNXaDd5TEdBenBSX1FqdEhVYk0tbUJHTnVjVk9saUlXVHZ6OVJFIn0.eyJleHAiOjE2MTQyMjI2NDgsImlhdCI6MTYxNDIyMjM0OCwianRpIjoiZTdjYmI4YjgtNDM4ZS00MTVhLTgwYzAtZDBjMzFhYzA5NDU3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuZHRzLXN0bi5jb20vYXV0aC9yZWFsbXMvYmVuZWZpdC1zZXJ2aWNlLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzZkYzA2Ny1iMzZmLTRjMmItYWNjMC02ZDU3MTkzYjY1OWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiZW5lZml0LXNlcnZpY2UtZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiN2NiYzVhYTQtMmE1ZS00MjExLWE2ZjktYmU1MmU3NmRjODk2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1tYWluLmRldi5kdHMtc3RuLmNvbSIsImh0dHBzOi8vc2VydmljZWNhbmFkYXByb3RvdHlwZWZyb250ZW5kLW1haW4uZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZGV2LmR0cy1zdG4uY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIGd1aWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkxpbmRhIFNtaXRoIiwiZ3VpZCI6IjlhZmY2ZTJlLWZiZjMtNGI0ZS1hY2M0LTQ2ZGY4NDkxZTMyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpbmRhLnNtaXRoIiwiZ2l2ZW5fbmFtZSI6IkxpbmRhIiwiZmFtaWx5X25hbWUiOiJTbWl0aCIsImVtYWlsIjoibGluZGEuc21pdGhAZmFrZW1haWwuY2EifQ.HcTcPcBWbb4dllQxWobeAYdS8Bl7L7jbPbxDIFJPauno5WEHHPdrpSK7y5p5lkp-nlXe4OenzR8EKVZC9l0v-u0vXyVt-sI-SWDkZjvv15FO9CiW0NeQ2ULGlUw10n0UpAYuHoZ5vlg0KJgbVxLjzOUhZWVodF6WxwRbE7Qdy6PKFiwe0lbYFtUvLXMZfrLggoG5pS22I5wADw1vxwRLFj2utiGTwqp3LfljOPQ-jwDv4ZPbih282llTL1_l6r4GIImETd3VuyXc3vtKz1xMx6VKshKYc5jj0XXBxNjRhwckuZ5Ku21xgNisHdz0X5NmSd7LuUrWCmSsBxGE35plQQ"
        }
    }

    const nextMockFn = jest.fn()

    await getUserInfo(req, nextMockFn)

    expect(nextMockFn.mock.calls.length).toBe(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual("Failed to get data from user service")
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(500)
})

it("calls next with error when response is 401", async () => {
    fetchMock.getOnce(
        `${process.env.USER_SERVICE_API}/account/v1beta1/profile/9aff6e2e-fbf3-4b4e-acc4-46df8491e323`,
        {
            status: 401,
            headers: {
                "Content-Type": "application/json"
            },
            body: "hello"
        }
    )

    const req = {
        locals: {
            guid: "9aff6e2e-fbf3-4b4e-acc4-46df8491e323",
            token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQklpQmNXaDd5TEdBenBSX1FqdEhVYk0tbUJHTnVjVk9saUlXVHZ6OVJFIn0.eyJleHAiOjE2MTQyMjI2NDgsImlhdCI6MTYxNDIyMjM0OCwianRpIjoiZTdjYmI4YjgtNDM4ZS00MTVhLTgwYzAtZDBjMzFhYzA5NDU3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuZHRzLXN0bi5jb20vYXV0aC9yZWFsbXMvYmVuZWZpdC1zZXJ2aWNlLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzZkYzA2Ny1iMzZmLTRjMmItYWNjMC02ZDU3MTkzYjY1OWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiZW5lZml0LXNlcnZpY2UtZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiN2NiYzVhYTQtMmE1ZS00MjExLWE2ZjktYmU1MmU3NmRjODk2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1tYWluLmRldi5kdHMtc3RuLmNvbSIsImh0dHBzOi8vc2VydmljZWNhbmFkYXByb3RvdHlwZWZyb250ZW5kLW1haW4uZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZGV2LmR0cy1zdG4uY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIGd1aWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkxpbmRhIFNtaXRoIiwiZ3VpZCI6IjlhZmY2ZTJlLWZiZjMtNGI0ZS1hY2M0LTQ2ZGY4NDkxZTMyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpbmRhLnNtaXRoIiwiZ2l2ZW5fbmFtZSI6IkxpbmRhIiwiZmFtaWx5X25hbWUiOiJTbWl0aCIsImVtYWlsIjoibGluZGEuc21pdGhAZmFrZW1haWwuY2EifQ.HcTcPcBWbb4dllQxWobeAYdS8Bl7L7jbPbxDIFJPauno5WEHHPdrpSK7y5p5lkp-nlXe4OenzR8EKVZC9l0v-u0vXyVt-sI-SWDkZjvv15FO9CiW0NeQ2ULGlUw10n0UpAYuHoZ5vlg0KJgbVxLjzOUhZWVodF6WxwRbE7Qdy6PKFiwe0lbYFtUvLXMZfrLggoG5pS22I5wADw1vxwRLFj2utiGTwqp3LfljOPQ-jwDv4ZPbih282llTL1_l6r4GIImETd3VuyXc3vtKz1xMx6VKshKYc5jj0XXBxNjRhwckuZ5Ku21xgNisHdz0X5NmSd7LuUrWCmSsBxGE35plQQ"
        }
    }

    const nextMockFn = jest.fn()

    await getUserInfo(req, nextMockFn)

    expect(nextMockFn.mock.calls.length).toBe(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual("Not Authorized: token is invalid")
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(403)
})

it("calls next with error when response is any other status code", async () => {
    fetchMock.getOnce(
        `${process.env.USER_SERVICE_API}/account/v1beta1/profile/9aff6e2e-fbf3-4b4e-acc4-46df8491e323`,
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
            guid: "9aff6e2e-fbf3-4b4e-acc4-46df8491e323",
            token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQklpQmNXaDd5TEdBenBSX1FqdEhVYk0tbUJHTnVjVk9saUlXVHZ6OVJFIn0.eyJleHAiOjE2MTQyMjI2NDgsImlhdCI6MTYxNDIyMjM0OCwianRpIjoiZTdjYmI4YjgtNDM4ZS00MTVhLTgwYzAtZDBjMzFhYzA5NDU3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuZHRzLXN0bi5jb20vYXV0aC9yZWFsbXMvYmVuZWZpdC1zZXJ2aWNlLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzZkYzA2Ny1iMzZmLTRjMmItYWNjMC02ZDU3MTkzYjY1OWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiZW5lZml0LXNlcnZpY2UtZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiN2NiYzVhYTQtMmE1ZS00MjExLWE2ZjktYmU1MmU3NmRjODk2IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1tYWluLmRldi5kdHMtc3RuLmNvbSIsImh0dHBzOi8vc2VydmljZWNhbmFkYXByb3RvdHlwZWZyb250ZW5kLW1haW4uZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZGV2LmR0cy1zdG4uY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIGd1aWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkxpbmRhIFNtaXRoIiwiZ3VpZCI6IjlhZmY2ZTJlLWZiZjMtNGI0ZS1hY2M0LTQ2ZGY4NDkxZTMyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpbmRhLnNtaXRoIiwiZ2l2ZW5fbmFtZSI6IkxpbmRhIiwiZmFtaWx5X25hbWUiOiJTbWl0aCIsImVtYWlsIjoibGluZGEuc21pdGhAZmFrZW1haWwuY2EifQ.HcTcPcBWbb4dllQxWobeAYdS8Bl7L7jbPbxDIFJPauno5WEHHPdrpSK7y5p5lkp-nlXe4OenzR8EKVZC9l0v-u0vXyVt-sI-SWDkZjvv15FO9CiW0NeQ2ULGlUw10n0UpAYuHoZ5vlg0KJgbVxLjzOUhZWVodF6WxwRbE7Qdy6PKFiwe0lbYFtUvLXMZfrLggoG5pS22I5wADw1vxwRLFj2utiGTwqp3LfljOPQ-jwDv4ZPbih282llTL1_l6r4GIImETd3VuyXc3vtKz1xMx6VKshKYc5jj0XXBxNjRhwckuZ5Ku21xgNisHdz0X5NmSd7LuUrWCmSsBxGE35plQQ"
        }
    }

    const nextMockFn = jest.fn()

    await getUserInfo(req, nextMockFn)

    expect(nextMockFn.mock.calls.length).toBe(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual("User service returned an error hello")
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(500)
})