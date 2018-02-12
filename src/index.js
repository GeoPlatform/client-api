

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


module.exports = {

    ItemTypes       : Types,
    QueryParameters : require('./shared/parameters'),
    Query           : require('./shared/query'),
    QueryFactory    : require('./shared/query-factory'),
    KGQuery         : KGQuery,
    KGClassifiers   : KGClassifiers,

    HttpClient      : NodeHttpClient,
    ServiceFactory  : require('./services/factory'),
    ItemService     : ItemService,
    LayerService    : LayerService,
    ServiceService  : ServiceService,
    GalleryService  : GalleryService,
    DatasetService  : DatasetService,
    MapService      : MapService,
    UtilsService    : UtilsService,
    KGService       : KGService
};
