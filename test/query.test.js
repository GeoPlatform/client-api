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

        //parameters with explicit getters/setters
        query.setFacets(Facets.TYPES);
        query.setFields([Fields.STATUS, Fields.VISIBILITY]);
        query.setQ('q');
        query.setTypes("type")
        query.setKeywords("key");
        query.setCreatedBy('createdBy');
        query.setLastModifiedBy('lastModifiedBy');
        query.setExtent('120,20,-66,50');
        query.setUri("uri");
        query.themes('themes');
        query.setPublishers(["pub1","pub2"]);
        query.setContacts(['con1', 'con2']);
        query.setUsedBy("usedBy");
        query.setSchemes('schemes');
        query.setServiceTypes('svcType');
        query.setVisibility('public');
        query.setStatus('status');
        query.setBeginDate(new Date());
        query.setEndDate(new Date());
        query.setCreated(new Date(), false);
        query.setModified(new Date(), true);

        //generic parameters used with getParameter/setParameter
        query.setParameter(Parameters.ALTERNATE_TITLE,'title1');
        query.setParameter(Parameters.CREATOR,'creator');
        query.setParameter(Parameters.CONTRIBUTED_BY,'contributor');
        query.setParameter(Parameters.IDENTIFIERS,'identifiers');
        query.setParameter(Parameters.DATASET, 'dataset');
        query.setParameter(Parameters.LANDING_PAGE, 'landingPage');
        query.setParameter(Parameters.RELIABILITY, 'reliability');
        query.setParameter(Parameters.RELIABILITY_MIN, 'reliability.min');
        query.setParameter(Parameters.RELIABILITY_MAX, 'reliability.max');
        query.setParameter(Parameters.ONLINE, 'online');
        query.setParameter(Parameters.COMPLIANT, 'compliant');
        query.setParameter(Parameters.SPEED, 'speed');
        query.setParameter(Parameters.SPEED_MIN, 'speed.min');
        query.setParameter(Parameters.SPEED_MAX, 'speed.max');
        query.setParameter(Parameters.LIKES, 'likes');
        query.setParameter(Parameters.LIKES_MIN, 'likes.min');
        query.setParameter(Parameters.LIKES_MAX, 'likes.max');
        query.setParameter(Parameters.VIEWS, 'views');
        query.setParameter(Parameters.VIEWS_MIN, 'views.min');
        query.setParameter(Parameters.VIEWS_MAX, 'views.max');
        query.setParameter(Parameters.HREF, 'href');
        query.setParameter(Parameters.LAYER_TYPE, 'layerType');
        query.setParameter(Parameters.LAYER_NAME, 'layerName');
        query.setParameter(Parameters.PARENT_LAYER, 'parentLayer');
        query.setParameter(Parameters.SUB_LAYER, 'subLayer');
        query.setParameter(Parameters.SERVICE, 'service');
        query.setParameter(Parameters.MAP_LAYER, 'mapLayer');
        query.setParameter(Parameters.GALLERY_ITEM, 'galleryItem');
        query.setParameter(Parameters.PURPOSE, 'purpose');

        //TODO set more fields



        let json = query.getQuery();
        // console.log(JSON.stringify(json));
        expect( json ).to.be.ok;

        //validate parameters with explicit getters/setters
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
        expect( json[Parameters.CONTACTS_ID] ).to.equal(query.getContacts().join(","));
        expect( json[Parameters.USED_BY_ID] ).to.equal(query.getUsedBy().join(','));
        expect( json[Parameters.SCHEMES_ID] ).to.equal(query.getSchemes().join(','));
        expect( json[Parameters.SERVICE_TYPES] ).to.equal(query.getServiceTypes().join(','));
        expect( json[Parameters.VISIBILITY] ).to.equal(query.getVisibility());
        expect( json[Parameters.STATUS] ).to.equal(query.getStatus());
        expect( json[Parameters.CREATED_AFTER] ).to.equal(query.getCreated().getTime());
        expect( json[Parameters.MODIFIED_BEFORE] ).to.equal(query.getModified().getTime());
        expect( json[Parameters.BEGINS] ).to.equal(query.getBeginDate().getTime());
        expect( json[Parameters.ENDS] ).to.equal(query.getEndDate().getTime());

        //validate generic parameters
        function expP(json, query, p) {return expect( json[p] ).to.equal( query.getParameter(p) );}
        expP(json, query, Parameters.ALTERNATE_TITLE);
        expP(json, query, Parameters.CREATOR);
        expP(json, query, Parameters.CONTRIBUTED_BY);
        expP(json, query, Parameters.IDENTIFIERS);
        expP(json, query, Parameters.DATASET);
        expP(json, query, Parameters.LANDING_PAGE);
        expP(json, query, Parameters.RELIABILITY);
        expP(json, query, Parameters.RELIABILITY_MIN);
        expP(json, query, Parameters.RELIABILITY_MAX);
        expP(json, query, Parameters.ONLINE);
        expP(json, query, Parameters.COMPLIANT);
        expP(json, query, Parameters.SPEED);
        expP(json, query, Parameters.SPEED_MIN);
        expP(json, query, Parameters.SPEED_MAX);
        expP(json, query, Parameters.LIKES);
        expP(json, query, Parameters.LIKES_MIN);
        expP(json, query, Parameters.LIKES_MAX);
        expP(json, query, Parameters.VIEWS);
        expP(json, query, Parameters.VIEWS_MIN);
        expP(json, query, Parameters.VIEWS_MAX);
        expP(json, query, Parameters.HREF);
        expP(json, query, Parameters.LAYER_TYPE);
        expP(json, query, Parameters.LAYER_NAME);
        expP(json, query, Parameters.PARENT_LAYER);
        expP(json, query, Parameters.SUB_LAYER);
        expP(json, query, Parameters.SERVICE);
        expP(json, query, Parameters.MAP_LAYER);
        expP(json, query, Parameters.GALLERY_ITEM);
        expP(json, query, Parameters.PURPOSE);

        //TODO validate more fields

        done();

    });

    it('should prevent bad extent values', function(done) {

        let query = new Query();

        try {
            query.extent('test');
            done(new Error("Accepted invalid bbox"));
        } catch(e) { }


        try {
            query.extent(1);
            done(new Error("Accepted invalid bbox"));
        } catch(e) { }

        done();

    });

    it('should clear parameters if given empty values', function(done) {

        let query = new Query();
        query.types(['Layer']);
        expect(query.getTypes().length).to.equal(1);

        query.types([]);
        expect(query.getTypes()).not.to.be.ok;  //will be null if not set

        done();
    });

});
