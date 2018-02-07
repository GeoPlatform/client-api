



(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q"],
            function(Q ) {
                return (root.UtilsService = factory(Q ));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.UtilsService = factory(require('q'))
        );
    } else {
        GeoPlatform.UtilsService = factory(Q);
    }
}(this||window, function(Q ) {

    'use strict';

    const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];


    class UtilsService {

        constructor(url, httpClient) {
            this.setUrl(url);
            this.client = httpClient;
            this.timeout = 10000;
            this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        }

        setUrl(baseUrl) {
            this.baseUrl = baseUrl;
        }


        /**
         * @param {string} property - optional capa property to specifically request
         * @param {Object} query - optional query parameters to include with request
         * @param {Object} options - optional config to send with http request
         * @return {Promise} resolving capabilities object
         */
        capabilities (property, query, options) {

            let url = this.baseUrl + '/api/capabilities';
            if(property)
                url += '/' + property;

            return Q.resolve( url )
            .then( (url) => {
                let opts = this.buildRequest({
                    method:"GET", url:url, params:query||{}, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`UtilsService.capabilities() - Error getting capabilities: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {File} file
         * @param {string} format
         * @param {Object} options
         * @return {Promise}
         */
        parseFile (file, format, options) {
            
            var url = this.baseUrl + '/api/utils/parse';

            return Q.resolve( url )
            .then( url => {

                let formData = ;

                let opts = this.buildRequest({
                    method:"POST",  url:url,
                    data: { format: format },
                    file: file,
                    formData: true,   //NodeJS (RequestJS)
                    options: options
                });
                return this.execute(opts);
            })
            .then( response => response.body )
            .catch(e => {
                let err = new Error(`UtilsService.parseFile() - Error parsing file: ${e.message}`);
                return Q.reject(err);
            });
        }










        /* ----------------------------------------------------------- */

        /**
         * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
         * @param {string} url - destination of xhr request
         * @param {Object} params - object to be sent with request as query parameters
         * @param {Object} data - object to be sent with request as body
         * @param {Object} options - optional object defining request options
         * @return {Object} request options for xhr
         */
        buildRequest (options) {

            if(this.httpMethods.indexOf(options.method)<0)
                throw new Error(`Unsupported HTTP method ${options.method}`);

            if(!options.url)
                throw new Error(`Must specify a URL for HTTP requests`);

            options.timeout = this.timeout;

            return this.createRequestOpts(options);
        }

        createRequestOpts(options) {
            return this.client.createRequestOpts(options);
        }

        execute(opts) {
            return this.client.execute(opts);
        }

    }

    return UtilsService;

}));
