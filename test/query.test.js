
const Q = require('q');
const chai = require('chai');
const expect = chai.expect;

const API        = require('../dist/js/geoplatform.client');
const Query      = API.Query;
const Fields     = API.QueryFields;
const Parameters = API.QueryParameters;
const Facets     = API.QueryFacets;


chai.config.includeStack = true;

describe('# Query', function() {

    it("should export to a querystring-usable kvp object", function(done) {

        let query = new Query();

        query.setQ('q');
        query.setTypes("type")
        query.setKeywords("key");
        query.setFacets(Facets.TYPES);
        query.setFields([Fields.STATUS, Fields.VISIBILITY]);
        query.setCreatedBy('createdBy');
        query.setLastModifiedBy('lastModifiedBy');
        query.setExtent('extent');
        query.setUri("uri");
        query.themes('themes');
        query.setPublishers(["pub1","pub2"]);
        query.setUsedBy("usedBy");
        query.setSchemes('schemes');
        query.setServiceTypes('svcType');
        query.setVisibility('public');

        //TODO set more fields



        let json = query.getQuery();
        expect( json ).to.be.ok;
        expect( json[Parameters.QUERY] ).to.equal(query.getQ());
        expect( json[Parameters.TYPES] ).to.equal(query.getTypes().join(','));
        expect( json[Parameters.KEYWORDS] ).to.equal(query.getKeywords().join(','));
        expect( json[Parameters.FACETS] ).to.equal(query.getFacets().join(','));
        expect( json[Parameters.FIELDS] ).to.equal(query.getFields().join(','));
        expect( json[Parameters.CREATED_BY] ).to.equal(query.getCreatedBy());
        expect( json[Parameters.LAST_MODIFIED_BY] ).to.equal(query.getLastModifiedBy());
        expect( json[Parameters.EXTENT] ).to.equal(query.getExtent());
        expect( json[Parameters.URI] ).to.equal(query.getUri());
        expect( json[Parameters.THEMES_ID] ).to.equal(query.getThemes().join(','));
        expect( json[Parameters.PUBLISHERS_ID] ).to.equal(query.getPublishers().join(","));
        expect( json[Parameters.USED_BY_ID] ).to.equal(query.getUsedBy().join(','));
        expect( json[Parameters.SCHEMES_ID] ).to.equal(query.getSchemes().join(','));
        expect( json[Parameters.SERVICE_TYPES] ).to.equal(query.getServiceTypes().join(','));
        expect( json[Parameters.VISIBILITY] ).to.equal(query.getVisibility());

        //TODO validate more fields

        done();

    });

});
