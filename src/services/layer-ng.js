


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "angular", "GeoPlatform", "NGItemService"],
        function(Q, angular, GeoPlatform, NGItemService) {
            return (root.NGLayerService = factory(Q, angular, GeoPlatform, NGItemService));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.NGLayerService = factory(
                require('q'),
                require("angular"),
                require('GeoPlatform'),
                require('NGItemService')
            )
        );
    } else {
        GeoPlatform.NGLayerService = factory(Q, angular, GeoPlatform, GeoPlatform.NGItemService);
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

    class NGLayerService extends NGItemService {

        constructor() {
            super();
            this.baseUrl = GeoPlatform.ualUrl + '/api/layers';
        }

        /**
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving style JSON object
         */
        style (options) {

            return Q.resolve( angular.injector(['ng']).get('$http') )
            .then( $http => {
                if(typeof($http) === 'undefined')
                    throw new Error("Angular $http not resolved");

                let url = this.baseUrl + '/' + id + '/style';
                let opts = this.buildRequest('GET', url, null, options);
                return $http(opts);

            }).catch( e => {
                let m = `GeoPlatform.NGLayerService.style() - Error getting layer style: ${e.message}`;
                let err = new Error(m);
                return Q.reject(err);
            });
        }

        /**
         * @param {Object} req identifying extent, x, y
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving feature JSON object
         */
        describe( req, options ) {

            return Q.resolve( angular.injector(['ng']).get('$http') )
            .then( $http => {

                if(typeof($http) === 'undefined')
                    throw new Error("Angular $http not resolved");

                if(!req) {
                    throw new Error("Must provide describe request parameters");
                }

                let keys = ['bbox', 'height', 'width', 'x', 'y'];
                let missing = keys.find(key => !req[key]);
                if(missing) {
                    throw new Error(`Must specify ${missing} in describe parameters`);
                }

                let params = {
                    srs         : 'EPSG:4326',
                    bbox        : req.bbox,
                    height      : req.height,
                    width       : req.width,
                    info_format : 'text/xml',
                    x           : req.x,
                    y           : req.y,
                    i           : req.x, //WMS 1.3.0
                    j           : req.y  //WMS 1.3.0
                };

                let url = this.baseUrl + '/' + id + '/describe';
                let opts = this.buildRequest("GET", url, params, options);
                return $http(opts);

            }).catch( e => {
                let m = `GeoPlatform.NGLayerService.get() - Error describing layer feature: ${e.message}`;
                let err = new Error(m);
                return Q.reject(err);
            });
        }

    }

    return NGLayerService;

}));
