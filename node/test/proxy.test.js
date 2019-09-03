
var mock = require('mock-require');
const request    = require('request');
// require('request-debug')(request);
const express    = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');


const Client      = require('../../dist/bundles/geoplatform-client.umd');
const Config      = Client.Config;
const ItemTypes   = Client.ItemTypes;

//needed to use the base client lib in this test server
// as the client-node UMD file will attempt to require('@geoplatform/client')
mock('@geoplatform/client', Client);

const GPProxies  = require('../../dist/bundles/geoplatform-client-node.umd');
const NodeHttpClient = GPProxies.NodeHttpClient;


const chai = require('chai');
const expect = chai.expect;
chai.config.includeStack = true;






const formatterFn = function(options) {
    // Return string will be passed to logger.
    return  options.timestamp() + ' [' +
            options.level.toUpperCase() + '] ' +
            (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
}

const timestampFn = function() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
};



const logger = new (winston.Logger)({
    level: 'error',
    transports: [
        new (winston.transports.Console)({
            json: false,
            colorize: true,
            formatter: formatterFn,
            timestamp: timestampFn
        })
    ],
    exitOnError: false  //don't exit winston on uncaught exception
});




function errorHandler(err, req, res, next) {

    let e = {
        statusCode: err.status,
        message: err.message
    };
    Object.assign(e, err);
    e.stack = err.stack || {}

    let code = err.status;
    if(!code || code >= 200 && code <= 204)  //if here, shouldn't be a "OK" response
        code = 500;

    res.status(err.status || 500).json(e);

    logger.error(e);
}



const PROXY_PORT = 8888;
const MOCK_PORT = 8889;



describe('# Proxies', function() {

    var proxyServer;
    var mockServer;

    before( function() {
        mockServer = startMockServer();

        Config.configure({
            //use our fake "UAL" mock server as the target of our proxies
            ualUrl : `http://localhost:${MOCK_PORT}`
        });

        proxyServer = startProxyServer();
    });

    after( function() {
        proxyServer.close();
        mockServer.close();
    });




    describe("## Items", () => {

        it("should proxy searching items", function(done) {
            let opts = {
                method: "GET",
                url: `http://localhost:${PROXY_PORT}/api/items`,
                json: true
            };
            execute(opts).then( (body) => {
                expect(body, "no response").to.be.ok;
                expect(body.totalResults).to.be.greaterThan(0);
                expect(body.results, "no search results").to.be.ok;
                expect(body.results.length, "search results empty").to.be.greaterThan(0);
                done();
            }).catch(done);
        });

        it("should proxy get item", function(done) {
            let opts = {
                method: "GET",
                url: `http://localhost:${PROXY_PORT}/api/items/test`,
                json: true
            };
            execute(opts).then( (body) => {
                expect(body, "no response").to.be.ok;
                done();
            }).catch(done);
        });

    });


    describe("## Datasets", () => {

        it("should proxy searching datasets", function(done) {
            let opts = {
                method: "GET",
                url: `http://localhost:${PROXY_PORT}/api/datasets`,
                json: true
            };
            execute(opts).then( (body) => {
                expect(body, "no response").to.be.ok;
                expect(body.totalResults).to.be.greaterThan(0);
                expect(body.results, "no search results").to.be.ok;
                expect(body.results.length, "search results empty").to.be.greaterThan(0);
                let item = body.results[0];
                expect(item.id, "search result missing identifier").to.be.ok;
                expect(item.type).to.equal(ItemTypes.DATASET, "search result is not a dataset");
                done();
            }).catch(done);
        });

    });


    describe("## Services", () => {

        it("should proxy searching services", function(done) {
            let opts = {
                method: "GET",
                url: `http://localhost:${PROXY_PORT}/api/services`,
                json: true
            };
            execute(opts).then( (body) => {
                expect(body, "no response").to.be.ok;
                expect(body.totalResults).to.be.greaterThan(0);
                expect(body.results, "no search results").to.be.ok;
                expect(body.results.length, "search results empty").to.be.greaterThan(0);
                let item = body.results[0];
                expect(item.id, "search result missing identifier").to.be.ok;
                expect(item.type).to.equal(ItemTypes.SERVICE, "search result is not a service");
                done();
            }).catch(done);
        });

    });


    describe("## Layers", () => {

        it("should proxy searching layers", function(done) {
            let opts = {
                method: "GET",
                url: `http://localhost:${PROXY_PORT}/api/layers`,
                json: true
            };
            execute(opts).then( (body) => {
                expect(body, "no response").to.be.ok;
                expect(body.totalResults).to.be.greaterThan(0);
                expect(body.results, "no search results").to.be.ok;
                expect(body.results.length, "search results empty").to.be.greaterThan(0);
                let item = body.results[0];
                expect(item.id, "search result missing identifier").to.be.ok;
                expect(item.type).to.equal(ItemTypes.LAYER, "search result is not a layer");
                done();
            }).catch(done);
        });

    });


    describe("## Map", () => {

        it("should proxy searching maps", function(done) {
            let opts = {
                method: "GET",
                url: `http://localhost:${PROXY_PORT}/api/maps`,
                json: true
            };
            execute(opts).then( (body) => {
                expect(body, "no response").to.be.ok;
                expect(body.totalResults).to.be.greaterThan(0);
                expect(body.results, "no search results").to.be.ok;
                expect(body.results.length, "search results empty").to.be.greaterThan(0);
                let item = body.results[0];
                expect(item.id, "search result missing identifier").to.be.ok;
                expect(item.type).to.equal(ItemTypes.MAP, "search result is not a map");
                done();
            }).catch(done);
        });

    });


    describe("## Gallery", () => {

        it("should proxy searching galleries", function(done) {
            let opts = {
                method: "GET",
                url: `http://localhost:${PROXY_PORT}/api/galleries`,
                json: true
            };
            execute(opts).then( (body) => {
                expect(body, "no response").to.be.ok;
                expect(body.totalResults).to.be.greaterThan(0);
                expect(body.results, "no search results").to.be.ok;
                expect(body.results.length, "search results empty").to.be.greaterThan(0);
                let item = body.results[0];
                expect(item.id, "search result missing identifier").to.be.ok;
                expect(item.type).to.equal(ItemTypes.GALLERY, "search result is not a gallery");
                done();
            }).catch(done);
        });

    });


    describe("## Utils", () => {

        it("should proxy gazetteer requests", function(done) {
            let opts = {
                method: "GET",
                url: `http://localhost:${PROXY_PORT}/api/utils/locate`,
                qs: { location: 'Paris' },
                json: true
            };
            execute(opts).then( (body) => {
                expect(body, "no response").to.be.ok;
                expect(body.length).to.be.greaterThan(0, 'No matches returned');
                let match = body[0];
                //TODO expect on properties
                done();
            }).catch(done);
        });

    });


    describe("## KG", () => {

        it("should proxy kg suggest requests", function(done) {
            let opts = {
                method: "GET",
                url: `http://localhost:${PROXY_PORT}/api/recommender/suggest`,
                json: true
            };
            execute(opts).then( (body) => {
                expect(body).to.be.ok;
                done();
            }).catch(done);
        });

    });





    function execute( opts ) {
        return new Promise( (resolve, reject) => {
            request(opts, function(err, response, body) {
                if(err) reject(err);
                else if( (response.statusCode < 200 || response.statusCode > 204) && body.message ) {
                    reject( new Error(body.message) );
                } else {
                    resolve(body);
                }
            });
        });
    }

});







/*
 *
 * Start up our proxy server that we're testing
 *
 */
function startProxyServer() {
    var app       = express();
    app.set('port', PROXY_PORT);

    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.json({ type: 'application/vnd.api+json', limit: '10mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

    var router    = express.Router();
    router.use( GPProxies.ItemServiceProxy({ logger: logger }) );
    router.use( GPProxies.DatasetServiceProxy({ logger: logger }) );
    router.use( GPProxies.ServiceServiceProxy({ logger: logger }) );
    router.use( GPProxies.LayerServiceProxy({ logger: logger }) );
    router.use( GPProxies.MapServiceProxy({ logger: logger }) );
    router.use( GPProxies.GalleryServiceProxy({ logger: logger }) );
    router.use( GPProxies.UtilsServiceProxy({ logger: logger }) );
    router.use( GPProxies.AgolServiceProxy({ logger: logger }) );
    router.use( GPProxies.KGServiceProxy({ logger: logger })   );

    app.use('/api', router);


    // error handler, send stacktrace only during development
    app.use( errorHandler );

    // start app ===============================================
    let server = app.listen(PROXY_PORT);
    return server;
}






/*
 *
 * Start up a server that will act as our "UAL" rather than actually going _to_ UAL
 *
 */
function startMockServer() {

    var app       = express();
    app.set('port', MOCK_PORT);

    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.json({ type: 'application/vnd.api+json', limit: '10mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

    var router    = express.Router();

    router.get('/items', function(req, res, next) {
        res.json( {
            results: [ { id: 'test', type: ItemTypes.DATASET } ],
            totalResults: 1
        });
    })

    router.get('/items/:id', function(req, res, next) {
        res.json( { id: 'test', type: ItemTypes.DATASET });
    })

    router.get('/datasets', function(req, res, next) {
        res.json( {
            results: [ { id: 'test', type: ItemTypes.DATASET } ],
            totalResults: 1
        });
    })

    router.get('/datasets/:id', function(req, res, next) {
        res.json( { id: 'test', type: ItemTypes.DATASET });
    })

    router.get('/services', function(req, res, next) {
        res.json( {
            results: [ { id: 'test', type: ItemTypes.SERVICE } ],
            totalResults: 1
        });
    })

    router.get('/services/:id', function(req, res, next) {
        res.json( { id: 'test', type: ItemTypes.SERVICE });
    })

    router.get('/layers', function(req, res, next) {
        res.json( {
            results: [ { id: 'test', type: ItemTypes.LAYER } ],
            totalResults: 1
        });
    })

    router.get('/layers/:id', function(req, res, next) {
        res.json( { id: 'test', type: ItemTypes.LAYER });
    })

    router.get('/maps', function(req, res, next) {
        res.json( {
            results: [ { id: 'test', type: ItemTypes.MAP } ],
            totalResults: 1
        });
    })

    router.get('/maps/:id', function(req, res, next) {
        res.json( { id: 'test', type: ItemTypes.MAP });
    })

    router.get('/galleries', function(req, res, next) {
        res.json( {
            results: [ { id: 'test', type: ItemTypes.GALLERY } ],
            totalResults: 1
        });
    })

    router.get('/galleries/:id', function(req, res, next) {
        res.json( { id: 'test', type: ItemTypes.GALLERY });
    })

    router.get('/utils/gazetteer', function(req, res, next) {
        res.json( [ { label: "Test" } ]);
    })

    router.get('/recommender/suggest', function(req, res, next) {
        res.json( [ { id: 'test', label: "Test", type: ItemTypes.CONCEPT } ]);
    })



    app.use('/api', router);

    // error handler, send stacktrace only during development
    app.use( errorHandler );

    // start app ===============================================
    server = app.listen(MOCK_PORT);
    return server;
}
