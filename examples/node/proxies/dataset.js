
const request = require("supertest-as-promised");

const GPClient = require('../../../dist/js/geoplatform.client');

const Proxy = GPClient.DatasetServiceProxy;

const express        = require('express');
const app            = express();

const Logger = {
    debug: function(str) { console.log("DEBUG: " + str) },
    error: function(str) { console.log("ERROR: " + str) },
    warn: function(str) { console.log("WARN: " + str) },
    info: function(str) { console.log("INFO: " + str) }
}


// error handler, send stacktrace only during development
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars

    let e = {
        statusCode: err.status,
        message: err.message    //Object.assign doesn't copy Error.message
    };
    Object.assign(e, err);
    e.stack = config.env === 'development' ? err.stack : {}

    //default error type based upon status code if not provided
    if(!e.error)
        e.error = "Error";

    let code = err.status;
    if(!code || code >= 200 && code <= 204)  //if here, shouldn't be a "OK" response
        code = 500;

    Logger.error( '(' + code + ') ' + e.message);

    res.status(err.status || 500).json(e);
});

/* ---------------------------
 * Proxy Service configuration
 * --------------------------- */
const proxyOptions = {
    timeout: 5000,        //optional, timeout for each request
    logger: Logger,       //optional, Logger to write messages to
    debug: true,          //optional, if true, certain debug messages will be written
}
app.use( '/api', Proxy(proxyOptions) );



// === UNCOMMENT BELOW TO HAVE THE EXAMPLE RUN AS NODE SERVICE ===
// app.set("port", 8080);
// app.listen(8080);
// exports = module.exports = app;
// ===============================================================




//SEARCH ALL
request(app).get('/api/datasets')
.then((res) => {

    if(res.status < 200 || res.status > 201) {
        throw new Error('(' + res.status + ') ' + res.text);
    }

    var response = JSON.parse(res.text);
    Logger.info("Search:");
    response.results.forEach( result => Logger.info(result.label) );


    //GET BY ID
    let id = response.results[0].id;
    return request(app).get('/api/datasets/' + id)

})
.then((res) => {

    if(res.status < 200 || res.status > 201) {
        throw new Error('(' + res.status + ') ' + res.text);
    }

    var response = JSON.parse(res.text);
    Logger.info("GetById: " + response.label);

})
.catch(e => { Logger.error(e.message); });
