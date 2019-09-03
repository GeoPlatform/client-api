
const chai = require('chai');
const expect = chai.expect;

var mock = require('mock-require');

const API = require('../../dist/bundles/geoplatform-client.umd');
const ItemTypes = API.ItemTypes;

//needed to use the base client lib in this test server
// as the client-node UMD file will attempt to require('@geoplatform/client')
mock('@geoplatform/client', API);

const HttpClient = require('../../dist/bundles/geoplatform-client-node.umd').NodeHttpClient;

const URL = 'https://ual.geoplatform.gov/api/items';


chai.config.includeStack = true;

describe('# NodeHttpService', function() {

    let client = new HttpClient();

    it("should allow custom headers", (done) => {

        let args = {
            method:"GET",
            url: URL,
            params: {
                type: ItemTypes.DATASET
            },
            headers: {
                'X-Header-Custom': 'test'
            }
        };

        //convert generic request object into client-specific request objects
        let opts = client.createRequestOpts(args);
        expect(opts).to.be.ok;
        expect(opts.url).to.equal(args.url);
        expect(opts.qs).to.be.ok;                           //RequestJS uses 'qs' for parameters
        expect(opts.qs.type).to.equal(args.params.type);    // ...
        expect(opts.headers['X-Header-Custom']).to.exist;
        expect(opts.headers['X-Header-Custom']).to.equal('test');
        done();
    });



    it("should communicate with API host", function(done) {

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
