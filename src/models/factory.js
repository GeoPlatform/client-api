



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([
            'ItemTypes',
            'DatasetModel', 'ServiceModel', 'LayerModel',
            'MapModel', 'GalleryModel'
        ], function(
            ItemTypes, DatasetModel, ServiceModel,
            LayerModel, MapModel, GalleryModel) {
            return (root.ItemFactory = factory(
                ItemTypes, DatasetModel, ServiceModel,
                LayerModel, MapModel, GalleryModel));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ItemFactory = factory(
                require('../shared/types'),
                require('./dataset'),
                require('./service'),
                require('./layer'),
                require('./map'),
                require('./gallery')
            )
        );
    } else {
        GeoPlatform.ItemFactory = factory(
            GeoPlatform.ItemTypes,
            GeoPlatform.DatasetModel,
            GeoPlatform.ServiceModel,
            GeoPlatform.LayerModel,
            GeoPlatform.MapModel,
            GeoPlatform.GalleryModel
        );
    }
}(this||window, function(
    ItemTypes, DatasetModel, ServiceModel,
    LayerModel, MapModel, GalleryModel
) {

    return function(arg, options) {
        switch(arg) {
            case ItemTypes.DATASET: return new DatasetModel(options);
            case ItemTypes.SERVICE: return new ServiceModel(options);
            case ItemTypes.LAYER:   return new LayerModel(options);
            case ItemTypes.MAP:     return new MapModel(options);
            case ItemTypes.GALLERY: return new GalleryModel(options);
            default: return null;
        }
    }

}));
