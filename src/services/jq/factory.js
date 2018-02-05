
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([
            "ItemTypes",
            "JQueryItemService", "JQueryLayerService",
            "JQueryMapService", "JQueryServiceService"],
            function(ItemTypes, JQueryItemService, JQueryLayerService, JQueryMapService, JQueryServiceService){
            return (root.JQueryServiceFactory =
                factory(ItemTypes, JQueryItemService, JQueryLayerService, JQueryMapService, JQueryServiceService));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.JQueryServiceFactory = factory(
                require('../../shared/types'),
                require('./item'),
                require('./layer'),
                require('./map'),
                require('./service')
            )
        );
    } else {
        GeoPlatform.JQueryServiceFactory = factory(
            GeoPlatform.ItemTypes,
            GeoPlatform.JQueryItemService,
            GeoPlatform.JQueryLayerService,
            GeoPlatform.JQueryMapService,
            GeoPlatform.JQueryServiceService);
    }
}(this||window, function(JQueryItemService, JQueryLayerService,
    JQueryMapService, JQueryServiceService) {

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
            case Types.LAYER:   return new JQueryLayerService(baseUrl);
            case Types.SERVICE: return new JQueryServiceService(baseUrl);
            case Types.MAP:     return new JQueryMapService(baseUrl);
            // case Types.GALLERY: return new JQueryGalleryService(baseUrl);
            // case Types.DATASET: return new JQueryDatasetService(baseUrl);
            default:             return new JQueryItemService(baseUrl);
        }
    }

    return ServiceFactory;

}));
