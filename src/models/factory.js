



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


    function forEach(arr, fn) {
        if(arr && typeof(arr.push) !== 'undefined' && arr.length) {
            for(let i=0; i<arr.length; ++i) {
                try {
                    fn(arr[i], i);
                } catch(e) {}
            }
        }
    }

    function cloneObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }


    // Base item property parsing support
    function parseItem(json, item) {
        if(!json) return;
        if(json.label)       item.label(json.label);
        if(json.description) item.description(json.description);
        if(json.keywords)    item.keywords(json.keywords);
        if(json.createdBy)   item.createdBy(json.createdBy);
        if(json.status)      item.status(json.status);
        if(json.visibility)  item.visibility(json.visibility);
        if(json.themes)      item.themes(json.themes);
        if(json.publishers)  item.publishers(json.publishers);
        if(json.contacts)    item.contacts(json.contacts);
        if(json.resourceTypes) item.resourceTypes(json.resourceTypes);
        if(json.identifiers) item.identifiers(json.identifiers);
        if(json.landingPage) item.landingPage(json.landingPage);
        if(json.classifiers) item.classifiers(json.classifiers);
        // console.log("Parsed Item base");
    }


    // Dataset item property parsing support
    function parseDataset(json, item) {
        if(!json) return;
        parseItem(json, item);
        if(json.services) {
            let svcs = json.services.map(s=>itemFactory(s));
            item.services(svcs);
        }
    }

    // Service item property parsing support
    function parseService(json, item) {
        if(!json) return;
        parseItem(json, item);
        if(json.href)        item.href(json.href);
        if(json.serviceType) item.serviceType(json.serviceType);
    }

    // Layer item property parsing support
    function parseLayer(json, item) {
        if(!json) return;
        parseItem(json, item);
        if(json.layerName) item.layerName(json.layerName);
        if(json.layerType) item.layerType(json.layerType);
        if(json.legend)    item.legend(json.legend);
        if(json.services) {
            let svcs = json.services.map(s=>itemFactory(s));
            item.services(svcs);
        }
    }

    // Map item property parsing support
    function parseMap(json, item) {
        if(!json) return;
        parseItem(json, item);
        if(json.thumbnail)   item.thumbnail(json.thumbnail);
        if(json.annotations) item.annotations(json.annotations);

        if(json.baseLayer) {
            try {
                let baseLayer = itemFactory(json.baseLayer);
                item.baseLayer(baseLayer);
            } catch(e) {
                throw new Error("Error parsing map base layer, " + e.message);
            }
        }

        if(json.layers && typeof(json.layers.push) !== 'undefined') {
            try {
                let layers = json.layers.map( state => {
                    let result = cloneObj(state);
                    result.layer = itemFactory(result.layer);
                    return result;
                });
                item.layers(layers);
            } catch(e) {
                throw new Error("Error parsing map overlay layers, " + e.message);
            }
        }

    }

    // Gallery item property parsing support
    function parseGallery(json, item) {
        if(!json) return;
        parseItem(json, item);
        if(json.items) {
            let items = json.items.map( item => {
                let result = cloneObj(item);
                result.asset = itemFactory(result.asset);
                return result;
            });
            item.items(json.items);
        }
    }








    function itemFactory(arg) {

        let type = null, options = null;
        if(arg && typeof(arg) === 'string')
            type = arg;
        else if(arg && typeof(arg) === 'object') {
            if(arg.type) type = arg.type;
            else throw new Error("Must specify 'type' in parameter object");
            options = arg;
        } else {
            throw new Error("Illegal argument; must be string type or object definition");
        }

        let opts = null;
        if(options) {
            //handle immutable properties
            opts = {
                id       : options.id,
                uri      : options.uri,
                _created : options._created,
                modified : options.modified
            };
        }

        // console.log(`${type}`);

        let item = null;
        switch(type) {
            case ItemTypes.DATASET:
                item = new DatasetModel(opts);
                try { parseDataset(options, item); }
                catch(e) { console.log("Error parsing dataset " + e.message); }
                break;
            case ItemTypes.SERVICE:
                item = new ServiceModel(opts);
                try { parseService(options, item); }
                catch(e) { console.log("Error parsing service " + e.message); }
                break;
            case ItemTypes.LAYER:
                item = new LayerModel(opts);
                try { parseLayer(options, item); }
                catch(e) { console.log("Error parsing layer " + e.message); }
                break;
            case ItemTypes.MAP:
                item = new MapModel(opts);
                try { parseMap(options, item); }
                catch(e) { console.log("Error parsing map " + e.message); }
                break;
            case ItemTypes.GALLERY:
                item = new GalleryModel(opts);
                try { parseGallery(options, item); }
                catch(e) { console.log("Error parsing gallery " + e.message); }
                break;
            default: throw new Error(`Unsupported item type '${type}'`);
        }

        // console.log(`ItemFactory - done with ${type}`);
        return item;

    }

    return itemFactory;

}));
