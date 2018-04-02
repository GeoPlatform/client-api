
const chai = require('chai');
const expect = chai.expect;
const Q = require('q');

const API            = require('../../dist/js/geoplatform.client');
const Query          = API.Query;
const ItemTypes      = API.ItemTypes;
const ServiceService = API.ServiceService;
const HttpClient     = API.NodeHttpClient;
const HttpClientBase = API.HttpClientBase;
const ItemFactory    = API.ItemFactory;
const ItemProperties = API.ItemProperties;

const URL = 'https://ual.geoplatform.gov';


chai.config.includeStack = true;

describe('# ServiceService', function() {


    class TestHttpClient extends HttpClientBase {
        constructor() {
            super();
            this.item = createService();
        }

        createRequestOpts (opts) { return opts; }

        execute(opts) {

            // console.log('[' + opts.method + '] ' + opts.url);

            if(opts.method === "GET") {
                //For Service Types
                if(~opts.url.indexOf("/api/items"))
                    return Q.resolve({results: []});

                //For Harvest
                if(~opts.url.indexOf('/harvest'))
                    return Q.resolve(this.item);

                //For Live Test
                if(~opts.url.indexOf('/test/test'))
                    return Q.resolve(this.item);

                //For Statistics
                if(~opts.url.indexOf('/statistics'))
                    return Q.resolve(this.item);

                return Q.resolve({ results: [this.item], totalResults: 1});

            } else if(opts.method === 'POST') {
                //For Import
                if(~opts.url.indexOf('/import'))
                    return Q.resolve(this.item);

                return Q.resolve(this.item);

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



    let service = new ServiceService(URL, new TestHttpClient());



    /*
     *
     */
    it('should describe services', function(done) {

        let obj = createService();
        service.about(obj)
        .then( service => {
            expect(service).to.exist;
            expect(service.toJson).to.exist;
            done();
        })
        .catch(e => done(e));

    });

    /*
     *
     */
    it('should list types', function(done) {

        service.types()
        .then( response => {
            expect(response).to.exist;
            done();
        })
        .catch(e => done(e));

    });


    /*
     *
     */
    it('should import services', function(done) {

        let obj = createService().toJson();
        service.import(obj)
        .then( service => {
            expect(service).to.exist;
            expect(service.toJson).to.be.ok;
            expect(service.getId()).to.equal('test');
            done();
        })
        .catch(e => done(e));

    });


    /*
     *
     */
    it('should harvest info', function(done) {

        service.harvest("test")
        .then( service => {
            expect(service).to.exist;
            expect(service.toJson).to.exist;
            done();
        })
        .catch(e => done(e));

    });


    /*
     *
     */
    it('should live test', function(done) {

        service.liveTest("test")
        .then( service => {
            expect(service).to.exist;
            expect(service.toJson).to.exist;
            done();
        })
        .catch(e => done(e));

    });


    /*
     * TEST UPDATE
     */
    it('should return statistics', function(done) {

        service.statistics("test")
        .then( service => {
            expect(service).to.exist;
            expect(service.toJson).to.exist;
            done();
        })
        .catch(e => done(e));

    });










    /* ----------------------------------------------- */




    function createService() {
        let opts = {
            id: 'test',
            label: 'Test',
            uri: "http://www.geoplatform.gov/items/test",
            type: ItemTypes.SERVICE,
            description: 'This is a test',
            keywords: ['one','two'],
            createdBy: 'test_user',
            href: "http://www.google.com",
            serviceType: {
                uri: "http://www.geoplatform.gov/service/test",
                label: "Test Service Type"
            }
        }
        return ItemFactory(opts);
    }

});
