



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['ItemModel','ItemTypes'], function(ItemModel, ItemTypes) {
            return (root.LayerModel = factory(ItemModel, ItemTypes));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.LayerModel = factory(
                require('./item'),
                require('../shared/types')
            )
        );
    } else {
        GeoPlatform.LayerModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes);
    }
}(this||window, function(ItemModel, ItemTypes) {


    class LayerModel extends ItemModel {

        constructor(data) {
            super(data);
            this.type = ItemTypes.LAYER;
        }

        //-----------------------------------------------------------

        layerType(value) { this.setLayerType(value); return this; }
        getLayerType() { return this.layerType; }
        setLayerType(value) { this.layerType = value; }

        //-----------------------------------------------------------

        legend(value) { this.setLegend(value); return this; }
        getLegend() { return this.legend; }
        setLegend(value) { this.legend = value; }

        //-----------------------------------------------------------

        services(value) { this.setServices(value); return this; }
        getServices() { return this.services; }
        setServices(value) {
            if(value && typeof(value.push) === 'undefined')
                value = [value];
            this.services = value;
        }
        addService(value) {
            if(!value || !value.id) return;
            this.services = this.addObject(value, this.services);
        }
        removeService(value) {
            if(!value || !value.id) return;
            this.services = this.removeObject(value, this.services);
        }

        //-----------------------------------------------------------



        //-----------------------------------------------------------


    }

    return LayerModel;

}));
