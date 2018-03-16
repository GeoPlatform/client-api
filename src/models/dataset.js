



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['ItemModel','ItemTypes', 'ItemProperties'],
        function(ItemModel, ItemTypes, ItemProperties) {
            return (root.DatasetModel = factory(ItemModel, ItemTypes, ItemProperties));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.DatasetModel = factory(
                require('./item'),
                require('../shared/types'),
                require('./properties')
            )
        );
    } else {
        GeoPlatform.DatasetModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
}(this||window, function(ItemModel, ItemTypes, ItemProperties) {


    class DatasetModel extends ItemModel {

        constructor(data) {
            super(data);
            this.set(ItemProperties.TYPE, ItemTypes.DATASET);
            this.default(ItemProperties.SERVICES, []);
        }

        //-----------------------------------------------------------

        services(value) { this.setServices(value); return this; }
        getServices() { return this.get(ItemProperties.SERVICES); }
        setServices(value) { this.set(ItemProperties.SERVICES, value); }
        addService(value) { this.addTo(ItemProperties.SERVICES, value); }
        removeService(value) { this.removeFrom(ItemProperties.SERVICES, value); }

        //-----------------------------------------------------------


    }

    return DatasetModel;

}));