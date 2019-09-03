
const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

const API           = require('../../dist/bundles/geoplatform-client.umd');
const HttpClient    = API.XHRHttpClient;
const Types         = API.ItemTypes;

const URL = 'https://ual.geoplatform.gov/api/items';

chai.config.includeStack = true;

describe('# XHRHttpService', function() {

    let client = new HttpClient();


    it("should allow custom headers", (done) => {

        let args = {
            method:"GET",
            url: URL,
            params: {
                type: Types.DATASET
            },
            headers: {
                'X-Header-Custom': 'test'
            }
        };

        //convert generic request object into client-specific request objects
        let opts = client.createRequestOpts(args);
        expect(opts).to.be.ok;
        expect(opts.url).to.equal(args.url);
        expect(opts.params).to.be.ok;
        expect(opts.params.type).to.equal(args.params.type);
        expect(opts.headers['X-Header-Custom']).to.exist;
        expect(opts.headers['X-Header-Custom']).to.equal('test');

        done();
    });


    it("should communicate with API host", (done) => {

        let args = {
            method:"GET",
            url: URL,
            params: {
                type: Types.DATASET
            }
        };

        //convert generic request object into client-specific request objects
        let opts = client.createRequestOpts(args);
        expect(opts).to.be.ok;
        expect(opts.url).to.equal(args.url);
        expect(opts.params).to.be.ok;
        expect(opts.params.type).to.equal(args.params.type);

        //issue request to API and handle response
        client.execute(opts)
        .then( response => {
            expect(response).to.be.ok;
            expect(response.results).to.be.ok;

            let badTypes = response.results.filter(it => Types.DATASET !== it.type);
            expect(badTypes.length).to.equal(0, "Returned wrong types");

            done();
        })
        .catch( e => {
            done(e)
        });

    }).timeout(20000);


});
