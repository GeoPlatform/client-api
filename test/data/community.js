const API = require('../../dist/js/geoplatform.client');
const Types = API.ItemTypes;

module.exports = {
    "id": "e0e46c7c73bc171f0342de43360d603f",
    "uri": "http://www.geoplatform.gov/id/community/1cebc003b72b52f975a1f821fe92cdd4",
    "type": Types.COMMUNITY,
    "label": "NGDA Elevation Theme",
    "description": "Elevation Theme Definition: The measured vertical position of the earth surface and other landscape or bathymetric features relative to a reference datum typically related to sea level. These points normally describe bare earth positions but may also describe the top surface of buildings and other objects, vegetation structure, or submerged objects. Elevation data can be stored as a three-dimensional array or as a continuous surface such as a raster, triangulated irregular network, or contours. Elevation data may also be represented in other derivative forms such as slope, aspect, ridge and drainage lines, and shaded relief.",
    "title": "NGDA Elevation Theme",
    "status": "submitted",
    "_modified": 1522154423949,
    "classifiers": {
        "type": "regp:KnowledgeGraph"
    },
    "keywords": ["test", "one", "two"],
    "created": 1522154423949,
    "modified": 1522154426907,
    "visibility": "public",
    "createdBy": "jimbob",
    "resourceTypes": [
        "foaf:Group",
        "foaf:Agent",
        "Community"
    ],
    "publishers": [
        {
            "_modified": 1514514223959,
            "id": "04340919f1251d77ec71f693e8960cad",
            "uri": "http://www.geoplatform.gov/id/organization/58bfb52811b944a0ca2dcb396cf65ff6",
            "type": "org:Organization",
            "label": "DOI-USGS",
            "name": "DOI-USGS",
            "created": 1489119441743,
            "modified": 1489119441743,
            "resourceTypes": [
                "foaf:Agent",
                "org:Organization"
            ]
        },
        {
            "_modified": 1514514223894,
            "id": "2bda474f296a36119a5aa967e6e4947b",
            "uri": "http://www.geoplatform.gov/id/organization/6bc3a7e6ca902b1d94ff1fbc7803f741",
            "type": "org:Organization",
            "label": "DOC-NOAA",
            "name": "DOC-NOAA",
            "created": 1489119441276,
            "modified": 1489119441276,
            "resourceTypes": [
                "foaf:Agent",
                "org:Organization"
            ]
        }
    ]
}
