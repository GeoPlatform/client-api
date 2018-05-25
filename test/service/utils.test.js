const Q = require('q');
const chai = require('chai');
const expect = chai.expect;

const API            = require('../../dist/js/geoplatform.client');
const UtilsService   = API.UtilsService;
const NodeHttpClient = API.NodeHttpClient;

const URL = 'https://sit-ual.geoplatform.us';
const URI = "http://www.geoplatform.gov/items/test";

chai.config.includeStack = true;

describe('# UtilsService', function() {

    /*
     * Export Formats
     */
    it('should support geolocation requests', function(done) {

        let svc = new UtilsService(URL, new NodeHttpClient());
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
