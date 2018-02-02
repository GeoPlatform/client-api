


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "angular", "GeoPlatform", "NGItemService"],
            function(Q, angular, GeoPlatform, NGItemService) {
                return (root.NGMapService = factory(Q, angular, GeoPlatform, NGItemService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.NGMapService = factory(
                require('q'),
                require("angular"),
                require('GeoPlatform'),
                require('NGItemService')
            )
        );
    } else {
        GeoPlatform.NGMapService = factory(Q, angular, GeoPlatform, GeoPlatform.NGItemService);
    }
}(this||window, function(Q, angular, GeoPlatform, NGItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.NGItemService
     */

    class NGMapService extends NGItemService {

        constructor() {
            super();
            this.baseUrl = GeoPlatform.ualUrl + '/api/maps';
        }

    }

    return NGMapService;

}));
