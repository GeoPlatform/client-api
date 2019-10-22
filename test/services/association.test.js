
const chai = require('chai');
const expect = chai.expect;

const mock = require('mock-require');

const API           = require('../../dist/bundles/geoplatform-client.umd');
const Query         = API.Query;
const ItemTypes     = API.ItemTypes;
const AssociationService   = API.AssociationService;

//needed to use the base client lib in this test server
// as the client-node UMD file will attempt to require('@geoplatform/client')
mock('@geoplatform/client', API);

const HttpClient    = require('../../dist/bundles/geoplatform-client-node.umd').NodeHttpClient;



const URL = 'https://ual.geoplatform.gov';
const URI = "http://www.geoplatform.gov/items/test";

const ITEM_ID = "itemId";
const ASSOC_ID = "aId";

chai.config.includeStack = true;

describe('# AssociationService', function() {

    class TestHttpClient {
        constructor() {

            this.item = {
                id: ITEM_ID,
                label: 'Test',
                uri: "http://www.geoplatform.gov/items/test",
                type: ItemTypes.DATASET,
                description: 'This is a test',
                keywords: 'one,two',
                createdBy: 'test_user',
                _created: new Date().getTime(),
                modified: new Date().getTime()
            };

            this.association = {
                id: ASSOC_ID,
                relation: { name: 'assets' },
                target: this.item
            };
        }

        createRequestOpts (opts) { return opts; }

        execute(opts) {

            if(opts.method === "GET") {
                if(~opts.url.indexOf(`items/${ITEM_ID}/associations/${ASSOC_ID}`)) {
                    return Promise.resolve(this.association);
                } else
                    return Promise.resolve({ results: [this.association], totalResults: 1 });

            } else if(opts.method === 'DELETE') {
                return Promise.resolve();
            }
            let response = {};
            return Promise.reject(new Error(`Unsupported HTTP Method "${opts.method}"`));
        }
    }

    let service = new AssociationService(URL, new TestHttpClient());


    class TestLogger {
        constructor() {
            this.errors = 0;
            this.debugs = 0;
        }
        error(e) {
            this.errors++;
        }
        debug(msg) {
            this.debugs++;
        }
        reset() {
            this.errors = this.debugs = 0;
        }
        validate(e,d) {
            expect(this.errors).to.equal(e);
            expect(this.debugs).to.equal(d);
        }
    }

    service.setLogger(new TestLogger());



    describe("## Searching associations ", () => {

        it('should support searching', (done) => {
            service.search(ITEM_ID).then( response => {
                expect(response).to.exist;
                expect(response.results).to.exist;
                expect(response.totalResults).to.exist;
                done();
            })
            .catch(done);
        });

        it('should handle bad input', (done) => {
            service.search(null).then( response => {
                done(new Error("Failed to catch bad item id"));
            })
            .catch( e=> {
                expect(e.message).to.contain("Must specify");
                done();
            });
        });

    });



    describe("## Get Association by ID ", () => {

        it('should get associations by id', function(done) {
            service.get(ITEM_ID, ASSOC_ID).then( assoc => {
                expect(assoc).to.exist;
                expect(assoc.id).to.equal(ASSOC_ID);
                done();
            })
            .catch(done);

        });

        it('should handle bad item ids', (done) => {
            service.get(null, ASSOC_ID).then( response => {
                done(new Error("Failed to catch bad item id"));
            })
            .catch( e=> {
                expect(e.message).to.contain("Must specify");
                done();
            });
        });

        it('should handle bad association ids', (done) => {
            service.get(ITEM_ID, null).then( response => {
                done(new Error("Failed to catch bad assoc id"));
            })
            .catch( e=> {
                expect(e.message).to.contain("Must specify");
                done();
            });
        });
    });



    describe("## Delete Association ", () => {

        it('should delete associations', function(done) {
            service.remove(ITEM_ID, ASSOC_ID)
            .then( () => { done() })
            .catch(done);
        });

        it('should handle bad item ids', (done) => {
            service.remove(null, ASSOC_ID).then( response => {
                done(new Error("Failed to catch bad item id"));
            })
            .catch( e=> {
                expect(e.message).to.contain("Must specify");
                done();
            });
        });

        it('should handle bad association ids', (done) => {
            service.remove(ITEM_ID, null).then( response => {
                done(new Error("Failed to catch bad assoc id"));
            })
            .catch( e=> {
                expect(e.message).to.contain("Must specify");
                done();
            });
        });

    });


});
