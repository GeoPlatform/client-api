
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([
            "ItemTypes",
            "NGItemService", "NGLayerService",
            "NGMapService", "NGServiceService"],
            function(ItemTypes, NGItemService, NGLayerService, NGMapService, NGServiceService){
            return (root.NGServiceFactory =
                factory(ItemTypes, NGItemService, NGLayerService, NGMapService, NGServiceService));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.NGServiceFactory = factory(
                require('../../shared/types'),
                require('./item'),
                require('./layer'),
                require('./map'),
                require('./service')
            )
        );
    } else {
        GeoPlatform.NGServiceFactory = factory(
            GeoPlatform.ItemTypes,
            GeoPlatform.NGItemService,
            GeoPlatform.NGLayerService,
            GeoPlatform.NGMapService,
            GeoPlatform.NGServiceService);
    }
}(this||window, function(NGItemService, NGLayerService,
    NGMapService, NGServiceService) {

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
            case Types.LAYER:   return new NGLayerService(baseUrl);
            case Types.SERVICE: return new NGServiceService(baseUrl);
            case Types.MAP:     return new NGMapService(baseUrl);
            // case Types.GALLERY: return new NGGalleryService(baseUrl);
            // case Types.DATASET: return new NGDatasetService(baseUrl);
            default:            return new NGItemService(baseUrl);
        }
    }

    return ServiceFactory;

}));
