
const request = require("supertest-as-promised");

const GPClient = require('../../../dist/js/geoplatform.client');
const HttpClient = GPClient.NodeHttpClient;

const Proxy = GPClient.ServiceServiceProxy;

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

const proxyOptions = {
    timeout: 5000,
    logger: Logger,
    debug: true,
    paths: {
        import: false
    }
}
app.use( '/api', Proxy(proxyOptions) );


// === UNCOMMENT BELOW TO HAVE THE EXAMPLE RUN AS NODE SERVICE ===
// app.set("port", 8080);
// app.listen(8080);
// exports = module.exports = app;
// ===============================================================


//LIST SERVICE TYPES
request(app).get("/api/serviceTypes")
.then( res => {

    var response = JSON.parse(res.text);
    Logger.info("Service Types");
    response.forEach( result => Logger.info(result.label) );


    //SEARCH ALL
    return request(app).get('/api/services');
})
.then((res) => {

    if(res.status < 200 || res.status > 201) {
        throw new Error('(' + res.status + ') ' + res.text);
    }

    var response = JSON.parse(res.text);
    Logger.info("Search:");
    response.results.forEach( result => Logger.info(result.label) );


    //GET BY ID
    let id = response.results[0].id;
    return request(app).get('/api/services/' + id)
})
.then((res) => {

    var response = JSON.parse(res.text);
    Logger.info("GetById: " + response.label);


    //TEST IMPORT WAS NOT EXPOSED VIA ROUTER
    return request(app).post('/api/services/import', {});

})
.then( res => {
    if(res.status !== 404) {
        throw new Error("Import was mistakenly bound as a route");
    } else {
        Logger.info("Import was hidden from proxying");
    }
})
.catch(e => { Logger.error(e.message); });