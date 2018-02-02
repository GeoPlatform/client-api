
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "ItemService"], function(jQuery, Q, GeoPlatform, ItemService){
            return (root.JQueryItemService = factory(jQuery, Q, GeoPlatform, ItemService));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.JQueryItemService = factory(
                require("jquery"),
                require('q'),
                require('GeoPlatform'),
                require('ItemService')
            )
        );
    } else {
        GeoPlatform.JQueryItemService = factory(jQuery, Q, GeoPlatform, GeoPlatform.ItemService);
    }
}(this||window, function(jQuery, Q, GeoPlatform, ItemService) {


    const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

    /**
     * JQuery ItemService
     * service for working with the GeoPlatform API to
     * retrieve and manipulate items.
     *
     * Ex Searching Items
     *      let params = { q: 'test' };
     *      itemService.search(params).then(response=>{
     *          console.log(response.results.length + " of " + response.totalResults);
     *      }).catch(e=>{...});
     *
     * Ex Fetch Item:
     *      itemService.get(itemId).then(item=>{...}).catch(e=>{...});
     *
     * Ex Saving Item:
     *      itemService.save(item).then(item=>{...}).catch(e=>{...});
     *
     * Ex Deleting Item:
     *      itemService.remove(itemId).then(()=>{...}).catch(e=>{...});
     *
     * Ex Patching Item:
     *      itemService.patch(itemId,patch).then(item=>{...}).catch(e=>{...});
     *
     *
     * Example of adding custom request options:
     *
     *      let options = {
     *          headers: { 'X-My-Header': 'myHeaderValue' },
     *          xhrFields: { withCredentials: true }
     *      };
     *      itemService.get(itemId, options).then(item=> {...}).catch(e=>{...});
     *
     */
    class JQueryItemService extends ItemService {

        constructor() {
            super();
        }

        /**
         * @param {string} id - identifier of item to fetch
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving Item object or an error
         */
        get (id, options) {

            return Q.resolve( true )
            .then( () => {
                let opts = this.buildRequest("GET", this.baseUrl + '/' + id, null, options);
                let d = Q.defer();
                opts.success = function(data) { d.resolve(data); };
                opts.error = function(xhr, status, message) { d.reject(new Error(message)); };
                jQuery.ajax(opts);
                return d.promise;
            })
            .catch(e => {
                let err = new Error(`ItemService.save() - Error fetching item: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {Object} itemObj - item to create or update
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving Item object or an error
         */
        save (itemObj, options) {

            return Q.resolve( true )
            .then( () => {

                let method = 'POST',
                    url = this.baseUrl;
                if(itemObj.id) {
                    method = "PUT";
                    url += '/' + itemObj.id;
                }

                let opts = this.buildRequest(method, url, itemObj, options);

                let d = Q.defer();
                opts.success = function(data) { d.resolve(data); };
                opts.error = function(xhr, status, message) { d.reject(new Error(message)); };
                jQuery.ajax(opts);
                return d.promise;

            })
            .catch(e => {
                let err = new Error(`ItemService.save() - Error saving item: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {string} id - identifier of item to delete
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving true if successful or an error
         */
        remove (id, options) {

            return Q.resolve( true )
            .then( () => {

                let opts = this.buildRequest("DELETE", this.baseUrl + '/' + id, null, options);
                let d = Q.defer();
                opts.success = function(data) { d.resolve(true); };
                opts.error = function(xhr, status, message) { d.reject(new Error(message)); };
                jQuery.ajax(opts);
                return d.promise;
            })
            .catch(e => {
                let err = new Error(`ItemService.save() - Error deleting item: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {string} id - identifier of item to patch
         * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving Item object or an error
         */
        patch (id, patch, options) {
            return Q.resolve( true )
            .then( () => {

                let opts = this.buildRequest("PATCH", this.baseUrl + '/' + id, patch, options);
                let d = Q.defer();
                opts.success = function(data) { d.resolve(data); };
                opts.error == function(xhr, status, message) { d.reject(new Error(message)); };
                jQuery.ajax(opts);
                return d.promise;
            })
            .catch(e => {
                let err = new Error(`ItemService.save() - Error patching item: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {Object} arg - either JS object of query parameters or GeoPlatform.Query instance
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving search results
         */
        search (arg, options) {

            return Q.resolve( true )
            .then( () => {

                let params = arg;

                if(arg && typeof(arg.getQuery) !== 'undefined') {
                    //if passed a GeoPlatform.Query object,
                    // convert to parameters object
                    params = arg.getQuery();
                }

                let opts = this.buildRequest("GET", this.baseUrl, params, options);
                let d = Q.defer();
                opts.success = function(data) { d.resolve(data); };
                opts.error = function(xhr, status, message) { d.reject(new Error(message)); };
                jQuery.ajax(opts);
                return d.promise;
            })
            .catch(e => {
                let err = new Error(`ItemService.search() - Error searching items: ${e.message}`);
                return Q.reject(err);
            });
        }



        /**
         * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
         * @param {string} url - destination of xhr request
         * @param {Object} data - object to be sent with request
         * @param {Object} options - optional object defining request options
         * @return {Object} request options for xhr
         */
        buildRequest (method, url, data, options) {

            if(METHODS.indexOf(method)<0)
                throw new Error(`Unsupported HTTP method ${method}`);

            if(!url)
                throw new Error(`Must specify a URL for HTTP requests`);

            //define default options
            let opts = {
                method: method,
                url: url,
                dataType: 'json',   //expected response type
                timeout: this.timeout
            };
            if(data) {
                opts.data = data;
                if("POST" === method || "PUT" === method || "PATCH" === method) {
                    opts.processData = false;
                    opts.contentType = 'application/json';
                }
            }

            //copy over user-supplied options
            if(options && typeof(options) === 'object') {
                for(let o in options) {
                    if(options.hasOwnProperty(o)) {
                        opts[o] = options[o];
                    }
                }
            }

            return opts;
        }


    }

    return JQueryItemService;

}));
