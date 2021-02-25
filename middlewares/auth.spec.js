const fetchMock = require("fetch-mock")
const auth = require("./auth")

afterEach(() => {
    fetchMock.restore()
})
it("validates token is correct and calls next", async () =>{
    fetchMock.postOnce(
        `${process.env.KEYCLOAK_ENDPOINT}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`,
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Content-Encoding": "gzip"
            },
            body: {
                "exp": 1614216117,
                "iat": 1614215817,
                "jti": "71ff3d9f-ce37-4118-84e9-e945521afd34",
                "iss": "https://keycloak.dev.dts-stn.com/auth/realms/benefit-service-dev",
                "aud": "account",
                "sub": "976dc067-b36f-4c2b-acc0-6d57193b659b",
                "typ": "Bearer",
                "azp": "benefit-service-frontend",
                "session_state": "d5d5758a-1c08-4a73-bb08-32d3754a40ce",
                "name": "Linda Smith",
                "given_name": "Linda",
                "family_name": "Smith",
                "preferred_username": "linda.smith",
                "email": "linda.smith@fakemail.ca",
                "email_verified": true,
                "acr": "1",
                "allowed-origins": [
                    "https://servicecanadaprototypefrontend-main.dev.dts-stn.com",
                    "https://servicecanadaprototypefrontend-main.dts-dev.dtbdmhfp.com",
                    "https://servicecanadaprototypefrontend-int.dts-dev.dtbdmhfp.com",
                    "https://servicecanadaprototypefrontend-int.dev.dts-stn.com",
                    "http://localhost:3000"
                ],
                "realm_access": {
                    "roles": [
                        "offline_access",
                        "uma_authorization"
                    ]
                },
                "resource_access": {
                    "account": {
                        "roles": [
                            "manage-account",
                            "manage-account-links",
                            "view-profile"
                        ]
                    }
                },
                "scope": "profile email guid",
                "guid": "9aff6e2e-fbf3-4b4e-acc4-46df8491e323",
                "client_id": "benefit-service-frontend",
                "username": "linda.smith",
                "active": true
            }
        }
    )

    const req = {
        headers: {
            "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQklpQmNXaDd5TEdBenBSX1FqdEhVYk0tbUJHTnVjVk9saUlXVHZ6OVJFIn0.eyJleHAiOjE2MTQyMTYxMTcsImlhdCI6MTYxNDIxNTgxNywianRpIjoiNzFmZjNkOWYtY2UzNy00MTE4LTg0ZTktZTk0NTUyMWFmZDM0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuZHRzLXN0bi5jb20vYXV0aC9yZWFsbXMvYmVuZWZpdC1zZXJ2aWNlLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzZkYzA2Ny1iMzZmLTRjMmItYWNjMC02ZDU3MTkzYjY1OWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiZW5lZml0LXNlcnZpY2UtZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiZDVkNTc1OGEtMWMwOC00YTczLWJiMDgtMzJkMzc1NGE0MGNlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1tYWluLmRldi5kdHMtc3RuLmNvbSIsImh0dHBzOi8vc2VydmljZWNhbmFkYXByb3RvdHlwZWZyb250"+
                "ZW5kLW1haW4uZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZGV2LmR0cy1zdG4uY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIGd1aWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkxpbmRhIFNtaXRoIiwiZ3VpZCI6IjlhZmY2ZTJlLWZiZjMtNGI0ZS1hY2M0LTQ2ZGY4NDkxZTMyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpbmRhLnNtaXRoIiwiZ2l2ZW5fbmFtZSI6IkxpbmRhIiwiZmFtaWx5X25hbWUiOiJTbWl0aCIs"+
                "ImVtYWlsIjoibGluZGEuc21pdGhAZmFrZW1haWwuY2EifQ.D-_rOJkoeHQLmTqBHBR3Ucszuj0mG3NoKF6tNn7xPWLslQZuf3sajP3gilpkA055Vuc3iUJzztP_E_ENGLCRTRCF-EF5V5RUqHpGwAe1Ogq8UUhJD1InHHyAuy8JgeFP22jHC-tPjHD0FQwOiP4nyO1S6RlL7qPFX-Jl957PSFsu86Rm9tkSmqVzCynzl18Mk91kd8lELvmthBfyu7R9eyRJF4BuSsdUEBaKKUm1ImlAtDInvJkvURmTNiAPpb6fK7DH-GR6Wqsbm2l6RNRiwt96Zd7jRmC2sEsaZUfyZUl62fQPItMKlDhblJODd3MqBKxbNX9LUpkvYuLiDoM_gg"
        },
        locals: {}
    }

    const res = {}

    const nextMockFn = jest.fn()

    await auth(req, res, nextMockFn)

    expect(nextMockFn.mock.calls.length).toEqual(1)
    expect(req.locals.guid).toBe("9aff6e2e-fbf3-4b4e-acc4-46df8491e323")
    expect(req.locals.token).toBe("eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQklpQmNXaDd5TEdBenBSX1FqdEhVYk0tbUJHTnVjVk9saUlXVHZ6OVJFIn0.eyJleHAiOjE2MTQyMTYxMTcsImlhdCI6MTYxNDIxNTgxNywianRpIjoiNzFmZjNkOWYtY2UzNy00MTE4LTg0ZTktZTk0NTUyMWFmZDM0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuZHRzLXN0bi5jb20vYXV0aC9yZWFsbXMvYmVuZWZpdC1zZXJ2aWNlLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzZkYzA2Ny1iMzZmLTRjMmItYWNjMC02ZDU3MTkzYjY1OWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiZW5lZml0LXNlcnZpY2UtZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiZDVkNTc1OGEtMWMwOC00YTczLWJiMDgtMzJkMzc1NGE0MGNlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1tYWluLmRldi5kdHMtc3RuLmNvbSIsImh0dHBzOi8vc2VydmljZWNhbmFkYXByb3RvdHlwZWZyb250ZW5kLW1haW4uZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZGV2LmR0cy1zdG4uY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIGd1aWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkxpbmRhIFNtaXRoIiwiZ3VpZCI6IjlhZmY2ZTJlLWZiZjMtNGI0ZS1hY2M0LTQ2ZGY4NDkxZTMyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpbmRhLnNtaXRoIiwiZ2l2ZW5fbmFtZSI6IkxpbmRhIiwiZmFtaWx5X25hbWUiOiJTbWl0aCIsImVtYWlsIjoibGluZGEuc21pdGhAZmFrZW1haWwuY2EifQ.D-_rOJkoeHQLmTqBHBR3Ucszuj0mG3NoKF6tNn7xPWLslQZuf3sajP3gilpkA055Vuc3iUJzztP_E_ENGLCRTRCF-EF5V5RUqHpGwAe1Ogq8UUhJD1InHHyAuy8JgeFP22jHC-tPjHD0FQwOiP4nyO1S6RlL7qPFX-Jl957PSFsu86Rm9tkSmqVzCynzl18Mk91kd8lELvmthBfyu7R9eyRJF4BuSsdUEBaKKUm1ImlAtDInvJkvURmTNiAPpb6fK7DH-GR6Wqsbm2l6RNRiwt96Zd7jRmC2sEsaZUfyZUl62fQPItMKlDhblJODd3MqBKxbNX9LUpkvYuLiDoM_gg")
})

it("calls next with error if no auth header", async () =>{
    const req = {
        headers: {},
        locals: {}
    }

    const res = {}

    const nextMockFn = jest.fn()

    await auth(req, res, nextMockFn)

    expect(nextMockFn.mock.calls.length).toEqual(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual(
        "Not Authorized: No bearer token present"
    )
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(
        403
    )
})

it("calls next with error if no bearer token is present", async () => {
    const req = {
        headers: {
            "authorization": "notvalidtoken"
        },
        locals: {}
    }

    const res = {}

    const nextMockFn = jest.fn()

    await auth(req, res, nextMockFn)

    expect(nextMockFn.mock.calls.length).toEqual(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual(
        "Not Authorized: Auth header is not valid"
    )
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(
        403
    )
})

it("calls next with error if no bearer token is present but proper format", async () => {
    const req = {
        headers: {
            "authorization": "not validtoken"
        },
        locals: {}
    }

    const res = {}

    const nextMockFn = jest.fn()

    await auth(req, res, nextMockFn)

    expect(nextMockFn.mock.calls.length).toEqual(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual(
        "Not Authorized: Auth header must be a Bearer token"
    )
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(
        403
    )
})

it("calls next with error if token endpoint returns error", async () => {
    fetchMock.postOnce(
        `${process.env.KEYCLOAK_ENDPOINT}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`,
        {
            throws: new Error("some error")
        }
    )

    const req = {
        headers: {
            "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQklpQmNXaDd5TEdBenBSX1FqdEhVYk0tbUJHTnVjVk9saUlXVHZ6OVJFIn0.eyJleHAiOjE2MTQyMTYxMTcsImlhdCI6MTYxNDIxNTgxNywianRpIjoiNzFmZjNkOWYtY2UzNy00MTE4LTg0ZTktZTk0NTUyMWFmZDM0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuZHRzLXN0bi5jb20vYXV0aC9yZWFsbXMvYmVuZWZpdC1zZXJ2aWNlLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzZkYzA2Ny1iMzZmLTRjMmItYWNjMC02ZDU3MTkzYjY1OWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiZW5lZml0LXNlcnZpY2UtZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiZDVkNTc1OGEtMWMwOC00YTczLWJiMDgtMzJkMzc1NGE0MGNlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1tYWluLmRldi5kdHMtc3RuLmNvbSIsImh0dHBzOi8vc2VydmljZWNhbmFkYXByb3RvdHlwZWZyb250"+
                "ZW5kLW1haW4uZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZGV2LmR0cy1zdG4uY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIGd1aWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkxpbmRhIFNtaXRoIiwiZ3VpZCI6IjlhZmY2ZTJlLWZiZjMtNGI0ZS1hY2M0LTQ2ZGY4NDkxZTMyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpbmRhLnNtaXRoIiwiZ2l2ZW5fbmFtZSI6IkxpbmRhIiwiZmFtaWx5X25hbWUiOiJTbWl0aCIs"+
                "ImVtYWlsIjoibGluZGEuc21pdGhAZmFrZW1haWwuY2EifQ.D-_rOJkoeHQLmTqBHBR3Ucszuj0mG3NoKF6tNn7xPWLslQZuf3sajP3gilpkA055Vuc3iUJzztP_E_ENGLCRTRCF-EF5V5RUqHpGwAe1Ogq8UUhJD1InHHyAuy8JgeFP22jHC-tPjHD0FQwOiP4nyO1S6RlL7qPFX-Jl957PSFsu86Rm9tkSmqVzCynzl18Mk91kd8lELvmthBfyu7R9eyRJF4BuSsdUEBaKKUm1ImlAtDInvJkvURmTNiAPpb6fK7DH-GR6Wqsbm2l6RNRiwt96Zd7jRmC2sEsaZUfyZUl62fQPItMKlDhblJODd3MqBKxbNX9LUpkvYuLiDoM_gg"
        },
        locals: {}
    }

    const res = {}

    const nextMockFn = jest.fn()

    await auth(req, res, nextMockFn)

    expect(nextMockFn.mock.calls.length).toBe(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual(
        "Token endpoint unable to be reached: some error"
    )
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(
        500
    )
})

it("calls next with error when token is not valid", async () =>{
    fetchMock.postOnce(
        `${process.env.KEYCLOAK_ENDPOINT}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`,
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Content-Encoding": "gzip"
            },
            body: {
                "active": false
            }
        }
    )

    const req = {
        headers: {
            "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQklpQmNXaDd5TEdBenBSX1FqdEhVYk0tbUJHTnVjVk9saUlXVHZ6OVJFIn0.eyJleHAiOjE2MTQyMTYxMTcsImlhdCI6MTYxNDIxNTgxNywianRpIjoiNzFmZjNkOWYtY2UzNy00MTE4LTg0ZTktZTk0NTUyMWFmZDM0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuZHRzLXN0bi5jb20vYXV0aC9yZWFsbXMvYmVuZWZpdC1zZXJ2aWNlLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzZkYzA2Ny1iMzZmLTRjMmItYWNjMC02ZDU3MTkzYjY1OWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiZW5lZml0LXNlcnZpY2UtZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiZDVkNTc1OGEtMWMwOC00YTczLWJiMDgtMzJkMzc1NGE0MGNlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1tYWluLmRldi5kdHMtc3RuLmNvbSIsImh0dHBzOi8vc2VydmljZWNhbmFkYXByb3RvdHlwZWZyb250"+
                "ZW5kLW1haW4uZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZGV2LmR0cy1zdG4uY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIGd1aWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkxpbmRhIFNtaXRoIiwiZ3VpZCI6IjlhZmY2ZTJlLWZiZjMtNGI0ZS1hY2M0LTQ2ZGY4NDkxZTMyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpbmRhLnNtaXRoIiwiZ2l2ZW5fbmFtZSI6IkxpbmRhIiwiZmFtaWx5X25hbWUiOiJTbWl0aCIs"+
                "ImVtYWlsIjoibGluZGEuc21pdGhAZmFrZW1haWwuY2EifQ.D-_rOJkoeHQLmTqBHBR3Ucszuj0mG3NoKF6tNn7xPWLslQZuf3sajP3gilpkA055Vuc3iUJzztP_E_ENGLCRTRCF-EF5V5RUqHpGwAe1Ogq8UUhJD1InHHyAuy8JgeFP22jHC-tPjHD0FQwOiP4nyO1S6RlL7qPFX-Jl957PSFsu86Rm9tkSmqVzCynzl18Mk91kd8lELvmthBfyu7R9eyRJF4BuSsdUEBaKKUm1ImlAtDInvJkvURmTNiAPpb6fK7DH-GR6Wqsbm2l6RNRiwt96Zd7jRmC2sEsaZUfyZUl62fQPItMKlDhblJODd3MqBKxbNX9LUpkvYuLiDoM_gg"
        },
        locals: {}
    }

    const res = {}

    const nextMockFn = jest.fn()

    await auth(req, res, nextMockFn)
    expect(nextMockFn.mock.calls.length).toEqual(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual("Not Authorized: token is not valid")
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(403)
})

it("calls next with error when token endpoint returns non okay response", async () => {
    fetchMock.postOnce(
        `${process.env.KEYCLOAK_ENDPOINT}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`,
        {
            status: 400,
            headers: {
                "Content-Type": "application/json",
                "Content-Encoding": "gzip"
            },
            body: "hello"
        }
    )

    const req = {
        headers: {
            "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQklpQmNXaDd5TEdBenBSX1FqdEhVYk0tbUJHTnVjVk9saUlXVHZ6OVJFIn0.eyJleHAiOjE2MTQyMTYxMTcsImlhdCI6MTYxNDIxNTgxNywianRpIjoiNzFmZjNkOWYtY2UzNy00MTE4LTg0ZTktZTk0NTUyMWFmZDM0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5kZXYuZHRzLXN0bi5jb20vYXV0aC9yZWFsbXMvYmVuZWZpdC1zZXJ2aWNlLWRldiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzZkYzA2Ny1iMzZmLTRjMmItYWNjMC02ZDU3MTkzYjY1OWIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiZW5lZml0LXNlcnZpY2UtZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiZDVkNTc1OGEtMWMwOC00YTczLWJiMDgtMzJkMzc1NGE0MGNlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1tYWluLmRldi5kdHMtc3RuLmNvbSIsImh0dHBzOi8vc2VydmljZWNhbmFkYXByb3RvdHlwZWZyb250"+
                "ZW5kLW1haW4uZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZHRzLWRldi5kdGJkbWhmcC5jb20iLCJodHRwczovL3NlcnZpY2VjYW5hZGFwcm90b3R5cGVmcm9udGVuZC1pbnQuZGV2LmR0cy1zdG4uY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIGd1aWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkxpbmRhIFNtaXRoIiwiZ3VpZCI6IjlhZmY2ZTJlLWZiZjMtNGI0ZS1hY2M0LTQ2ZGY4NDkxZTMyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImxpbmRhLnNtaXRoIiwiZ2l2ZW5fbmFtZSI6IkxpbmRhIiwiZmFtaWx5X25hbWUiOiJTbWl0aCIs"+
                "ImVtYWlsIjoibGluZGEuc21pdGhAZmFrZW1haWwuY2EifQ.D-_rOJkoeHQLmTqBHBR3Ucszuj0mG3NoKF6tNn7xPWLslQZuf3sajP3gilpkA055Vuc3iUJzztP_E_ENGLCRTRCF-EF5V5RUqHpGwAe1Ogq8UUhJD1InHHyAuy8JgeFP22jHC-tPjHD0FQwOiP4nyO1S6RlL7qPFX-Jl957PSFsu86Rm9tkSmqVzCynzl18Mk91kd8lELvmthBfyu7R9eyRJF4BuSsdUEBaKKUm1ImlAtDInvJkvURmTNiAPpb6fK7DH-GR6Wqsbm2l6RNRiwt96Zd7jRmC2sEsaZUfyZUl62fQPItMKlDhblJODd3MqBKxbNX9LUpkvYuLiDoM_gg"
        },
        locals: {}
    }

    const res = {}

    const nextMockFn = jest.fn()

    await auth(req, res, nextMockFn)
    expect(nextMockFn.mock.calls.length).toEqual(1)
    expect(nextMockFn.mock.calls[0][0].message).toEqual("Token endpoint returned an error hello")
    expect(nextMockFn.mock.calls[0][0].statusCode).toEqual(500)
})