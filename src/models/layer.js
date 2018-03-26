



(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.LayerModel = factory(
                require('./item'),
                require('../shared/types'),
                require('./properties')
            )
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('LayerModel', ['./item','../shared/types', './properties'],
        function(ItemModel, ItemTypes, ItemProperties) {
            return (root.LayerModel = factory(ItemModel, ItemTypes, ItemProperties));
        });
    } else {
        GeoPlatform.LayerModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
}(this||window, function(ItemModel, ItemTypes, ItemProperties) {


    class LayerModel extends ItemModel {

        constructor(data) {
            super(data);
            this.set(ItemProperties.TYPE, ItemTypes.LAYER);
            this.default(ItemProperties.SERVICES, []);
        }

        //-----------------------------------------------------------

        layerType(value) { this.setLayerType(value); return this; }
        getLayerType() { return this.get(ItemProperties.LAYER_TYPE); }
        setLayerType(value) { this.set(ItemProperties.LAYER_TYPE, value); }

        //-----------------------------------------------------------

        layerName(value) { this.setLayerName(value); return this; }
        getLayerName() { return this.get(ItemProperties.LAYER_NAME); }
        setLayerName(value) { this.set(ItemProperties.LAYER_NAME, value); }

        //-----------------------------------------------------------

        legend(value) { this.setLegend(value); return this; }
        getLegend() { return this.get(ItemProperties.LEGEND); }
        setLegend(value) { this.set(ItemProperties.LEGEND, value); }

        //-----------------------------------------------------------

        services(value) { this.setServices(value); return this; }
        getServices() { return this.get(ItemProperties.SERVICES); }
        setServices(value) { this.set(ItemProperties.SERVICES, value); }
        addService(value) { this.addTo(ItemProperties.SERVICES, value); }
        removeService(value) { this.removeFrom(ItemProperties.SERVICES, value); }

        //-----------------------------------------------------------

    }

    return LayerModel;

}));
