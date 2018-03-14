
const chai = require('chai');
const expect = chai.expect;

const API = require('../../src/index');
const Types = API.ItemTypes;
const ItemFactory = API.ItemFactory;
const ItemProperties = API.ItemProperties;

chai.config.includeStack = true;

describe('# ItemModel', function() {

    it('should support constructing Datasets', function(done) {


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
        let dsJson = dataset.toJson();
        expect(dsJson).to.be.ok;
        expect(dsJson[ItemProperties.LABEL.key]).to.equal(dataset.getLabel());
        expect(dsJson[ItemProperties.DESCRIPTION.key]).to.equal(dataset.getDescription());
        expect(dsJson[ItemProperties.KEYWORDS.key].length).to.equal(dataset.getKeywords().length);
        expect(dsJson[ItemProperties.CREATED_BY.key]).to.equal(dataset.getCreatedBy());
        expect(dsJson[ItemProperties.VISIBILITY.key]).to.equal(dataset.getVisibility());

        done();

    });

    it('should support constructing Services', function(done) {

        let dataset = ItemFactory(Types.DATASET);
        dataset.setLabel("My Dataset");

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

        let svcJson = service.toJson();
        expect(svcJson).to.be.ok;
        expect(svcJson[ItemProperties.LABEL.key]).to.equal(service.getLabel());
        expect(svcJson[ItemProperties.DESCRIPTION.key]).to.equal(service.getDescription());
        expect(svcJson[ItemProperties.KEYWORDS.key].length).to.equal(service.getKeywords().length);
        expect(svcJson[ItemProperties.HREF.key]).to.equal(service.getHref());
        expect(svcJson[ItemProperties.DATASETS.key].length).to.equal(service.getDatasets().length);

        expect(svcJson[ItemProperties.DATASETS.key].length).to.equal(1);
        let dsJson = svcJson[ItemProperties.DATASETS.key][0];
        expect(dsJson[ItemProperties.LABEL.key]).to.equal(dataset.getLabel());

        done();
    });

    it('should support constructing Layers', function(done) {

        let dataset = ItemFactory(Types.DATASET);
        dataset.setLabel("My Dataset");

        //create using factory and fluent setters
        let service = ItemFactory(Types.SERVICE);
        service.href("http://www.google.com")
               .label("Google Service")
               .datasets(dataset);

        //create using factory with initial values
        let opts = {};
        opts[ItemProperties.TYPE.key]        = Types.LAYER;
        opts[ItemProperties.LABEL.key]       = "Test";
        opts[ItemProperties.DESCRIPTION.key] = "This is a test";
        opts[ItemProperties.LAYER_NAME.key]  = '0';
        opts[ItemProperties.LAYER_TYPE.key]  = "RasterLayer";
        // opts[ItemProperties.SERVICES.key] = [service];

        let layer = ItemFactory(opts);
        expect(layer.getLabel()).to.equal("Test");
        expect(layer.getDescription()).to.equal("This is a test");
        expect(layer.getLayerName()).to.equal("0");
        expect(layer.getLayerType()).to.equal("RasterLayer");
        layer.addService(service);
        expect(layer.getServices().length).to.equal(1);


        let lyrJson = layer.toJson();
        expect(lyrJson).to.be.ok;
        expect(lyrJson[ItemProperties.LABEL.key]).to.equal(layer.getLabel());
        expect(lyrJson[ItemProperties.DESCRIPTION.key]).to.equal(layer.getDescription());
        expect(lyrJson[ItemProperties.LAYER_NAME.key]).to.equal(layer.getLayerName());
        expect(lyrJson[ItemProperties.LAYER_TYPE.key].length).to.equal(layer.getLayerType().length);

        expect(lyrJson[ItemProperties.SERVICES.key].length).to.equal(1);
        let svcJson = lyrJson[ItemProperties.SERVICES.key][0];
        expect(svcJson[ItemProperties.LABEL.key]).to.equal(service.getLabel());

        expect(svcJson[ItemProperties.DATASETS.key].length).to.equal(1);
        let dsJson = svcJson[ItemProperties.DATASETS.key][0];
        expect(dsJson[ItemProperties.LABEL.key]).to.equal(dataset.getLabel());


        done();

    });


    it('should support constructing Maps', function(done) {


        let dataset = ItemFactory(Types.DATASET);
        dataset.setLabel("My Dataset");

        //create using factory and fluent setters
        let service = ItemFactory(Types.SERVICE);
        service.href("http://www.google.com")
               .label("Google Service")
               .datasets(dataset);

        let layer = ItemFactory(Types.LAYER);
        layer.setLabel("Test");
        layer.setDescription("This is a test");
        layer.setLayerName('0');
        layer.setLayerType('RasterLayer');
        layer.addService(service);

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

        let mapJson = map.toJson();
        expect(mapJson).to.be.ok;
        expect(mapJson[ItemProperties.LABEL.key]).to.equal(map.getLabel());
        expect(mapJson[ItemProperties.DESCRIPTION.key]).to.equal(map.getDescription());
        expect(mapJson[ItemProperties.RESOURCE_TYPES.key].length).to.equal(1);
        expect(mapJson[ItemProperties.RESOURCE_TYPES.key][0]).to.equal(map.getResourceTypes()[0]);

        expect(mapJson[ItemProperties.MAP_LAYERS.key].length).to.equal(1);
        let lyrStateJson = mapJson[ItemProperties.MAP_LAYERS.key][0];
        expect(lyrStateJson.layer).to.be.ok;
        let lyrJson = lyrStateJson.layer;
        expect(lyrJson[ItemProperties.LABEL.key]).to.equal(layer.getLabel());

        expect(lyrJson[ItemProperties.SERVICES.key].length).to.equal(1);
        let svcJson = lyrJson[ItemProperties.SERVICES.key][0];
        expect(svcJson[ItemProperties.LABEL.key]).to.equal(service.getLabel());

        expect(svcJson[ItemProperties.DATASETS.key].length).to.equal(1);
        let dsJson = svcJson[ItemProperties.DATASETS.key][0];
        expect(dsJson[ItemProperties.LABEL.key]).to.equal(dataset.getLabel());


        done();

    });


    it('should support constructing Galleries', function(done) {


        let dataset = ItemFactory(Types.DATASET);
        dataset.setLabel("My Dataset");

        //create using factory and fluent setters
        let service = ItemFactory(Types.SERVICE);
        service.href("http://www.google.com")
               .label("Google Service")
               .datasets(dataset);

        let layer = ItemFactory(Types.LAYER);
        layer.setLabel("Test");
        layer.setDescription("This is a test");
        layer.setLayerName('0');
        layer.setLayerType('RasterLayer');
        layer.addService(service);

        let map = new ItemFactory(Types.MAP);
        map.label("Test Map")
           .description("testing")
           .resourceTypes('http://www.geoplatform.gov/ont/openmap/GeoplatformMap');

        map.addLayer({ opacity: 1, visibility: true, layer: layer });


        let gopts = {};
        gopts[ItemProperties.TYPE.key]  = Types.GALLERY;
        gopts[ItemProperties.LABEL.key] =  "My Gallery";

        let gallery = new ItemFactory(gopts);
        gallery.setDescription("This is also a test");

        expect(gallery.getLabel()).to.equal("My Gallery");
        expect(gallery.getDescription()).to.equal("This is also a test");
        expect(gallery.getItems().length).to.equal(0);

        gallery.addItem(map);
        expect(gallery.getItems().length).to.equal(1);



        let galJson = gallery.toJson();
        expect(galJson).to.be.ok;
        expect(galJson[ItemProperties.LABEL.key]).to.equal(gallery.getLabel());
        expect(galJson[ItemProperties.DESCRIPTION.key]).to.equal(gallery.getDescription());
        expect(galJson[ItemProperties.GALLERY_ITEMS.key].length).to.equal(gallery.getItems().length);

        let itemJson = galJson[ItemProperties.GALLERY_ITEMS.key][0];
        expect(itemJson.asset).to.be.ok;
        let mapJson = itemJson.asset;
        expect(mapJson[ItemProperties.LABEL.key]).to.equal(map.getLabel());

        expect(mapJson[ItemProperties.MAP_LAYERS.key].length).to.equal(1);
        let lyrStateJson = mapJson[ItemProperties.MAP_LAYERS.key][0];
        expect(lyrStateJson.layer).to.be.ok;
        let lyrJson = lyrStateJson.layer;
        expect(lyrJson[ItemProperties.LABEL.key]).to.equal(layer.getLabel());

        expect(lyrJson[ItemProperties.SERVICES.key].length).to.equal(1);
        let svcJson = lyrJson[ItemProperties.SERVICES.key][0];
        expect(svcJson[ItemProperties.LABEL.key]).to.equal(service.getLabel());

        expect(svcJson[ItemProperties.DATASETS.key].length).to.equal(1);
        let dsJson = svcJson[ItemProperties.DATASETS.key][0];
        expect(dsJson[ItemProperties.LABEL.key]).to.equal(dataset.getLabel());



        done();

    });

});
