


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "JQueryItemService"],
            function(jQuery, Q, GeoPlatform, JQueryItemService) {
                return (root.JQueryMapService = factory(jQuery, Q, GeoPlatform, JQueryItemService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.JQueryMapService = factory(
                require("jquery"),
                require('q'),
                require('GeoPlatform'),
                require('JQueryItemService')
            )
        );
    } else {
        GeoPlatform.JQueryMapService = factory(jQuery, Q, GeoPlatform, GeoPlatform.JQueryItemService);
    }
}(this||window, function(jQuery, Q, GeoPlatform, JQueryItemService) {


    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.JQueryItemService
     */

    class JQueryMapService extends JQueryItemService {

        constructor() {
            super();
            this.baseUrl = GeoPlatform.ualUrl + '/api/maps';
        }

    }

    return JQueryMapService;

}));
