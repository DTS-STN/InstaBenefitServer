const request = require("supertest");
const express = require('express');
const app = require("./app")

it("server can request health check route and receive 200 response", async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
})

it("when an unknown path is presented it returns a 404", async () => {
    const response = await request(app).get("/fsdfdsf")
    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual(
        {
            statusCode: 404,
            message: "page not found"
        }
    )
})

it("when an error is thrown by a handler it returns a 500", async () =>{
    const response = await request(app).get("/error")
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({
        statusCode: 500,
        message: "something something"
    })
})

