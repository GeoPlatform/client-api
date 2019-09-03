
const chai = require('chai');
const expect = chai.expect;

const mock = require('mock-require');

const API           = require('../../dist/bundles/geoplatform-client.umd');
const Query         = API.Query;
const ItemTypes     = API.ItemTypes;
const ItemService   = API.ItemService;

//needed to use the base client lib in this test server
// as the client-node UMD file will attempt to require('@geoplatform/client')
mock('@geoplatform/client', API);

const HttpClient    = require('../../dist/bundles/geoplatform-client-node.umd').NodeHttpClient;



const URL = 'https://ual.geoplatform.gov';
const URI = "http://www.geoplatform.gov/items/test";

chai.config.includeStack = true;

describe('# ItemService', function() {

    class TestHttpClient {
        constructor() {

            this.item = {
                id: 'test',
                label: 'Test',
                uri: "http://www.geoplatform.gov/items/test",
                type: ItemTypes.DATASET,
                description: 'This is a test',
                keywords: 'one,two',
                createdBy: 'test_user',
                _created: new Date().getTime(),
                modified: new Date().getTime()
            };
        }

        createRequestOpts (opts) { return opts; }

        execute(opts) {

            if(opts.method === "GET") {
                if(~opts.url.indexOf("/export"))
                    return Promise.resolve("<metadata></metadata>");
                if(~opts.url.indexOf('items/test')) {
                    if(opts.params) {
                        return Promise.resolve(
                            Object.assign(opts.params, this.item)
                        );
                    }
                    return Promise.resolve(this.item);
                } else
                    return Promise.resolve({ results: [this.item], totalResults: 1, params: opts.params});

            } else if(opts.method === 'POST') {
                if(~opts.url.indexOf('api/utils/uri')) {
                    return Promise.resolve(URI);
                } else if(~opts.url.indexOf('clone')) {
                    let result = Object.assign({}, this.item, opts.data, {
                        id: 'test2', uri: this.item.uri + "/2"
                    });
                    return Promise.resolve(result);
                } else {
                    opts.data.id = 'test';
                    opts.data._created = opts.data.modified = new Date().getTime();
                    opts.data.createdBy = 'test_user';
                    opts.data.lastModifiedBy = 'test_user';
                    return Promise.resolve(opts.data);
                }

            } else if(opts.method === 'PUT') {
                opts.data.modified = new Date().getTime();
                opts.data.lastModifiedBy = 'test_user';
                return Promise.resolve(opts.data);

            } else if(opts.method === 'DELETE') {
                return Promise.resolve();

            } else if(opts.method === 'PATCH') {
                let result = Object.assign({
                    modified: new Date().getTime(),
                    lastModifiedBy: 'test_user',
                }, this.item);
                return Promise.resolve(result);
            }
            let response = {};
            return Promise.resolve(response);
        }
    }

    let service = new ItemService(URL, new TestHttpClient());



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





    it('should support custom parameters', (done) => {
        let opts = {
            params: { "format" : "json" }
        };
        service.get('test', opts)
        .then( response => {

            expect(response).to.exist;

            //look for user-supplied parameter
            // (NOTE: test only, API call won't append to result)
            expect(response.format).to.exist;
            expect(response.format).to.equal('json');


            //test merging both API parameters with user-supplied ones
            return service.search({ test: true }, opts)
            .then( response => {
                expect(response).to.exist;
                expect(response.results).to.exist;
                expect(response.totalResults).to.exist;

                //look for both user-supplied params and api query
                // (NOTE: test only, API call won't append to result)
                expect(response.params).to.exist;
                expect(response.params.test).to.equal(true, "Missing test parameter");
                expect(response.params.format).to.equal('json', "Missing format parameter");
                done();
            })
        })
        .catch(e => done(e));
    });



    it('should search items', function(done) {

        let query = new Query().types(ItemTypes.DATASET);
        service.search(query)
        .then( response => {
            expect(response.results).to.exist;
            expect(response.results.length).to.be.greaterThan(0);
            done();
        })
        .catch(e => done(e));

    });

    it('should export items', function(done) {

        let query = new Query().types(ItemTypes.DATASET);
        service.search(query)
        .then( response => response.results[0] )
        .then( item => service.export(item.id) )
        .then( response => {
            expect(response).to.be.ok;
            done();
        })
        .catch(e => done(e));

    });


    /*
     * TEST GETBYID
     */
    it('should fetch items', function(done) {

        let id = null;
        let query = new Query().types(ItemTypes.DATASET);
        service.get("test")
        .then( item => {
            expect(item).to.exist;
            expect(item.id).to.equal('test');
            done();
        })
        .catch(e => done(e));

    });



    it('should create URIs', function(done) {

        let obj = {
            type: ItemTypes.DATASET,
            label: "Test DataSet",
            createdBy: "test_user"
        };
        service.getUri(obj)
        .then( uri => {
            expect(uri).to.exist;
            expect(typeof(uri)).to.equal('string');
            done();
        })
        .catch(e => done(e));

    });


    /*
     * TEST CREATE
     */
    it('should create items', function(done) {

        let obj = {
            type: ItemTypes.DATASET,
            label: "Test DataSet",
            createdBy: "test_user"
        };
        service.save(obj)
        .then( item => {
            expect(item).to.exist;
            expect(item.id).to.be.ok;
            expect(item.uri).to.be.ok;
            expect(item._created).to.be.ok;
            expect(item.modified).to.be.ok;
            expect(item.createdBy).to.be.ok;
            expect(item.lastModifiedBy).to.be.ok;
            done();
        })
        .catch(e => done(e));

    });


    /*
     * TEST UPDATE
     */
    it('should update items', function(done) {

        let obj = {
            id: 'test',
            uri: URI,
            type: ItemTypes.DATASET,
            label: "Test DataSet",
            createdBy: "test_user"
        };
        service.save(obj)
        .then( item => {
            expect(item).to.exist;
            expect(item.uri).to.be.ok;
            expect(item.modified).to.be.ok;
            expect(item.lastModifiedBy).to.be.ok;
            done();
        })
        .catch(e => done(e));

    });


    /*
     * TEST DELETE
     */
    it('should delete items', function(done) {

        let obj = {
            id: 'test',
            type: ItemTypes.DATASET,
            label: "Test DataSet",
            createdBy: "test_user"
        };
        service.remove('test')
        .then( () => { done() })
        .catch(e => done(e));

    });


    /*
     * TEST PATCH
     */
    it('should patch items', function(done) {

        let id = "test";
        let changes = [{op:'replace',path:'/label',value:'Updated'}];

        service.patch(id, changes)
        .then(item => {
            expect(item).to.exist;
            expect(item.modified).to.be.ok;
            expect(item.lastModifiedBy).to.be.ok;
            done();
        })
        .catch(e => done(e));

    });


    /*
     * TEST CLONE
     */
    it('should clone items', function(done) {

        let obj = {
            id: 'test',
            uri: URI,
            type: ItemTypes.DATASET,
            label: "Test DataSet",
            createdBy: "test_user"
        };
        service.clone(obj, { createdBy: "new_user" })
        .then( item => {
            expect(item).to.exist;
            expect(item.id).not.to.be.equal(obj.id);
            expect(item.uri).not.to.be.equal(obj.uri);
            expect(item.createdBy).to.be.equal("new_user");
            done();
        })
        .catch(e => done(e));

    });



    /*
     * Export Formats
     */
    it('should handle export errors', function(done) {

        let svc = new ItemService(URL, new HttpClient());

        let query = new Query({type:'regp:Service'});
        svc.search(query)
        .then( response => {

            let id = response.results[0].id;

            svc.export(id, 'badFormat')
            .then( response => {
                console.log(response);
                done(new Error("Should have caught an error"));
            })
            .catch(e => {
                expect(e).to.be.ok;
                done();
            });

        })
        .catch(e => done(e));

    });

    //
    // it("should support logging", function(done) {
    //
    //     done();
    // });

});
