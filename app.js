const express = require('express');
const logger = require('morgan');
const path = require("path");
const fs = require("fs");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();


// register logging and json middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// register handlers
const routes = fs.readdirSync("./routes")
const routePaths = []
for(const i in routes){
  const routePath = "./" + path.join("routes", routes[i].replace(/\.js$/, ""))
  routePaths.push(routePath)
  const route = require(routePath)
  app.use("/", route.router)
}

// set up swagger middleware
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Insta Benefit Server",
      version: "0.1.0",
      description:
          "This api allows a post request pertaining to a users life events. When a life event is given benefits are checked to see if they are eligible",
    },
    servers: [
      {
        url: "https://instabenefitserver-dev.dev.dts-stn.com",
        description: "Production server",
      },
    ],
  },
  apis: [__filename.replace(/app.js$/, "/routes/*.js")],
};

/* istanbul ignore if */
if( process.env.NODE_ENV === "development"){
  options.definition.servers.push(
      {
        url: "http://localhost:3000",
        description: "Your localhost server for development",
      },
  )
  options.definition.servers.reverse()
}

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs),
);

// use to test error handler
if(process.env.NODE_ENV === "test"){
  const router = express.Router()
  app.use("/", router.get("/error", (req, res, next) => {
    next( new Error("something something"))
  }))
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404)
  res.json({
    statusCode: 404,
    message: "page not found",
  })
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err.stack)
  // render the error page
  res.status(500);
  res.json({
    statusCode: err.status || 500,
    message: err.message,
  })
});

module.exports = app;
