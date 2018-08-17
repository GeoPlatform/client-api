const chai = require('chai');
const expect = chai.expect;

// const request = require('request');
// require('request-debug')(request);

const API           = require('../../dist/js/geoplatform.client');
const Query         = API.AgolQuery;
const AgolService   = API.AgolService;
const HttpClient    = API.NodeHttpClient;

const URL = 'https://ual.geoplatform.gov';

chai.config.includeStack = true;

describe('# AgolService', function() {

    let service = new AgolService(URL, new HttpClient());

    it('should search items', function(done) {

        let query = new Query().q('test');
        service.searchItems(query)
        .then( response => {
            expect(response.results).to.exist;
            expect(response.results.length).to.be.greaterThan(0);
            id = service.getAgolId(response.results[0]);
            return id;
        })
        .then( id => service.getItem(id))
        .then( item => {
            expect(item).to.exist;
            let id2 = service.getAgolId(item);
            expect(id2).to.equal(id);
            done();
        })
        .catch(e => done(e));

    }).timeout(20000);

    it('should search orgs', function(done) {

        let query = new Query();
        query.setQ('GEOPLATFORM');
        service.searchOrgs(query)
        .then( response => {
            expect(response.results).to.exist;
            expect(response.results.length).to.be.greaterThan(0);
            id = service.getAgolId(response.results[0]);
            return id;
        })
        .then( id => service.getOrg(id))
        .then( item => {
            expect(item).to.exist;
            done();
        })
        .catch(e => done(e));

    }).timeout(20000);


    it('should search groups', function(done) {

        let id = null;
        let query = new Query();
        service.searchGroups(query)
        .then( response => {
            expect(response.results).to.exist;
            expect(response.results.length).to.be.greaterThan(0);
            id = service.getAgolId(response.results[0]);
            return id;
        })
        .then( id => service.getGroup(id))
        .then( item => {
            expect(item).to.exist;
            done();
        })
        .catch(e => done(e));

    }).timeout(20000);

});
