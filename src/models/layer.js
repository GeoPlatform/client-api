



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
            this._data.type = ItemTypes.LAYER;
            this._data.services = this._data.services || [];
        }

        //-----------------------------------------------------------

        layerType(value) { this.setLayerType(value); return this; }
        getLayerType() { return this._data.layerType; }
        setLayerType(value) { this._data.layerType = value; }

        //-----------------------------------------------------------

        layerName(value) { this.setLayerName(value); return this; }
        getLayerName() { return this._data.layerName; }
        setLayerName(value) { this._data.layerName = value; }

        //-----------------------------------------------------------

        legend(value) { this.setLegend(value); return this; }
        getLegend() { return this._data.legend; }
        setLegend(value) { this._data.legend = value; }

        //-----------------------------------------------------------

        services(value) { this.setServices(value); return this; }
        getServices() { return this._data.services; }
        setServices(value) {
            if(!value) value = [];
            else if(typeof(value.push) === 'undefined')
                value = [value];
            this._data.services = value;
        }
        addService(value) {
            this._data.services = this.addObject(value, this.get('services'));
        }
        removeService(value) {
            this._data.services = this.removeObject(value, this.get('services'));
        }

        //-----------------------------------------------------------



        //-----------------------------------------------------------


    }

    return LayerModel;

}));
