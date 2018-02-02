


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "angular", "GeoPlatform", "NGItemService"],
            function(Q, angular, GeoPlatform, NGItemService) {
                return (root.NGServiceService = factory(Q, angular, GeoPlatform, NGItemService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.NGServiceService = factory(
                require('q'),
                require("angular"),
                require('GeoPlatform'),
                require('NGItemService')
            )
        );
    } else {
        GeoPlatform.NGServiceService = factory(Q, angular, GeoPlatform, GeoPlatform.NGItemService);
    }
}(this||window, function(Q, angular, GeoPlatform, NGItemService) {

    'use strict';

    /**
     * GeoPlatform Service service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate service objects.
     *
     * @see GeoPlatform.NGItemService
     */

    class NGServiceService extends NGItemService {

        constructor() {
            super();
            this.baseUrl = GeoPlatform.ualUrl + '/api/services';
        }


        /**
         * Fetch metadata from the specified GeoPlatform Service's
         * web-accessible implementation using either GetCapabilities
         * or ESRI documentInfo.
         * @param {Object} service - GeoPlatform Service object
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving service metadata
         */
        about( service, options ) {

            if(!service) {
                let err = new Error("Must provide service to get metadata about");
                return Q.reject(err);
            }

            return Q.resolve( angular.injector(['ng']).get('$http') )
            .then( $http => {
                if(typeof($http) === 'undefined')
                    throw new Error("Angular $http not resolved");

                let opts = this.buildRequest('POST', this.baseUrl + '/about', service, options);
                return $http(opts);

            }).catch( e => {
                let m = `NGServiceService.get() - Error describing service: ${e.message}`;
                let err = new Error(m);
                return Q.reject(err);
            });
        }

    }

    return NGServiceService;

}));
