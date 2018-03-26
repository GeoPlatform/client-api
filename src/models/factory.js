



(function (root, factory) {
    if(typeof module === "object" && module.exports) {
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
                require('./gallery'),
                require('./community'),
                require('./concept'),
                require('./concept-scheme')
            )
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ItemFactory', [
            '../shared/types',
            './dataset', './service', './layer',
            './map', './gallery', './community',
            './concept', './concept-scheme'
        ], function(
            ItemTypes,
            DatasetModel, ServiceModel, LayerModel,
            MapModel, GalleryModel, CommunityModel,
            ConceptModel, ConceptSchemeModel
        ) {
            return (root.ItemFactory = factory(
                ItemTypes,
                DatasetModel, ServiceModel, LayerModel,
                MapModel, GalleryModel, CommunityModel,
                ConceptModel, ConceptSchemeModel
            ));
        });
    } else {
        GeoPlatform.ItemFactory = factory(
            GeoPlatform.ItemTypes,
            GeoPlatform.DatasetModel,
            GeoPlatform.ServiceModel,
            GeoPlatform.LayerModel,
            GeoPlatform.MapModel,
            GeoPlatform.GalleryModel,
            GeoPlatform.CommunityModel,
            GeoPlatform.ConceptModel,
            GeoPlatform.ConceptSchemeModel
        );
    }
}(this||window, function(
    ItemTypes,
    DatasetModel, ServiceModel, LayerModel,
    MapModel, GalleryModel, CommunityModel,
    ConceptModel, ConceptSchemeModel
) {


    function itemFactory(type, options) {
        let item = null;

        // console.log(" ");
        // console.log(`ItemFactory() - Creating ${type} Item`);
        // console.log(" using... " + JSON.stringify(options));
        // console.log("-------------------------------");

        try {

            switch(type) {
                case ItemTypes.DATASET:
                    item = new DatasetModel(options);
                    break;
                case ItemTypes.SERVICE:
                    item = new ServiceModel(options);
                    break;
                case ItemTypes.LAYER:
                    item = new LayerModel(options);
                    break;
                case ItemTypes.MAP:
                    item = new MapModel(options);
                    break;
                case ItemTypes.GALLERY:
                    item = new GalleryModel(options);
                    break;
                case ItemTypes.COMMUNITY:
                    item = new CommunityModel(options);
                    break;
                case ItemTypes.CONCEPT:
                    item = new ConceptModel(options);
                    break;
                case ItemTypes.CONCEPT_SCHEME:
                    item = new ConceptSchemeModel(options);
                    break;
                default: throw new Error(`Unsupported item type '${type}'`);
            }

        } catch(e) {
            console.log("ItemFactory.parse() - Error creating " + type +
                " using " + JSON.stringify(options) +
                " : " + e.message);
            throw new Error("ItemFactory.parse() - Error creating " + type +
                " using " + JSON.stringify(options) +
                " : " + e.message);
        }

        // console.log(`ItemFactory - done with ${item.getType()}`);
        // console.log(" ");
        return item;
    }




    return function (arg) {

        // console.log("ItemFactory() - " + JSON.stringify(arg));

        let type = null, options = null;
        if(arg && typeof(arg) === 'string')
            type = arg;
        else if(arg && typeof(arg) === 'object') {

            if(typeof(arg.toJson) !== 'undefined') {
                // console.log(arg.getType() + " is already an Item");
                return arg; //already an Item instance
            }

            if(arg.type)
                type = arg.type;
            else
                throw new Error("ItemFactory() - Must specify 'type' in parameter object");

            options = arg;
        } else {
            throw new Error("Illegal argument; must be string type or object definition");
        }

        return itemFactory(type, options);

    };

}));
