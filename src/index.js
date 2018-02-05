

const Types = require('./shared/types')
const ItemService = require('./services/node/item')
const DatasetService = require('./services/node/dataset')
const MapService = require('./services/node/map')
const LayerService = require('./services/node/layer')
const ServiceService = require('./services/node/service')
const GalleryService = require('./services/node/gallery')


/**
 * @param {any} arg - string type or object with type property
 * @param {string} baseUrl - base endpoint of GeoPlatform API
 * @return {ItemService}
 */
const ServiceFactory = function(arg, baseUrl) {
    let type = (typeof(arg) === 'string') ?
        arg : (arg && arg.type ? arg.type : null);
    if(!type) throw new Error("Must provide a type or object with a type specified");
    if(!baseUrl) throw new Error("Must provide a base url");
    switch(type) {
        case Types.LAYER:   return new LayerService(baseUrl);
        case Types.SERVICE: return new ServiceService(baseUrl);
        case Types.MAP:     return new MapService(baseUrl);
        case Types.GALLERY: return new GalleryService(baseUrl);
        case Types.DATASET: return new DatasetService(baseUrl);
        default:            return new ItemService(baseUrl);
    }
}




module.exports = {

    ItemTypes: Types,
    QueryParameters: require('./shared/parameters'),
    Query: require('./shared/query'),
    QueryFactory: require('./shared/query-factory'),

    ServiceFactory: ServiceFactory,
    ItemService: ItemService,
    DatasetService: DatasetService,
    MapService: MapService,
    LayerService: LayerService,
    ServiceService: ServiceService,
    GalleryService: GalleryService,
    UtilsService: require('./services/node/utils')
}
