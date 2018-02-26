



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['ItemModel','ItemTypes'], function(ItemModel, ItemTypes) {
            return (root.DatasetModel = factory(ItemModel, ItemTypes));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.DatasetModel = factory(
                require('./item'),
                require('../shared/types')
            )
        );
    } else {
        GeoPlatform.DatasetModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes);
    }
}(this||window, function(ItemModel, ItemTypes) {


    class DatasetModel extends ItemModel {

        constructor(data) {
            super(data);
            this._data.type = ItemTypes.DATASET;
            this._data.services = this._data.services||[];
        }

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

    return DatasetModel;

}));
