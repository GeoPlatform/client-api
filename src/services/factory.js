
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([
            "ItemTypes", "ItemService", "LayerService",
            "ServiceService", "GalleryService", "CommunityService",
            "DatasetService", "MapService" ],
            function(ItemTypes, ItemService, LayerService,
                ServiceService,GalleryService, CommunityService,
                DatasetService, MapService){
            return (root.ServiceFactory =
                factory(ItemTypes, ItemService, LayerService,
                    ServiceService,GalleryService, CommunityService,
                    DatasetService, MapService));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ServiceFactory = factory(
                require('../shared/types'),
                require('./item'),
                require('./layer'),
                require('./service'),
                require('./gallery'),
                require('./community'),
                require('./dataset'),
                require('./map')
            )
        );
    } else {
        GeoPlatform.ServiceFactory = factory(
            GeoPlatform.ItemTypes,
            GeoPlatform.ItemService,
            GeoPlatform.LayerService,
            GeoPlatform.ServiceService,
            GeoPlatform.GalleryService,
            GeoPlatform.CommunityService,
            GeoPlatform.DatasetService,
            GeoPlatform.MapService);
    }
}(this||window, function(ItemTypes, ItemService, LayerService,
    ServiceService, GalleryService, CommunityService,
    DatasetService, MapService) {

    /**
     * @param {any} arg - string type or object with type property
     * @param {string} baseUrl - base endpoint of GeoPlatform API
     * @return {ItemService}
     */
    const ServiceFactory = function(arg, baseUrl, httpClient) {
        let type = (typeof(arg) === 'string') ?
            arg : (arg && arg.type ? arg.type : null);
        if(!type) throw new Error("Must provide a type or object with a type specified");
        if(!baseUrl) throw new Error("Must provide a base url");
        if(!httpClient) throw new Error("Must provide an http client to use to make requests");
        switch(type) {
            case ItemTypes.LAYER:     return new LayerService(    baseUrl, httpClient);
            case ItemTypes.SERVICE:   return new ServiceService(  baseUrl, httpClient);
            case ItemTypes.MAP:       return new MapService(      baseUrl, httpClient);
            case ItemTypes.GALLERY:   return new GalleryService(  baseUrl, httpClient);
            case ItemTypes.COMMUNITY: return new CommunityService(baseUrl, httpClient);
            case ItemTypes.DATASET:   return new DatasetService(  baseUrl, httpClient);
            default:                  return new ItemService(     baseUrl, httpClient);
        }
    };

    return ServiceFactory;

}));
