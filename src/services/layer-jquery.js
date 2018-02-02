


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "JQueryItemService"],
            function(jQuery, Q, GeoPlatform, JQueryItemService) {
                return (root.JQueryLayerService = factory(jQuery, Q, GeoPlatform, JQueryItemService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.JQueryLayerService = factory(
                require("jquery"),
                require('q'),
                require('GeoPlatform'),
                require('JQueryItemService')
            )
        );
    } else {
        GeoPlatform.JQueryLayerService = factory(jQuery, Q, GeoPlatform, GeoPlatform.JQueryItemService);
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

    class JQueryLayerService extends JQueryItemService {

        constructor() {
            super();
            this.baseUrl = GeoPlatform.ualUrl + '/api/layers';
        }

        /**
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving style JSON object
         */
        style (options) {
            return Q.resolve( true )
            .then( () => {

                let d = Q.defer();
                let url = this.baseUrl + '/' + id + '/style';
                let opts = this.buildRequest("GET", url, null, options);
                opts.success = function(data) { d.resolve(data); };
                opts.error = function(xhr, status, message) {
                    let m = `GeoPlatform.LayerService.style() - Error fetching item style: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                };
                jQuery.ajax(opts);
                return d.promise;
            })
            .catch(e => {
                let err = new Error(`ItemService.save() - Error deleting item: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {Object} req identifying extent, x, y
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving feature JSON object
         */
        describe( req, options ) {

            return Q.resolve( true )
            .then( () => {

                if(!req) {
                    throw new Error("Must provide describe req");
                }

                let keys = ['bbox', 'height', 'width', 'x', 'y'];
                let missing = keys.find(key => !req[key]);
                if(missing) {
                    throw new Error(`Must specify ${missing} in describe req`);
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

                let d = Q.defer();
                let url = this.baseUrl + '/' + id + '/describe';
                let opts = this.buildRequest("GET", url, params, options);
                opts.success = function(data) { d.resolve(data); };
                opts.error = function(xhr, status, message) { d.reject(new Error(message)); };
                jQuery.ajax(opts);
                return d.promise;
            })
            .catch(e => {
                let err = new Error(`JQueryLayerService.describe() -
                    Error describing layer feature: ${e.message}`);
                return Q.reject(err);
            });
        }

    }

    return JQueryLayerService;

}));
