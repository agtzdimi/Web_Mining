# Web_Mining
Web Mining MSc Project

## Prerequisites
To proceed with the application installation a MongoDB instance should exist with calculated results about the sentiment, emotion and user profiling JSONs. To create those messages the `model_prediction.py` python script in [Sentiment/Emotion] (https://github.com/arvartho/immigration_sentiment_analysis/blob/master/model_prediction.py) where the user can define the MongoDB URI to store the information.
The same MongoDB URI should also be provided to the REST API through a `.env` file located in the root directory of web-mining-rest-api and contains the variable `MONGO_URI=<URI>`

## Installation
To install the GUI the following steps should be executed:

- `cd web-mining-gui`
- `npm i`
- `npm start`

To install the REST API server the following steps should be executed:

- `cd advancedDB-rest-api`
- `npm i`
- `npm start`

## Highlights for NodeJS backend

### index.js
File `web-mining-rest-api/server/index.js` contains the main configuration
of the NodeJS server. It is constituted of the HTTP parameters and what type
of requests are feasible to contact the server.
Moreover, in this file the endpoint that will be used for an HTTP request are
defined, e.g `/web-mining/rest/api/v1/insert_document`
This could be handy in case we wanted to insert manually a tweet or other input from the UI

### webMiningApi.js
File `web-mining-rest-api/server/routes/webMiningApi.js` contains the
api file where the actual functions will be triggered and executed.
We can use shelljs package to run shell commands or python scripts and
catch the results in STDOUT
This could be handy in case we wanted to calculate something from a python script on running time

#### Example Usage

An API call will be constituted from \<IP\>:\<Port\>/\<Endpoint\>
An example GET request can be seen below:
- `curl --request GET http://localhost:9000/web-mining/rest/api/v1/insert_document`
