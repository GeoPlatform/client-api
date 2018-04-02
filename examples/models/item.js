

let Types = GeoPlatformClient.ItemTypes;

//create using factory and verbose setters
let dataset = GeoPlatformClient.ItemFactory(Types.DATASET);
dataset.setLabel("My Dataset");
dataset.setDescription("This is a description");
dataset.setKeywords(["one", "two", "three"]);
dataset.setCreatedBy("testUser");
dataset.setVisibility(true);

//create using factory and fluent setters
let service = GeoPlatformClient.ItemFactory(Types.SERVICE);
service.href("http://www.google.com")
       .label("Google Service")
       .description("google it!")
       .keywords("test")
       .serviceType(...)
       .datasets(dataset);

//create using factory with initial values
let opts = {
    type: Types.LAYER,
    label: "Test",
    description: "This is a test",
    layerName: '0',
    layerType: "RasterLayer",
    services: [service]
};
let layer = GeoPlatformClient.ItemFactory(opts);

//create without factory
let map = new GeoPlatformClient.MapModel();
map.label("Test Map")
   .description("testing")
   .resourceTypes('http://www.geoplatform.gov/ont/openmap/GeoplatformMap');
map.addLayer({
    opacity: 1,
    visibility: true,
    layer: layer
});

//create without factory and with initial values
let gallery = new GeoPlatformClient.Gallery({
    type: Types.GALLERY,
    label: "My Gallery"
});
gallery.addItem(map);
