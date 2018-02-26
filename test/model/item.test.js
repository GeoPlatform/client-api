
const chai = require('chai');
const expect = chai.expect;

const API = require('../../src/index');
const Types = API.ItemTypes;
const ItemFactory = API.ItemFactory;


chai.config.includeStack = true;

describe('# ItemModel', function() {

    it('should support constructing GeoPlatform Items', function(done) {

        //create using factory and verbose setters
        let dataset = ItemFactory(Types.DATASET);
        dataset.setLabel("My Dataset");
        expect(dataset.getLabel()).to.equal("My Dataset");
        dataset.setDescription("This is a description");
        expect(dataset.getDescription()).to.equal("This is a description");
        dataset.setKeywords(["one", "two", "three"]);
        expect(dataset.getKeywords().length).to.equal(3);
        dataset.setCreatedBy("testUser");
        expect(dataset.getCreatedBy()).to.equal("testUser");
        dataset.setVisibility(true);
        expect(dataset.getVisibility()).to.be.true;

        //create using factory and fluent setters
        let service = ItemFactory(Types.SERVICE);
        service.href("http://www.google.com")
               .label("Google Service")
               .description("google it!")
               .keywords("test")
               // .serviceType(...)
               .datasets(dataset);
        expect(service.getHref()).to.equal("http://www.google.com");
        expect(service.getLabel()).to.equal("Google Service");
        expect(service.getDescription()).to.equal("google it!");
        expect(service.getKeywords().length).to.equal(1);
        expect(service.getDatasets().length).to.equal(1);

        //create using factory with initial values
        let opts = {
            type: Types.LAYER,
            label: "Test",
            description: "This is a test",
            layerName: '0',
            layerType: "RasterLayer"
            // ,
            // services: [service]
        };
        let layer = ItemFactory(opts);
        expect(layer.getLabel()).to.equal("Test");
        expect(layer.getDescription()).to.equal("This is a test");
        expect(layer.getLayerName()).to.equal("0");
        expect(layer.getLayerType()).to.equal("RasterLayer");
        layer.addService(service);
        expect(layer.getServices().length).to.equal(1);

        let map = new ItemFactory(Types.MAP);
        map.label("Test Map")
           .description("testing")
           .resourceTypes('http://www.geoplatform.gov/ont/openmap/GeoplatformMap');
        expect(map.getLabel()).to.equal("Test Map");
        expect(map.getDescription()).to.equal("testing");
        expect(map.getResourceTypes().length).to.equal(1);
        expect(map.getLayers().length).to.equal(0);

        map.addLayer({
            opacity: 1,
            visibility: true,
            layer: layer
        });
        expect(map.getLayers().length).to.equal(1);

        let gopts = {
            type: Types.GALLERY,
            label: "My Gallery"
        };
        let gallery = new ItemFactory(gopts);
        expect(gallery.getLabel()).to.equal("My Gallery");
        expect(gallery.getItems().length).to.equal(0);

        gallery.addItem(map);
        expect(gallery.getItems().length).to.equal(1);


        done();

    });

});
