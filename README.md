# InstaBenefitServer

This application is for the High Fidelity Prototype at ESDC to test different assumptions.

This application is written in express js. To run this application.

Step 1. Install npm dependencies
```bash 
$ npm install
```  

Step2. Run the application either in dev or production mode
```bash
# run in development mode ( server will hot reload )
$ npm run dev
# run in production mode
$ npm run start
```

Alternatively you can decide to run the application in docker
```bash
$ docker build -t instabenefitserver:latest . 
$ docker run  instabenefitserver:latest
```

## Other Commands

`npm run lint`: lints code base using eslint

`npm run lint:test`: checks code base for linting errors

`npm run test`: runs unit tests and generates coverage reports

## Environment Variables 

```CURAM_API```: endpoint for curam apis

```USER_SERVICE_API```: endpoint for user service

```BENEFIT_SERVICE_API```: endpoint for benefit service

## Swagger 

Swagger docs can be found on every environment on the `/api-docs` route. The swagger documentation is generated automatically from jsdoc strings.

