



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['ItemModel','ItemTypes'], function(ItemModel, ItemTypes) {
            return (root.MapModel = factory(ItemModel, ItemTypes));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.MapModel = factory(
                require('./item'),
                require('../shared/types')
            )
        );
    } else {
        GeoPlatform.MapModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes);
    }
}(this||window, function(ItemModel, ItemTypes) {


    class MapModel extends ItemModel {

        constructor(data) {
            super(data);
            this._data.type = ItemTypes.MAP;
            this._data.layers = this._data.layers || [];
        }

        //-----------------------------------------------------------

        thumbnail(value) { this.setThumbnail(value); return this; }
        getThumbnail() { return this._data.thumbnail; }
        setThumbnail(value) { this._data.thumbnail = value; }

        //-----------------------------------------------------------

        baseLayer(value) { this.setBaseLayer(value); return this; }
        getBaseLayer() { return this._data.baseLayer; }
        setBaseLayer(value) { this._data.baseLayer = value; }

        //-----------------------------------------------------------

        layers(value) { this.setLayers(value); return this; }
        getLayers() { return this._data.layers; }
        setLayers(value) {
            if(!value) value = [];
            else if(typeof(value.push) === 'undefined')
                value = [value];
            this._data.layers = value;
        }
        addLayer(value) {
            this._data.layers = this.addObject(value, this.get('layers'));
        }
        removeLayer(value) {
            this._data.layers = this.removeObject(value, this.get('layers'));
        }

        //-----------------------------------------------------------

        annotations(value) { this.setAnnotations(value); return this; }
        getAnnotations() { return this._data.annotations; }
        setAnnotations(value) { this._data.annotations = value; }

        //-----------------------------------------------------------



        //-----------------------------------------------------------



    }

    return MapModel;

}));
