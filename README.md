# Web_Mining
Web Mining MSc Project

## Create a new API Endpoint

### index.js
File `web-mining-rest-api/server/index.js` contains the main configuration
of the NodeJS server. It is constituted of the HTTP parameters and what type
of requests are feasible to contact the server.
Moreover, in this file the endpoint that will be used for an HTTP request are
defined, e.g `/web-mining/rest/api/v1/insert_document`

### webMiningApi.js
File `web-mining-rest-api/server/routes/webMiningApi.js` contains the
api file where the actual functions will be triggered and executed.
We can use shelljs package to run shell commands or python scripts and
catch the results in STDOUT

### Example Usage

An API call will be constituted from <IP>:<Port>/<Endpoint>
An example GET request can be seen below:
  `curl --request GET http://localhost:9000/web-mining/rest/api/v1/insert_document`
