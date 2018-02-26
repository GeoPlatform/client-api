



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['ItemModel','ItemTypes'], function(ItemModel, ItemTypes) {
            return (root.ServiceModel = factory(ItemModel, ItemTypes));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ServiceModel = factory(
                require('./item'),
                require('../shared/types')
            )
        );
    } else {
        GeoPlatform.ServiceModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes);
    }
}(this||window, function(ItemModel, ItemTypes) {


    class ServiceModel extends ItemModel {

        constructor(data) {
            super(data);
            this._data.type = ItemTypes.SERVICE;
            this._data.datasets = this._data.datasets||[];
        }

        //-----------------------------------------------------------

        href(value) { this.setHref(value); return this; }
        getHref() { return this._data.href; }
        setHref(value) { this._data.href = value; }

        //-----------------------------------------------------------

        serviceType(value) { this.setServiceType(value); return this; }
        getServiceType() { return this._data.serviceType; }
        setServiceType(value) { this._data.serviceType = value; }

        //-----------------------------------------------------------

        datasets(value) { this.setDatasets(value); return this; }
        getDatasets() { return this._data.datasets; }
        setDatasets(value) {
            if(!value) value = [];
            else if(typeof(value.push) === 'undefined')
                value = [value];
            this._data.datasets = value;
        }
        addDataset(value) {
            this._data.datasets = this.addObject(value, this.get('datasets'));
        }
        removeDataset(value) {
            this._data.datasets = this.removeObject(value, this.get('datasets'));
        }

        //-----------------------------------------------------------



        //-----------------------------------------------------------


    }

    return ServiceModel;

}));