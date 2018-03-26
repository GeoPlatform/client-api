



(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ServiceModel = factory(
                require('./item'),
                require('../shared/types'),
                require('./properties')
            )
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ServiceModel', ['./item','../shared/types', './properties'],
        function(ItemModel, ItemTypes, ItemProperties) {
            return (root.ServiceModel = factory(ItemModel, ItemTypes, ItemProperties));
        });
    } else {
        GeoPlatform.ServiceModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
}(this||window, function(ItemModel, ItemTypes, ItemProperties) {


    class ServiceModel extends ItemModel {

        constructor(data) {
            super(data);
            this.set(ItemProperties.TYPE, ItemTypes.SERVICE);
            this.default(ItemProperties.DATASETS, []);
        }

        //-----------------------------------------------------------

        href(value) { this.setHref(value); return this; }
        getHref() { return this.get(ItemProperties.HREF); }
        setHref(value) { this.set(ItemProperties.HREF, value); }

        //-----------------------------------------------------------

        serviceType(value) { this.setServiceType(value); return this; }
        getServiceType() { return this.get(ItemProperties.SERVICE_TYPE); }
        setServiceType(value) { this.set(ItemProperties.SERVICE_TYPE, value); }

        //-----------------------------------------------------------

        datasets(value) { this.setDatasets(value); return this; }
        getDatasets() { return this.get(ItemProperties.DATASETS); }
        setDatasets(value) { this.set(ItemProperties.DATASETS, value); }
        addDataset(value) { this.addTo(ItemProperties.DATASETS, value); }
        removeDataset(value) { this.removeFrom(ItemProperties.DATASETS, value); }

        //-----------------------------------------------------------


    }

    return ServiceModel;

}));
