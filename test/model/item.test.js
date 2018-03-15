
const chai = require('chai');
const expect = chai.expect;

const API = require('../../src/index');
const Types = API.ItemTypes;
const ItemFactory = API.ItemFactory;
const ItemProperties = API.ItemProperties;

chai.config.includeStack = true;

describe('# ItemModel', function() {




    it('should support constructing Concept Schemes', function(done) {

        let item = createConceptScheme()
        expect(item).to.exist;
        expect(item.getType()).to.equal(Types.CONCEPT_SCHEME);
        expect(item.toJson).to.be.ok;
        expect(item.getLabel()).to.equal("Test Concept Scheme");
        expect(item.getDescription()).to.equal("This is a test");
        expect(item.getCreatedBy()).to.equal("test_user");
        done();

    });



    it('should support constructing Concepts', function(done) {

        let item = createConcept();
        let scheme = item.getScheme();

        expect(item).to.exist;
        expect(item.getType()).to.equal(Types.CONCEPT);
        expect(item.toJson).to.be.ok;
        expect(item.getLabel()).to.equal("Test Concept");
        expect(item.getDescription()).to.equal("This is a test");
        expect(item.getCreatedBy()).to.equal("test_user");
        expect(item.getScheme()).to.be.ok;
        expect(item.getScheme().getLabel()).to.equal(scheme.getLabel());
        done();

    });



    it('should support constructing Datasets', function(done) {

        let dataset = createDataset();
        expect(dataset.getLabel()).to.equal("My Dataset");
        expect(dataset.getDescription()).to.equal("This is a description");
        expect(dataset.getKeywords().length).to.equal(3);
        expect(dataset.getCreatedBy()).to.equal("testUser");
        expect(dataset.getVisibility()).to.be.true;
        expect(dataset.getThemes().length).to.equal(1);

        let theme = dataset.getThemes()[0];

        let dsJson = dataset.toJson();
        expect(dsJson).to.be.ok;
        expect(dsJson[ItemProperties.LABEL.key]).to.equal(dataset.getLabel());
        expect(dsJson[ItemProperties.DESCRIPTION.key]).to.equal(dataset.getDescription());
        expect(dsJson[ItemProperties.KEYWORDS.key].length).to.equal(dataset.getKeywords().length);
        expect(dsJson[ItemProperties.CREATED_BY.key]).to.equal(dataset.getCreatedBy());
        expect(dsJson[ItemProperties.VISIBILITY.key]).to.equal(dataset.getVisibility());
        expect(dsJson[ItemProperties.THEMES.key].length).to.equal(1);
        expect(dsJson[ItemProperties.THEMES.key][0][ItemProperties.LABEL.key]).to.equal(theme.getLabel());

        done();

    });

    it('should support constructing Services', function(done) {

        let service = createService();
        expect(service.getHref()).to.equal("http://www.google.com");
        expect(service.getLabel()).to.equal("Google Service");
        expect(service.getDescription()).to.equal("google it!");
        expect(service.getKeywords().length).to.equal(1);
        expect(service.getDatasets().length).to.equal(1);

        let dataset = service.getDatasets()[0];

        let svcJson = service.toJson();
        expect(svcJson).to.be.ok;
        expect(svcJson[ItemProperties.LABEL.key]).to.equal(service.getLabel());
        expect(svcJson[ItemProperties.DESCRIPTION.key]).to.equal(service.getDescription());
        expect(svcJson[ItemProperties.KEYWORDS.key].length).to.equal(service.getKeywords().length);
        expect(svcJson[ItemProperties.HREF.key]).to.equal(service.getHref());
        expect(svcJson[ItemProperties.DATASETS.key].length).to.equal(service.getDatasets().length);

        let ldsJson = validateNestedDatasetJSON(svcJson, dataset);

        done();
    });

    it('should support constructing Layers', function(done) {

        let layer = createLayer();
        expect(layer.getLabel()).to.equal("Test");
        expect(layer.getDescription()).to.equal("This is a test");
        expect(layer.getLayerName()).to.equal("0");
        expect(layer.getLayerType()).to.equal("RasterLayer");

        expect(layer.getServices().length).to.equal(1);
        let service = layer.getServices()[0];

        expect(service.getDatasets().length).to.equal(1);
        let dataset = service.getDatasets()[0];

        let lyrJson = layer.toJson();
        expect(lyrJson).to.be.ok;
        expect(lyrJson[ItemProperties.LABEL.key]).to.equal(layer.getLabel());
        expect(lyrJson[ItemProperties.DESCRIPTION.key]).to.equal(layer.getDescription());
        expect(lyrJson[ItemProperties.LAYER_NAME.key]).to.equal(layer.getLayerName());
        expect(lyrJson[ItemProperties.LAYER_TYPE.key].length).to.equal(layer.getLayerType().length);

        let svcJson = validateNestedServiceJSON(lyrJson, service);
        let ldsJson = validateNestedDatasetJSON(svcJson, dataset);

        done();

    });


    it('should support constructing Maps', function(done) {


        let map = createMap();
        expect(map.getLabel()).to.equal("Test Map");
        expect(map.getDescription()).to.equal("testing");
        expect(map.getResourceTypes().length).to.equal(1);

        expect(map.getLayers().length).to.equal(1);
        let layerState = map.getLayers()[0];
        expect(layerState.layer).to.be.ok;
        let layer = layerState.layer;

        expect(layer.getServices().length).to.equal(1);
        let service = layer.getServices()[0];

        expect(service.getDatasets().length).to.equal(1);
        let dataset = service.getDatasets()[0];

        let mapJson = map.toJson();
        expect(mapJson).to.be.ok;
        expect(mapJson[ItemProperties.LABEL.key]).to.equal(map.getLabel());
        expect(mapJson[ItemProperties.DESCRIPTION.key]).to.equal(map.getDescription());
        expect(mapJson[ItemProperties.RESOURCE_TYPES.key].length).to.equal(1);
        expect(mapJson[ItemProperties.RESOURCE_TYPES.key][0]).to.equal(map.getResourceTypes()[0]);

        let lyrJson = validateNestedLayerJSON(mapJson, layer);
        let svcJson = validateNestedServiceJSON(lyrJson, service);
        let ldsJson = validateNestedDatasetJSON(svcJson, dataset);

        done();

    });


    it('should support constructing Galleries', function(done) {

        let gallery = createGallery();
        expect(gallery.getLabel()).to.equal("My Gallery");
        expect(gallery.getDescription()).to.equal("This is also a test");

        expect(gallery.getItems().length).to.equal(1);
        let galleryItem = gallery.getItems()[0];
        expect(galleryItem.asset).to.be.ok;
        let map = galleryItem.asset;

        expect(map.getLayers().length).to.equal(1);
        let layerState = map.getLayers()[0];
        expect(layerState.layer).to.be.ok;
        let layer = layerState.layer;

        expect(layer.getServices().length).to.equal(1);
        let service = layer.getServices()[0];

        expect(service.getDatasets().length).to.equal(1);
        let dataset = service.getDatasets()[0];

        let galJson = gallery.toJson();
        expect(galJson).to.be.ok;
        expect(galJson[ItemProperties.LABEL.key]).to.equal(gallery.getLabel());
        expect(galJson[ItemProperties.DESCRIPTION.key]).to.equal(gallery.getDescription());
        expect(galJson[ItemProperties.GALLERY_ITEMS.key].length).to.equal(gallery.getItems().length);

        let mapJson = validateNestedMapJSON(galJson, map);
        let lyrJson = validateNestedLayerJSON(mapJson, layer);
        let svcJson = validateNestedServiceJSON(lyrJson, service);
        let ldsJson = validateNestedDatasetJSON(svcJson, dataset);

        done();

    });


    it('should support constructing Communities', function(done) {

        let item = ItemFactory(Types.COMMUNITY);
        expect(item).to.exist;

        item.label('Test Community')
            .description("This is a test")
            .createdBy("test_user");

        expect(item.getType()).to.equal(Types.COMMUNITY);
        expect(item.toJson).to.be.ok;
        expect(item.getLabel()).to.equal("Test Community");
        expect(item.getDescription()).to.equal("This is a test");
        expect(item.getCreatedBy()).to.equal("test_user");

        done();

    });






    /* ------------- JSON VALIDATION HELPERS ---------------- */



    function validateNestedDatasetJSON(json, dataset) {
        expect(json[ItemProperties.DATASETS.key].length).to.equal(1);
        let dsJson = json[ItemProperties.DATASETS.key][0];
        expect(dsJson[ItemProperties.LABEL.key]).to.equal(dataset.getLabel());
        return dsJson;
    }

    function validateNestedServiceJSON(json, service) {
        expect(json[ItemProperties.SERVICES.key].length).to.equal(1);
        let svcJson = json[ItemProperties.SERVICES.key][0];
        expect(svcJson[ItemProperties.LABEL.key]).to.equal(service.getLabel());
        return svcJson;
    }

    function validateNestedLayerJSON(json, layer) {
        expect(json[ItemProperties.MAP_LAYERS.key].length).to.equal(1);
        let lyrStateJson = json[ItemProperties.MAP_LAYERS.key][0];
        expect(lyrStateJson.layer).to.be.ok;
        let lyrJson = lyrStateJson.layer;
        expect(lyrJson[ItemProperties.LABEL.key]).to.equal(layer.getLabel());
        return lyrJson;
    }

    function validateNestedMapJSON(json, map) {
        let itemJson = json[ItemProperties.GALLERY_ITEMS.key][0];
        expect(itemJson.asset).to.be.ok;
        let mapJson = itemJson.asset;
        expect(mapJson[ItemProperties.LABEL.key]).to.equal(map.getLabel());
        return mapJson;
    }






    /* ------------- CREATION HELPERS ---------------- */



    function createConceptScheme() {
        let scheme = ItemFactory(Types.CONCEPT_SCHEME);
        return scheme.label('Test Concept Scheme')
            .description("This is a test")
            .createdBy("test_user");
    }

    function createConcept() {
        let theme = ItemFactory(Types.CONCEPT);
        return theme.label('Test Concept')
            .description("This is a test")
            .createdBy("test_user")
            .scheme(createConceptScheme());
    }

    function createDataset() {
        let dataset = ItemFactory(Types.DATASET);
        dataset.setLabel("My Dataset");
        dataset.setDescription("This is a description");
        dataset.setKeywords(["one", "two", "three"]);
        dataset.setCreatedBy("testUser");
        dataset.setVisibility(true);
        dataset.setThemes(createConcept());
        return dataset;
    }

    function createService() {
        let service = ItemFactory(Types.SERVICE);
        return service.href("http://www.google.com")
               .label("Google Service")
               .description("google it!")
               .keywords("test")
               // .serviceType(...)
               .datasets(createDataset());
    }

    function createLayer() {
        let opts = {};
        opts[ItemProperties.TYPE.key]        = Types.LAYER;
        opts[ItemProperties.LABEL.key]       = "Test";
        opts[ItemProperties.DESCRIPTION.key] = "This is a test";
        opts[ItemProperties.LAYER_NAME.key]  = '0';
        opts[ItemProperties.LAYER_TYPE.key]  = "RasterLayer";

        let layer = ItemFactory(opts);
        layer.addService(createService());
        return layer;
    }

    function createMap() {
        let map = new ItemFactory(Types.MAP);
        map.setLabel("Test Map");
        map.setDescription("testing");
        map.setResourceTypes('http://www.geoplatform.gov/ont/openmap/GeoplatformMap');
        map.setLayers(createLayer());
        return map;
    }

    function createGallery() {
        let gallery = new ItemFactory(Types.GALLERY);
        gallery.setLabel("My Gallery");
        gallery.setDescription("This is also a test");
        gallery.addItem(createMap());
        return gallery;
    }

});
