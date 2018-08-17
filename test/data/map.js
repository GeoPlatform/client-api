const API = require('../../dist/js/geoplatform.client');
const Types = API.ItemTypes;

module.exports = {
    "type": Types.MAP,
    "label": "Map",
    "description": "map description",
    "keywords": ["one", "two"],
    "baseLayer": {
        "type": Types.LAYER,
        "label": "Base Layer",
        "description": "base layer description",
        "resourceTypes": ["http://www.geoplatform.gov/ont/openlayer/OSMLayer"]
    },
    "layers": [
        {
            "visibility": true,
            "opacity": 1.0,
            "layer": {
                "type": Types.LAYER,
                "label": "Layer",
                "description": "layer description",
                "layerName": "0",
                "layerType": "RasterLayer",
                "services": [
                    {
                        "type": Types.SERVICE,
                        "label": "Service",
                        "description": "service description",
                        "href": "http://www.geoplatform.gov/test/sample_service_that_doesnt_exist",
                        "serviceType": {
                            "id":"370cf6ca5d91c07b63329b8384fe76c7",
                            "uri":"http://www.geoplatform.gov/spec/esri-map-rest",
                            "type":"dct:Standard",
                            "description":"Esri ArcGIS Map Server REST API",
                            "label":"Esri REST Map Service"
                        }
                    }
                ]
            }
        }
    ],
    thumbnail: {
        contentData: "base64",
        href: "http://www.geoplatform.gov/test/this_is_a_test_thumbnail_that_wont_resolve.gif"
    }
};
