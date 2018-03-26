


(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ItemModel = factory(require('../shared/types'))
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ItemModel', ['../shared/types'], function(ItemTypes) {
            return (root.ItemModel = factory(ItemTypes));
        });
    } else {
        GeoPlatform.ItemModel = factory(GeoPlatform.ItemTypes);
    }
}(this||window, function(ItemTypes) {


    const ItemProperties = {
        ID              : { key: 'id' },
        URI             : { key: 'uri' },
        TYPE            : { key: 'type' },
        CREATED         : { key: '_created' },
        MODIFIED        : { key: 'modified' },
        LAST_MODIFIED_BY: { key: 'lastModifiedBy' },
        IDENTIFIERS     : { key: 'identifiers',     multi: true },
        ALTERNATE_TITLES: { key: 'alternateTitles', multi: true },
        CREATED_BY      : { key: 'createdBy' },
        LABEL           : { key: 'label' },
        TITLE           : { key: 'title' },
        DESCRIPTION     : { key: 'description' },
        KEYWORDS        : { key: 'keywords',        multi: true },
        LANDING_PAGE    : { key: 'landingPage' },
        STATUS          : { key: 'status' },
        VISIBILITY      : { key: 'visibility' },
        THEMES          : { key: 'themes',          multi: true,    type: 'item'    },
        PUBLISHERS      : { key: 'publishers',      multi: true,    type: 'item'    },
        CONTACTS        : { key: 'contacts',        multi: true,    type: 'item'    },
        CONTRIBUTORS    : { key: 'contributors',    multi: true,    type: 'item'    },
        DISTRIBUTIONS   : { key: 'distributions',   multi: true,    type: 'object'  },
        RESOURCE_TYPES  : { key: 'resourceTypes',   multi: true,    type: 'object'  },
        CLASSIFIERS     : { key: 'classifiers',     multi: false,   type: 'object'  },

        HREF            : { key: 'href' },
        SERVICE_TYPE    : { key: 'serviceType',     multi: false, type: 'object' },
        DATASETS        : { key: 'datasets',        multi: true, type: 'item' },

        LAYER_TYPE      : { key: 'layerType' },
        LAYER_NAME      : { key: 'layerName' },
        LEGEND          : { key: 'legend',          multi: false,   type: 'object'  },
        SERVICES        : { key: 'services',        multi: true,    type: 'item'    },

        BASE_LAYER      : { key: 'baseLayer',       multi: false,   type: 'item'    },
        MAP_LAYERS      : { key: 'layers',          multi: true,    type: 'object'  },
        THUMBNAIL       : { key: 'thumbnail',       multi: false,   type: "object"  },
        ANNOTATIONS     : { key: 'annotations',     multi: false,   type: 'object'  },

        GALLERY_ITEMS   : { key: 'items',           multi: true,    type: 'object'  },

        CONCEPT_SCHEME  : { key: 'scheme',          multi: false,   type: 'item'    }
    };

    return ItemProperties;

}));
