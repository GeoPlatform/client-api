
const HttpClientBase = require('./http/client');
const NodeHttpClient = require('./http/node');
const Types = require('./shared/types');
const ItemService = require('./services/item');
const DatasetService = require('./services/dataset');
const MapService = require('./services/map');
const LayerService = require('./services/layer');
const ServiceService = require('./services/service');
const GalleryService = require('./services/gallery');
const UtilsService = require('./services/utils');

const KGQuery = require('./shared/kg-query');
const KGService = require('./services/kg');
const KGClassifiers = require('./shared/classifiers');

const ItemProperties = require('./models/properties');
const ItemFactory = require('./models/factory');


module.exports = {

    ItemTypes       : Types,
    QueryParameters : require('./shared/parameters'),
    QueryFacets     : require('./shared/facets'),
    Query           : require('./shared/query'),
    QueryFactory    : require('./shared/query-factory'),
    KGQuery         : KGQuery,
    KGClassifiers   : KGClassifiers,

    HttpClientBase  : HttpClientBase,
    HttpClient      : NodeHttpClient,
    ServiceFactory  : require('./services/factory'),
    ItemService     : ItemService,
    LayerService    : LayerService,
    ServiceService  : ServiceService,
    GalleryService  : GalleryService,
    DatasetService  : DatasetService,
    MapService      : MapService,
    UtilsService    : UtilsService,
    KGService       : KGService,

    //the list of properties that are availabled for Item and Item sub-classes
    ItemProperties  : ItemProperties,

    //factory for creating Items
    ItemFactory     : ItemFactory
};
