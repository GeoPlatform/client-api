const chai = require('chai');
const expect = chai.expect;

const API           = require('../../src/index');
const Query         = API.Query;
const ItemTypes     = API.ItemTypes;
const ItemService   = API.ItemService;
const HttpClient    = API.HttpClient;

const URL = 'https://sit-ual.geoplatform.us';

chai.config.includeStack = true;

describe('# ItemService', function() {

    let service = new ItemService(URL, new HttpClient());

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
            expect(response.body).to.be.ok;
            done();
        })
        .catch(e => done(e));

    });


    it('should search fetch items', function(done) {

        let id = null;
        let query = new Query().types(ItemTypes.DATASET);
        service.search(query)
        .then( response => {
            expect(response.results).to.exist;
            expect(response.results.length).to.be.greaterThan(0);
            id = response.results[0].id;
            return id;
        })
        .then( id => service.get(id))
        .then( item => {
            expect(item).to.exist;
            expect(item.id).to.equal(id);
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


    // it('should create items', function(done) {
    //
    //     let obj = {
    //         type: ItemTypes.DATASET,
    //         label: "Test DataSet",
    //         createdBy: "test_user"
    //     };
    //     service.save(obj)
    //     .then( item => {
    //         expect(item).to.exist;
    //         expect(item.id).to.exist;
    //         done();
    //     })
    //     .catch(e => done(e));
    //
    // });

    // it('should update items', function(done) {
    //
    //     let id = null;
    //     let query = new Query().types(ItemTypes.DATASET);
    //     service.search(query)
    //     .then( response => {
    //         expect(response.results).to.exist;
    //         expect(response.results.length).to.be.greaterThan(0);
    //         id = response.results[0].id;
    //         return id;
    //     })
    //     .then( id => service.get(id))
    //     .then( item => {
    //         expect(item).to.exist;
    //         expect(item.id).to.equal(id);
    //
    //         item.keywords = item.keywords || [];
    //         item.keywords.push('test');
    //         return service.save(item);
    //     })
    //     .then( updated => {
    //         expect(updated).to.exist;
    //         expect(updated.keywords).to.exist;
    //         expect(updated.keywords.indexOf("test")).to.be.greaterThan(-1);
    //         done();
    //     })
    //     .catch(e => done(e));
    //
    // });

    // it('should delete items', function(done) {
    //
    //     //TODO fetch item that is deletable
    //     service.remove(id)
    //     .then( () => {
    //         done();
    //     })
    //     .catch(e => done(e));
    //
    // });

});
