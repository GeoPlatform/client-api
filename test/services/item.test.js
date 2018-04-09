
const Q = require('q');
const chai = require('chai');
const expect = chai.expect;

const API           = require('../../dist/js/geoplatform.client');
const Query         = API.Query;
const ItemTypes     = API.ItemTypes;
const ItemService   = API.ItemService;

const URL = 'https://sit-ual.geoplatform.us';
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
                    return Q.resolve("<metadata></metadata>");
                if(~opts.url.indexOf('items/test'))
                    return Q.resolve(this.item);
                else
                    return Q.resolve({ results: [this.item], totalResults: 1});

            } else if(opts.method === 'POST') {
                if(~opts.url.indexOf('api/utils/uri')) {
                    return Q.resolve(URI);
                } else {
                    opts.data.id = 'test';
                    opts.data._created = opts.data.modified = new Date().getTime();
                    opts.data.createdBy = 'test_user';
                    opts.data.lastModifiedBy = 'test_user';
                    return Q.resolve(opts.data);
                }

            } else if(opts.method === 'PUT') {
                opts.data.modified = new Date().getTime();
                opts.data.lastModifiedBy = 'test_user';
                return Q.resolve(opts.data);

            } else if(opts.method === 'DELETE') {
                return Q.resolve();

            } else if(opts.method === 'PATCH') {
                let result = Object.assign({
                    modified: new Date().getTime(),
                    lastModifiedBy: 'test_user',
                }, this.item);
                return Q.resolve(result);
            }
            let response = {};
            return Q.resolve(response);
        }
    }



    let service = new ItemService(URL, new TestHttpClient());



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

});
