


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([], function() {
            return (root.ItemModel = factory());
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ItemModel = factory()
        );
    } else {
        GeoPlatform.ItemModel = factory();
    }
}(this||window, function() {


    const ItemProperties = {
        ID              : { key: 'id',              multi: false },
        URI             : { key: 'uri',             multi: false },
        TYPE            : { key: 'type',            multi: false },
        CREATED         : { key: '_created',        multi: false },
        MODIFIED        : { key: 'modified',        multi: false },
        LAST_MODIFIED_BY: { key: 'lastModifiedBy',  multi: false },
        IDENTIFIERS     : { key: 'identifiers',     multi: true },
        ALTERNATE_TITLES: { key: 'alternateTitles', multi: true },
        CREATED_BY      : { key: 'createdBy',       multi: false },
        LABEL           : { key: 'label',           multi: false },
        TITLE           : { key: 'title',           multi: false },
        DESCRIPTION     : { key: 'description',     multi: false },
        KEYWORDS        : { key: 'keywords',        multi: true },
        LANDING_PAGE    : { key: 'landingPage',     multi: false },
        STATUS          : { key: 'status',          multi: false },
        VISIBILITY      : { key: 'visibility',      multi: false },
        THEMES          : { key: 'themes',          multi: true, type: 'item' },
        PUBLISHERS      : { key: 'publishers',      multi: true, type: 'item' },
        CONTACTS        : { key: 'contacts',        multi: true, type: 'item' },
        CONTRIBUTORS    : { key: 'contributors',    multi: true, type: 'item' },
        DISTRIBUTIONS   : { key: 'distributions',   multi: true, type: 'object' },
        RESOURCE_TYPES  : { key: 'resourceTypes',   multi: true, type: 'object' },
        CLASSIFIERS     : { key: 'classifiers',     multi: false, type: 'object' },

        HREF            : { key: 'href',            multi: false },
        SERVICE_TYPE    : { key: 'serviceType',     multi: false, type: 'object' },
        DATASETS        : { key: 'datasets',        multi: true, type: 'item' },

        LAYER_TYPE      : { key: 'layerType',       multi: false },
        LAYER_NAME      : { key: 'layerName',       multi: false },
        LEGEND          : { key: 'legend',          multi: false, type: 'object' },
        SERVICES        : { key: 'services',        multi: true, type: 'item' },

        BASE_LAYER      : { key: 'baseLayer',       multi: false, type: 'item' },
        MAP_LAYERS      : { key: 'layers',          multi: true, type: 'object' },
        THUMBNAIL       : { key: 'thumbnail',       multi: false, type: "object" },
        ANNOTATIONS     : { key: 'annotations',     multi: false, type: 'object' },

        GALLERY_ITEMS   : { key: 'items',           multi: true, type: 'object' }
    };

    return ItemProperties;

}));
