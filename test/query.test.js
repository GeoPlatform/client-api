

const chai = require('chai');
const expect = chai.expect;

const API  = require('../src/index');
const Query             = API.Query;
const QueryParameters   = API.QueryParameters;
const ItemTypes         = API.ItemTypes;
const ItemService       = API.ItemService;
const HttpClient        = API.HttpClient;

const URL = 'https://sit-ual.geoplatform.us';


chai.config.includeStack = true;

describe('# ItemService', function() {

    let service = new ItemService(URL, new HttpClient());

    it('should search items', function(done) {

        let types = [ItemTypes.DATASET, ItemTypes.SERVICE];

        let query = new Query()
            .types(types)
            //use labels to search using themes
            .themes("Elevation Theme", QueryParameters.THEMES_LABEL)

            //THIS DOES NOT WORK YET DUE TO DT-1585
            //use labels to search using publishers
            // .publishers('U.S. Geological Survey', QueryParameters.PUBLISHERS_LABEL)

            // .extent('-120,20,-66,50')
            // .begins(new Date())
            // .ends(new Date())
            .facets(['themes','publishers'])
            .fields(['label','theme', 'publisher'])
            .page(0)
            .pageSize(50)
            .sort('modified', 'desc');;

        service.search(query)
        .then( response => {
            expect(response.results).to.exist;
            expect(response.results.length).to.be.greaterThan(0);
            done();
        })
        .catch(e => done(e));

    });


});
