
const chai = require('chai');
const expect = chai.expect;

const mock = require('mock-require');

const API             = require('../../dist/bundles/geoplatform-client.umd');
const Query           = API.Query;
const ItemTypes       = API.ItemTypes;
const AbstractService = API.AbstractService;
const HttpClient      = API.XHRHttpClient;


//needed to use the base client lib in this test server
// as the client-node UMD file will attempt to require('@geoplatform/client')
mock('@geoplatform/client', API);


chai.config.includeStack = true;

describe('# BaseService', function() {


    class TestService extends AbstractService {
        constructor() {
            super('', new HttpClient());
        }
    }



    it("should support user-supplied configuration options", (done) => {

        let service = new TestService();

        //these options would be passed in by user using service's 'options' parameter
        //  `return service.get( arg, options );`
        let userOpts = {
            headers: {
                'X-Header-Custom': "testing"
            },
            params: { test: true }
        };

        //these options would be constructed by the service invoking the client to issue a request
        let apiArgs  = {
            method:"GET",
            url: URL,
            params: { type: ItemTypes.DATASET },
            options: userOpts   //<-- service adds user-supplied config onto request object
        };

        //convert generic request object into request objects executable by the configured client
        let args = Object.assign({}, apiArgs);  //clone args so we don't lose data on comparables above
        let opts = service.createRequestOpts( args );
        console.log(JSON.stringify(opts, null, ' '));
        expect(opts).to.be.ok;
        expect(opts.url).to.equal( apiArgs.url, "Invalid API url" );
        expect(opts.params).to.be.exist;
        expect(opts.params.type).to.equal( apiArgs.params.type, "Invalid api type parameter" );
        expect(opts.params.test).to.equal( userOpts.params.test, "Invalid user config parameter" );
        expect(opts.headers).to.be.exist;
        expect(opts.headers['X-Header-Custom']).to.exist;
        expect(opts.headers['X-Header-Custom']).to.equal(
            userOpts.headers['X-Header-Custom'], "Invalid user config header" );

        done();
    });

});
