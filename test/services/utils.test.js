
const Q = require('q');
const chai = require('chai');
const expect = chai.expect;

const mock = require('mock-require');

const API           = require('../../dist/bundles/geoplatform-client.umd');
const UtilsService   = API.UtilsService;

//needed to use the base client lib in this test server
// as the client-node UMD file will attempt to require('@geoplatform/client')
mock('@geoplatform/client', API);

const HttpClient    = require('../../dist/bundles/geoplatform-client-node.umd').NodeHttpClient;


const URL = 'https://ual.geoplatform.gov';
const URI = "http://www.geoplatform.gov/items/test";

chai.config.includeStack = true;

describe('# UtilsService', function() {

    /*
     * Export Formats
     */
    it('should support geolocation requests', function(done) {

        let svc = new UtilsService(URL, new HttpClient());
        svc.locate('Washington')
        .then( response => {
            expect(response).to.exist;
            expect(response.push).to.exist;
            expect(response.length).to.be.greaterThan(0);
            done();
        })
        .catch(e => done(e));

    });

});
