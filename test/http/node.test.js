
const Q = require('q');
const chai = require('chai');
const expect = chai.expect;

var mock = require('mock-require');

const API = require('../../dist/bundles/geoplatform-client.umd');

//needed to use the base client lib in this test server
// as the client-node UMD file will attempt to require('@geoplatform/client')
mock('@geoplatform/client', API);

const HttpClient = require('../../dist/bundles/geoplatform-client-node.umd').NodeHttpClient;

const URL = 'https://ual.geoplatform.gov/api/items';


chai.config.includeStack = true;

describe('# NodeHttpService', function() {

    it("should communicate with API host", function(done) {

        let client = new HttpClient();

        //convert generic request object into client-specific request objects
        let opts = client.createRequestOpts({
            method:"GET",
            url: URL
        });
        //issue request to API and handle response
        client.execute(opts)
        .then( response => {
            done();
        })
        .catch( e => done(e) );

    }).timeout(20000);

});
