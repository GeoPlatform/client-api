


(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.LayerService = factory(
                require('q'),
                require('./item')
            )
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('LayerService', ["q", "./item"],
            function(Q, ItemService) {
                return (root.LayerService = factory(Q, ItemService));
            });
    } else {
        GeoPlatform.LayerService = factory(Q, GeoPlatform.ItemService);
    }
}(this||window, function(Q, ItemService) {


    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    class LayerService extends ItemService {

        constructor(url, httpClient) {
            super(url, httpClient);
        }

        setUrl(baseUrl) {
            super.setUrl(baseUrl);
            this.baseUrl = baseUrl + '/api/layers';
        }

        /**
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving style JSON object
         */
        style (options) {
            return Q.resolve( true )
            .then( () => {

                let url = this.baseUrl + '/' + id + '/style';
                let opts = this.buildRequest({
                    method:"GET", url:url, options:options
                });
                return this.execute(opts);
            })
            .catch(e => this._onError(e, "LayerService.style() - Error fetching style") );
        }

        /**
         * @param {string} id - GeoPlatform Layer identifier
         * @param {Object} req identifying extent, x, y
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving feature JSON object
         */
        describe( id, req, options ) {

            return Q.resolve( req )
            .then( (req) => {

                if(!req) {
                    let err = new Error("Must provide describe parameters to use");
                    err.status = 400;
                    err.error = "Bad Request";
                    throw err;
                }

                let keys = ['bbox', 'height', 'width', 'x', 'y'];
                let missing = keys.find(key => !req[key]);
                if(missing) {
                    let err = new Error(`Must specify ${missing} in describe req`);
                    err.status = 400;
                    err.error = "Bad Request";
                    throw err;
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
                let opts = this.buildRequest({
                    method:"GET", url:url, params:params, options:options
                });
                return this.execute(opts);
            })
            .catch(e => this._onError(e, "LayerService.describe() - Error describing layer feature") );
        }

        /**
         * @param {string} id - GeoPlatform Layer identifier
         * @param {Object} params describing layer request to validate
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving empty if successful or a message if failed
         */
        validate(id, params, options) {

            return Q.resolve( params )
            .then( params => {

                if(!params) {
                    let err = new Error("Must provide parameters to use in layer validation");
                    err.status = 400;
                    err.error = "Bad Request";
                    throw err;
                }

                let url = this.baseUrl + '/' + id + '/validate';
                let opts = this.buildRequest({
                    method:"GET", url:url, params:params, options:options
                });
                return this.execute(opts);
            })
            .catch(e => this._onError(e, "LayerService.describe() - Error describing layer feature") );
        }

    }

    return LayerService;

}));
