
const chai = require('chai');
const expect = chai.expect;
const Q = require('q');

const API           = require('../../dist/js/geoplatform.client');
const Query         = API.Query;
const ItemTypes     = API.ItemTypes;
const ItemService   = API.ItemService;
const NodeHttpClient = API.NodeHttpClient;
const HttpClientBase = API.HttpClientBase;
const ItemFactory   = API.ItemFactory;
const ItemProperties = API.ItemProperties;

const URL = 'https://ual.geoplatform.gov';


chai.config.includeStack = true;

describe('# ItemService', function() {


    class TestHttpClient extends HttpClientBase {
        constructor() {
            super();

            let opts = {
                id: 'test',
                label: 'Test',
                uri: "http://www.geoplatform.gov/items/test",
                type: ItemTypes.DATASET,
                description: 'This is a test',
                keywords: ['one','two'],
                createdBy: 'test_user'
            }
            this.item = ItemFactory(opts);
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
                    return Q.resolve("http://www.geoplatform.gov/items/test");
                } else {
                    return Q.resolve(this.item);
                }

            } else if(opts.method === 'PUT') {
                return Q.resolve(this.item);

            } else if(opts.method === 'DELETE') {
                return Q.resolve();

            } else if(opts.method === 'PATCH') {
                return Q.resolve(this.item);
            }
            let response = {};
            return Q.resolve(response);
        }
    }



    let service = new ItemService(URL, new TestHttpClient());



    /*
     * TEST SEARCH
     */
    it('should search items', function(done) {

        let query = new Query().types(ItemTypes.DATASET);
        service.search(query)
        .then( results => {
            expect(results).to.exist;
            expect(results.getItems().length).to.be.greaterThan(0);
            expect(results.getTotalResults()).to.be.greaterThan(0);
            done();
        })
        .catch(e => done(e));

    });

    /*
     * TEST IMPORT
     */
    it('should export items', function(done) {

        let query = new Query().types(ItemTypes.DATASET);
        service.search(query)
        .then( results => results.getItems()[0] )
        .then( item => service.export(item.id) )
        .then( output => {
            expect(output).to.be.ok;
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
            expect(item.toJson).to.be.ok;
            expect(item.getId()).to.equal('test');
            done();
        })
        .catch(e => done(e));

    });


    /*
     * TEST GETURI
     */
    it('should create URIs', function(done) {

        let opts = {};
        opts[ItemProperties.TYPE.key] = ItemTypes.DATASET;
        opts[ItemProperties.LABEL.key] = "Test DataSet";
        opts[ItemProperties.CREATED_BY.key] = "test_user";

        let obj = ItemFactory(opts);
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
            expect(item.toJson).to.be.ok;
            expect(item.getId()).to.be.ok;
            expect(item.getUri()).to.be.ok;
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
            type: ItemTypes.DATASET,
            label: "Test DataSet",
            createdBy: "test_user"
        };
        service.save(obj)
        .then( item => {
            expect(item).to.exist;
            expect(item.toJson).to.be.ok;
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
        .then( () => {
            done();
        })
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
            expect(item.toJson).to.be.ok;
            done();
        })
        .catch(e => done(e));

    });


    /*
     * Export Formats
     */
    it('should handle export errors', function(done) {

        let svc = new ItemService(URL, new NodeHttpClient());
        let query = new Query().types(ItemTypes.SERVICE);

        svc.search(query).then( results => {

            expect(results.getTotalResults()).to.be.greaterThan(0);

            let item = results.getItemAt(0),
                id = item.id;

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

});
