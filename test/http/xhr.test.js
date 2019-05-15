
const Q = require('q');
const axios = require('axios');
// const chai = require('chai');
// const expect = chai.expect;

const API           = require('../../dist/bundles/geoplatform-client.umd');
const HttpClient    = API.XHRHttpClient;
const Types         = API.ItemTypes;

const URL = 'https://ual.geoplatform.gov/api/items';

// chai.config.includeStack = true;

// describe('# XHRHttpService', function() {
//
//     it("should communicate with API host", function(done) {

        let client = new HttpClient();

        let args = {
            method:"GET",
            url: URL,
            params: {
                type: Types.DATASET
            }
        };

        //convert generic request object into client-specific request objects
        let opts = client.createRequestOpts(args);
        if(!opts) throw new Error("Bad options");
        if(opts.url !== args.url) throw new Error("Bad url");
        if(!opts.params || opts.params.type !== args.params.type) throw new Error("Bad params");
        // expect(opts).to.be.ok;
        // expect(opts.url).to.equal(args.url);
        // expect(opts.params).to.be.ok;
        // expect(opts.params.type).to.equal(args.params.type);

        //issue request to API and handle response
        client.execute(opts)
        .then( response => {
            if(!response) throw new Error("Bad response");
            if(!response.results) throw new Error("No Results");

            let badTypes = response.results.filter(it => Types.DATASET !== it.type);
            if(badTypes && badTypes.length > 0) throw new Error("Returned wrong types");

            console.log("SUCCESS");
            // done();
        })
        .catch( e => {
            console.log("ERROR : " + e.message);
            // done(e)
        });

    // }).timeout(20000);

// });
