



(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ConceptModel = factory(
                require('./item'),
                require('../shared/types'),
                require('./properties')
            )
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ConceptModel', ['./item','../shared/types', './properties'],
        function(ItemModel, ItemTypes, ItemProperties) {
            return (root.ConceptModel = factory(ItemModel, ItemTypes, ItemProperties));
        });
    } else {
        GeoPlatform.ConceptModel = factory(GeoPlatform.ItemModel,
            GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
}(this||window, function(ItemModel, ItemTypes, ItemProperties) {


    class ConceptModel extends ItemModel {

        constructor(data) {
            super(data);
            this.set(ItemProperties.TYPE, ItemTypes.CONCEPT);
        }

        //-----------------------------------------------------------

        scheme(value) { this.setScheme(value); return this; }
        getScheme() { return this.get(ItemProperties.CONCEPT_SCHEME); }
        setScheme(value) { this.set(ItemProperties.CONCEPT_SCHEME, value); }

        //-----------------------------------------------------------


    }

    return ConceptModel;

}));
