
const Q = require('q');
const chai = require('chai');
const expect = chai.expect;

const API           = require('../../dist/js/geoplatform.client');
const HttpClient    = API.NodeHttpClient;

const URL = 'https://sit-ual.geoplatform.us/api/items';

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

    });

});
